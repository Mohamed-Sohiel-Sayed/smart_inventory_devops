// Alert service: polls the inventory service and keeps a list of low-stock alerts.
const express = require('express');

const PORT = process.env.PORT || 4000;
const INVENTORY_URL = process.env.INVENTORY_URL || 'http://inventory:3000';
const POLL_SECONDS = parseInt(process.env.POLL_SECONDS || '10', 10);

// itemId -> alert. An alert is raised when an item drops to or below its
// threshold, and cleared when it is restocked above it.
const active = new Map();
const history = [];

async function checkStock() {
  try {
    const res = await fetch(`${INVENTORY_URL}/items/low`);
    if (!res.ok) throw new Error(`inventory returned ${res.status}`);
    const lowItems = await res.json();
    const lowIds = new Set(lowItems.map((i) => i.id));

    for (const item of lowItems) {
      if (!active.has(item.id)) {
        const alert = {
          itemId: item.id,
          name: item.name,
          quantity: item.quantity,
          threshold: item.threshold,
          raisedAt: new Date().toISOString(),
        };
        active.set(item.id, alert);
        history.unshift({ ...alert, event: 'LOW_STOCK' });
        console.log(`ALERT: ${item.name} is low (${item.quantity} <= ${item.threshold})`);
      } else {
        active.get(item.id).quantity = item.quantity;
      }
    }
    for (const [id, alert] of active) {
      if (!lowIds.has(id)) {
        active.delete(id);
        history.unshift({ ...alert, event: 'RESOLVED', resolvedAt: new Date().toISOString() });
        console.log(`RESOLVED: ${alert.name} restocked`);
      }
    }
    history.splice(50); // keep the last 50 events
  } catch (err) {
    console.log(`Stock check failed: ${err.message}`);
  }
}

const app = express();
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'alert' }));
app.get('/alerts', (req, res) => res.json({ active: [...active.values()], history }));

app.listen(PORT, () => {
  console.log(`Alert service listening on ${PORT}, polling every ${POLL_SECONDS}s`);
  checkStock();
  setInterval(checkStock, POLL_SECONDS * 1000);
});
