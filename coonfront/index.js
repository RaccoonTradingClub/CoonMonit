const express = require('express');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST
});

redisClient.on('error', (err) => {
  console.error('Redis Error :', err);
});

app.get('/store', (req, res) => {
  const { host, ...data } = req.query;

  if (!host) {
    return res.status(400).send('Param host empty.');
  }

  // Vérifier si les données sont un objet
  if (typeof data !== 'object' || data === null) {
    return res.status(400).send('Data must be objects.');
  }

  const jsonData = JSON.stringify(data);

  redisClient.set(host, jsonData, (err) => {
    if (err) {
      console.error('Error :', err);
      return res.status(500).send('Server Error');
    }

    res.send('Data saved');
  });
});


app.post('/store', (req, res) => {
  const { host } = req.query;

  if (!host) {
    return res.status(400).send('Param host empty.');
  }

  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).send('Body request empty or invalid');
  }

  const jsonData = JSON.stringify(data);

  redisClient.set(host, jsonData, (err) => {
    if (err) {
      console.error('Redis save error', err);
      return res.status(500).send('Server Error');
    }
    res.send('Data saved');
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server launched on port ${port}`);
});
