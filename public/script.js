// Dropdown
$(function() {
  $.get('/load/', data => {
    $('#currencyTags').autocomplete({
      source: data
    })
  })
})

const allRates = document.querySelector('#allRates');
const requestRates = document.querySelector('#requestRates');
const currencyTages = document.querySelector('#currencyTags');
const selCurrency = document.querySelector('#selCurrency');
const output1 = document.querySelector('#output1');
const url = 'https://api.coinmarketcap.com/v1/ticker/';
const cur = ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PNL", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"]

for (let x = 0; x < cur.length; x++) {
  let option = document.createElement('option');
  let txt = document.createTextNode(cur[x]);
  option.appendChild(txt);
  option.setAttribute('value', cur[x]);
  selCurrency.insertBefore(option, selCurrency.lastChild);
}

allRates.addEventListener('click', getAllRates);
requestRates.addEventListener('click', getOneRate);

function getAllRates() {
  let curValue = selCurrency.value;
  let url = '/price/' + curValue;

  fetch(url)
    .then(response => response.json())
    .then(data => outputToPage(JSON.parse(data), curValue))
    .catch(err => {
      console.log(JSON.stringify(err));
    });
}

function outputToPage(data, c) {
  output.innerHTML = '';
  let currecyLower = 'price_' + c.toLowerCase();
  data.forEach((item, i) => {
    let pricedFixed = Math.round(item[currecyLower] * 100) / 100;
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.innerHTML = `${item.name} ${item.symbol} ${pricedFixed} ${c}`;
    li.appendChild(span);
    output.appendChild(li);
    console.log(item);
  })
}

function getOneRate() {
  let curValue = currencyTags.value;
  let urlPlus = 'crypto/' + curValue;
  fetch(urlPlus)
    .then(response => response.json())
    .then(data => outputOneCur(JSON.parse(data)[0]))
    .catch(err => console.log(JSON.stringify(err)));
  console.log(urlPlus);
}

function outputOneCur(data) {
  console.log(data);
  let html = `<h1>${data.name}</h1>`
  for (key in data) {
    let keyContent = key.replace("_", " ");
    let val = data[key];
    html += `<div>${keyContent}: ${val}</div>`;
  }
  output1.innerHTML = html;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
