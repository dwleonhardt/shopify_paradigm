const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const forwardingAddress = "http://f6557ff5.ngrok.io";
const install = require('./routes/install');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const shopifyKey = process.env.SHOPIFY_KEY;
const shopifySecret = process.env.SHOPIFY_SECRET;

app.listen(port, () => {
  console.log('Listening on port', port);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', install);
