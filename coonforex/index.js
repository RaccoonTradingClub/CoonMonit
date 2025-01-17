const promClient = require('prom-client');
const redis = require('redis');
const express = require('express');

const client = redis.createClient({
  host: "redis", 
  port: 6379,  
});

const app = express();

const profitGauge = new promClient.Gauge({
  name: 'host_profit',
  help: 'Profit of the host',
  labelNames: ['host'],
});

const drawdownGauge = new promClient.Gauge({
  name: 'host_open_drawdown',
  help: 'Open drawdown of the host',
  labelNames: ['host'],
});

const openPositionsGauge = new promClient.Gauge({
  name: 'host_open_positions',
  help: 'Open positions of the host',
  labelNames: ['host'],
});

const balanceGauge = new promClient.Gauge({
  name: 'host_balance',
  help: 'Balance of the host',
  labelNames: ['host'],
});

async function updateMetrics() {
  return new Promise((resolve, reject) => {
    client.keys('*', (err, keys) => {
      if (err) return reject(err);

      keys.forEach((key) => {
        client.get(key, (err, value) => {
          if (err) return reject(err);

          const data = JSON.parse(value);

          profitGauge.set({ host: key }, parseFloat(data.profit));
          drawdownGauge.set({ host: key }, parseFloat(data.open_drawdown));
          openPositionsGauge.set({ host: key }, parseInt(data.open_positions));
          balanceGauge.set({ host: key }, parseFloat(data.balance));
        });
      });

      resolve();
    });
  });
}

app.get('/metrics', async (req, res) => {
  try {
    await updateMetrics();
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

const PORT = 9100;
app.listen(PORT, () => {
  console.log(`Exporter is running on http://yourip:${PORT}/metrics`);
});

