FROM node:20-alpine
WORKDIR /app
# Install dependencies first so this layer is cached when only code changes
COPY package.json ./
RUN npm install --omit=dev
COPY server.js ./
USER node
EXPOSE 3000
CMD ["node", "server.js"]
