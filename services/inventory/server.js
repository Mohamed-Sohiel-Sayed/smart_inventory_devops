// Inventory service: stores items in PostgreSQL and exposes a small REST API.
const express = require('express');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3000;
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'inventory',
  password: process.env.DB_PASSWORD || 'inventory',
  database: process.env.DB_NAME || 'inventory',
});

const app = express();
app.use(express.json());

// Create the table and seed a few items on first start.
// Retries because the database container may still be starting.
async function initDb(retries = 20) {
  for (let i = 1; i <= retries; i++) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS items (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 0,
          threshold INTEGER NOT NULL DEFAULT 5
        )`);
      const { rows } = await pool.query('SELECT COUNT(*)::int AS n FROM items');
      if (rows[0].n === 0) {
        await pool.query(`
          INSERT INTO items (name, quantity, threshold) VALUES
            ('Laptop', 12, 5), ('Mouse', 40, 10), ('Keyboard', 6, 5), ('Monitor', 3, 4)`);
      }
      console.log('Database ready');
      return;
    } catch (err) {
      console.log(`DB not ready (attempt ${i}/${retries}): ${err.message}`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
  console.error('Could not connect to the database, exiting');
  process.exit(1);
}

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'inventory' }));

app.get('/items', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM items ORDER BY id');
  res.json(rows);
});

app.get('/items/low', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM items WHERE quantity <= threshold ORDER BY id');
  res.json(rows);
});

app.post('/items', async (req, res) => {
  const { name, quantity = 0, threshold = 5 } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const { rows } = await pool.query(
    'INSERT INTO items (name, quantity, threshold) VALUES ($1, $2, $3) RETURNING *',
    [name, quantity, threshold]
  );
  res.status(201).json(rows[0]);
});

// Change stock by a delta, e.g. {"delta": -1} after a sale or {"delta": 10} after restocking.
app.post('/items/:id/adjust', async (req, res) => {
  const delta = parseInt(req.body.delta, 10);
  if (Number.isNaN(delta)) return res.status(400).json({ error: 'delta must be a number' });
  const { rows } = await pool.query(
    'UPDATE items SET quantity = GREATEST(quantity + $1, 0) WHERE id = $2 RETURNING *',
    [delta, req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ error: 'item not found' });
  res.json(rows[0]);
});

app.delete('/items/:id', async (req, res) => {
  await pool.query('DELETE FROM items WHERE id = $1', [req.params.id]);
  res.status(204).end();
});

initDb().then(() => {
  app.listen(PORT, () => console.log(`Inventory service listening on ${PORT}`));
});
