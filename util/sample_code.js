/*const bizSdk = require('facebook-nodejs-business-sdk');

const AdAccount = bizSdk.AdAccount;
const AdsInsights = bizSdk.AdsInsights;

let access_token = 'EAAZA7BZCwWkmUBAFSNHmKErBdUt8d3ZA2YW3pkg0EirUW7qVQALGXlcs9Noj1rWTDeB5E51JiUUHTnoJUCx3ya857w7u2awlHixPpBv77NSXb1yZCJysDlKnAkyxPBWXqUL4AuGBYr9ahX0EcUND77JWqIUnm5ME5o5XOvw6xtdkBN26KJL4';
let ad_account_id = 'act_394803416105034';
let app_secret = '6f9c20a5232c83f4cc8352202284308a';
let app_id = '1824124084589157';

const api = bizSdk.FacebookAdsApi.init(access_token);
const account = new AdAccount(ad_account_id);

const showDebugingInfo = true; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

let ads_insights;
let ads_insights_id;

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  if (showDebugingInfo) {
    console.log('Data:' + JSON.stringify(data));
  }
};

const fields = [
  'date_start',
  'date_stop',
  'account_name',
  'campaign_name',
  'ad_name',
  'impressions',
  'spend',
  'clicks',
  'ctr',
  'reach',
  'frequency',
  'cost_per_unique_click',
  'objective',
  'ad_id',
  'account_id'];
const params = {
  'time_range':  {'since':'2023-02-01','until':'2023-04-01'},
  'filtering': [],
  'level': 'ad',
  'breakdowns': ['age', 'gender'],
};
(new AdAccount(ad_account_id)).getInsights(
  fields,
  params
)
  .then((result) => {
    logApiCallResult('ads_insights api call complete.', result);
    ads_insights_id = result[0].id;
  })
  .catch((error) => {
    console.log(error);
  });
*/
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */

const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const AdsInsights = bizSdk.AdsInsights;

let access_token = 'EAAZA7BZCwWkmUBAFSNHmKErBdUt8d3ZA2YW3pkg0EirUW7qVQALGXlcs9Noj1rWTDeB5E51JiUUHTnoJUCx3ya857w7u2awlHixPpBv77NSXb1yZCJysDlKnAkyxPBWXqUL4AuGBYr9ahX0EcUND77JWqIUnm5ME5o5XOvw6xtdkBN26KJL4';
let ad_account_id = 'act_394803416105034';
let app_secret = '6f9c20a5232c83f4cc8352202284308a';
let app_id = '1824124084589157';
const api = bizSdk.FacebookAdsApi.init(access_token);
const account = new AdAccount(ad_account_id);
const showDebugingInfo = true; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

let ads_insights;
let ads_insights_id;

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  if (showDebugingInfo) {
  }
};

const fields = [
  'interactive_component_tap',
  'campaign_name',
  'reach',
  'impressions',
  'estimated_ad_recallers',
  'estimated_ad_recall_rate',
  'clicks',
];
const params = {
  'time_range' : {'since':'2023-02-01','until':'2023-04-01'},
  'filtering' : [],
  'level' : 'ad',
  'breakdowns' : ['age','gender'],
};
 (new AdAccount(ad_account_id)).getInsights(
  fields,
  params
)
.then((result) => {
  logApiCallResult('ads_insights api call complete.', result);
  ads_insights_id = result[0].id;
})
.catch((error) => {
  console.log(error);
});