const express = require('express')
const app = express()
const request = require('request');
const url = 'https://api.coinmarketcap.com/v1/ticker/';
app.use(express.static(__dirname + '/public'));
app.get('/load', (req, res) => {
    request(url, (error, response, body) => {
        let holder = [];
        let data = JSON.parse(body);
        for (var i = 0; i < data.length; i++) {
            holder.push(data[i].id.capitalize());
        }
        res.json(holder);
    });
})
app.get('/price/:cur', (req, res) => {
    let curValue = (req.params.cur) ? req.params.cur : 'USD';
    request(url + '?convert=' + curValue, (error, rep, body) => {
        res.json(body);
    })
})
app.get('/crypto/:cur', (req, res) => {
    console.log(req.params);
    let curValue = (req.params.cur) ? req.params.cur : 'Bitcoin';
    request(url + curValue + '/', (error, rep, body) => {
        res.json(body);
    })
})
app.listen(3000)
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
