const express = require('express');
const request = require('request');
const app = express();

const BASE_URL = 'http://125.209.88.166:45793';

app.get('/stream/*', (req, res) => {
  const streamPath = req.params[0];
  const fullUrl = `${BASE_URL}/${streamPath}`;
  console.log(`Proxying: ${fullUrl}`);
  req.pipe(request(fullUrl)).pipe(res);
});

app.get('/', (req, res) => {
  res.send('IPTV Proxy Server is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});