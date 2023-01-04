export async function test(){
const bizSdk = require('facebook-nodejs-business-sdk');

const accessToken = 'EAAZA7BZCwWkmUBABPdQGaRxqcRlh9pYzZAhBaOzLkZBD6kpWF2nfDic6KBvmCkjQcYOIpIbMMsh1NGOCLxetacnob98eGeTleVbx6jz4W8UQuZAVmE9KOlZBW1F2uwRS19cjZB7rpm10SZC7HnEIMKJz3LpCRHWSlWNz5o8qDSZBprTPds0wD3qdV';
const accountId = 'act_394803416105034';

const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

const account = new AdAccount(accountId);
var campaigns;
    
account.read([AdAccount.Fields.name])
  .then((account) =>{
    return account.getCampaigns([Campaign.Fields.name], { limit: 10 }) // fields array and params
  })
  .then((result) =>{
    campaigns = result
    campaigns.forEach((campaign) =>console.log(campaign.name))  
  }).catch(console.error);}