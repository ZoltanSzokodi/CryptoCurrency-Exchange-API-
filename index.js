const express = require('express');
const request = require('request');
const app = express();

app.get('/', function(req, res) {
  res.send('Hello World')
})

app.listen(3000);
