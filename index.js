const axios = require('axios');
const cheerio = require('cheerio');
const email = require('./email');

const scrapeUrl = 'https://www.nike.com/gb/t/air-huarache-shoe-jnTpomXd';

console.log(`Request to ${scrapeUrl}`);
axios.get(scrapeUrl)
.then(response => {
  processResponse(response);
})
.catch(error => {
  console.log(error);
});

processResponse = (response) => {
  if(typeof response.data !== 'undefined') {
    const $ = cheerio.load(response.data);
    const price = $('.css-i260wg');
    const soldOut = $('.sold-out');
    if(typeof price !== 'undefined') {
      if('data-test' in price.attr() && 
        price.attr()['data-test'] === 'product-price-reduced' && 
        typeof soldOut === 'undefined') {
          
        const priceValue = price.first().text();
        console.log(priceValue);
        email.sendEmail(priceValue);
      }
    }
  }
}