const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const forwardingAddress = "http://f6557ff5.ngrok.io";
const scopes = 'read_products';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const shopifyKey = process.env.SHOPIFY_KEY;
const shopifySecret = process.env.SHOPIFY_SECRET;


router.get('/shopify', (req, res) => {
  console.log(process.env.SHOPIFY_KEY);
  const makeNonce = (request) => {
    // TODO: make nonce function
    let nonce = 'a;soildhg';
    return nonce;
  };

  const shop = req.query.shop;

  if (shop) {
    const state = makeNonce(req);
    const redirectUri = forwardingAddress + '/shopify/callback';
    console.log(redirectUri);
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + shopifyKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri;
    console.log(installUrl);
    res.cookie('state', state);
    res.redirect(installUrl);
  } else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }
});

router.get('/shopify/callback', (req, res) => {
  const { shop, hmac, code, state } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;

  if (state !== stateCookie) {
    return res.status(403).send('Request origin cannot be verified');
  }

  if (shop && hmac && code) {
    const map = Object.assign({}, req.query);
    delete map['signature'];
    delete map['hmac'];
    const message = querystring.stringify(map);
    const generatedHash = crypto
      .createHmac('sha256', shopifySecret)
      .update(message)
      .digest('hex');

    if (generatedHash !== hmac) {
      return res.status(400).send('HMAC validation failed');
    }

    res.status(200).send('HMAC validated');
  } else {
    res.status(400).send('Required parameters missing');
  }
});


module.exports = router;
