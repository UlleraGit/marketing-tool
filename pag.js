const fs = require('fs');
const util = require('util');
const fetch = require('node-fetch');

const writeFile = util.promisify(fs.writeFile);

const fetchCountries = async (url, countries = []) => {
  const response = await fetch(url);
  const data = await response.json();
  const updatedCountries = countries.concat(data.data);
  
  if (data.paging && data.paging.next) {
    return fetchCountries(data.paging.next, updatedCountries);
  }
  
  return updatedCountries;
};

const accessToken = 'EAAZA7BZCwWkmUBACWjlMM4XXzkv1EmPh0oGdGOpQmqdjLF7Pq5wlMNTDmHFWnT8fla8Fmw4DB5kXr8OspVbvSSRsh3H4ZChsxLEv0iKRsNKO8aVmVD1XRpRWep5AbttcoICuFtHiSCZC6GCJDBRkZBqkqmqLN7F5I9g6HKDIrMLq1hIVeYaxKk1rOA0tmFWfg4eC630wqmgZDZD';
const initialUrl = `https://graph.facebook.com/v14.0/search?type=adgeolocation&location_types=['country']&limit=25&access_token=${accessToken}`;

fetchCountries(initialUrl)
  .then((allCountries) => {
    const countriesJSON = JSON.stringify(allCountries, null, 2);
    return writeFile('countries.json', countriesJSON);
  })
  .then(() => {
    console.log('Countries saved to countries.json');
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
