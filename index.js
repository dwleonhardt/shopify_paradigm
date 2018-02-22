const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const shopifyKey = process.env.SHOPIFY_KEY;
const shopifySecret = process.env.SHOPIFY_SECRET;
const forwardingAddress = "http://d5285b39.ngrok.io";


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.listen(port, () => {
  console.log('Listening on port', port);
});

app.get('/', (req, res) => { 
  res.send('Hello World!');
});
