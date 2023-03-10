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

let access_token = 'EAAZA7BZCwWkmUBANy3rwlZAXO7Pih5Ia6yCXd3uNcf8rfFZAXZCYV8okits8mkK5ZA25JiY0FlhC3FDZBej4OMvn55Gs9wvuaK4Tl0EUV1PZCk6Yjp75Ywy0rPLrYuvUvf3oT3vNng5j1JuWCL9atdcZBqAoU40R6eOA2EpNMZCPZAivMNRBX36fzBYuXpkjaizK7EZD';
let ad_account_id = 'act_2219999991505258';
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
  'results',
  'result_rate',
  'campaign_group_name',
  'adgroup_name',
  'campaign_name',
];
const params = {
  'time_range' : {'since':'2023-02-09','until':'2023-03-11'},
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
