const fs = require('fs');
const util = require('util');
const fetch = require('node-fetch');

const writeFile = util.promisify(fs.writeFile);

const fetchInsights = async (url, insights = []) => {
  const response = await fetch(url);
  const data = await response.json();
  const updatedInsights = insights.concat(data.data);

  if (data.paging && data.paging.next) {
    return fetchInsights(data.paging.next, updatedInsights);
  }

  return updatedInsights;
};

const accessToken = 'YOUR_FACEBOOK_ACCESS_TOKEN';
const pageId = 'YOUR_FACEBOOK_PAGE_ID'; // Replace this with your Facebook Page ID
const metric = 'page_fan_count,page_impressions,page_engaged_users'; // Specify the metrics you want

const initialUrl = `https://graph.facebook.com/v17.0/act_394803416105034/insights?time_range=%7B%22since%22%3A%222022-02-01%22%2C%22until%22%3A%222023-08-01%22%7D&filtering=%5B%5D&level=ad&breakdowns=%5B%22age%22%2C%22gender%22%5D&fields=interactive_component_tap%2Ccampaign_name&access_token=${accessToken}`;

fetchInsights(initialUrl)
  .then((allInsights) => {
    const insightsJSON = JSON.stringify(allInsights, null, 2);
    return writeFile('insights.json', insightsJSON);
  })
  .then(() => {
    console.log('Insights saved to insights.json');
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
