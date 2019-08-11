const allRates = document.querySelector('#allRates');
const requestRates = document.querySelector('#requestRates');
const currencyTages = document.querySelector('#currencyTags');
const url = 'https://api.coinmarketcap.com/v1/ticker/';

allRates.addEventListener('click', getAllRates);
requestRates.addEventListener('click', getOneRate);

function getAllRates() {
  fetch(url)
  .then(response => response.json())
  .then(data => outputToPage(data))
  .catch(err => {
    console.log(JSON.stringify(err));
  });
}

function outputToPage(data) {
  data.forEach((item, i) => {
    let pricedFixed = Math.round(item.price_usd * 100)/ 100;
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.innerHTML = `${item.name} ${item.symbol} ${pricedFixed}`;
    li.appendChild(span);
    output.appendChild(li);
    console.log(item);
  })
}

function getOneRate() {
  let curValue = currencyTags.value;
  let urlPlus = url + curValue;
  fetch(urlPlus)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(JSON.stringify(err)))
  console.log(urlPlus);
}
