const bizSdk = require("facebook-nodejs-business-sdk");
export async function campaignCreator(name) {
  const AdAccount = bizSdk.AdAccount;
  /*const access_token = process.env.ACCESS_TOKEN;
    const app_secret = process.env.APP_SECRET;
    const app_id = process.env.APP_ID;
    const id = process.env.ID;*/

  const access_token =
    "EAAZA7BZCwWkmUBABPdQGaRxqcRlh9pYzZAhBaOzLkZBD6kpWF2nfDic6KBvmCkjQcYOIpIbMMsh1NGOCLxetacnob98eGeTleVbx6jz4W8UQuZAVmE9KOlZBW1F2uwRS19cjZB7rpm10SZC7HnEIMKJz3LpCRHWSlWNz5o8qDSZBprTPds0wD3qdV";
  const app_secret = "6f9c20a5232c83f4cc8352202284308a";
  const app_id = "1824124084589157";
  const id = "act_394803416105034";

  const api = bizSdk.FacebookAdsApi.init(access_token);
  const showDebugingInfo = true; // Setting this to true shows more debugging info.
  if (showDebugingInfo) {
    api.setDebug(true);
  }

  const logApiCallResult = (apiCallName, data) => {
    console.log(apiCallName);
    if (showDebugingInfo) {
      console.log("Data:" + JSON.stringify(data));
    }
  };

  let fields, params;
  fields = [];
  params = {
    name: name,
    objective: "REACH",
    status: "PAUSED",
    special_ad_categories: [],
  };
  const campaigns = await new AdAccount(id).createCampaign(fields, params);
  adSetCreator(campaigns._data.id);
  //logApiCallResult('campaigns api call complete.', campaigns);
}

async function adSetCreator(campagne_id) {
  const AdAccount = bizSdk.AdAccount;
  const access_token =
    "EAAZA7BZCwWkmUBABPdQGaRxqcRlh9pYzZAhBaOzLkZBD6kpWF2nfDic6KBvmCkjQcYOIpIbMMsh1NGOCLxetacnob98eGeTleVbx6jz4W8UQuZAVmE9KOlZBW1F2uwRS19cjZB7rpm10SZC7HnEIMKJz3LpCRHWSlWNz5o8qDSZBprTPds0wD3qdV";
  const app_secret = "6f9c20a5232c83f4cc8352202284308a";
  const app_id = "1824124084589157";
  const id = "act_394803416105034";

  const api = bizSdk.FacebookAdsApi.init(access_token);

  const showDebugingInfo = true; // Setting this to true shows more debugging info.
  if (showDebugingInfo) {
    api.setDebug(true);
  }

  const logApiCallResult = (apiCallName, data) => {
    console.log(apiCallName);
    if (showDebugingInfo) {
      console.log("Data:" + JSON.stringify(data));
    }
  };

  let fields, params;
  fields = [];

  params = {
    name: "AdTest",
    bid_strategy: "LOWEST_COST_WITHOUT_CAP",
    daily_budget: "500",
    billing_event: "IMPRESSIONS",
    optimization_goal: "REACH",
    campaign_id: campagne_id,
    promoted_object: { page_id: "101217845351407" },
    targeting: {
      geo_locations: { countries: ["AT", "DE", "CH"] },
      age_min: 13,
      age_max: 27,
      publisher_platforms: ["instagram"],
      instagram_positions: ["story"],
    },
    status: "PAUSED",
  };

  const adset = await new AdAccount(id).createAdSet(fields, params);

  adCreativeCreator(adset._data.id);
}

async function adCreativeCreator(adset_id) {
  const AdAccount = bizSdk.AdAccount;
  const access_token =
    "EAAZA7BZCwWkmUBABPdQGaRxqcRlh9pYzZAhBaOzLkZBD6kpWF2nfDic6KBvmCkjQcYOIpIbMMsh1NGOCLxetacnob98eGeTleVbx6jz4W8UQuZAVmE9KOlZBW1F2uwRS19cjZB7rpm10SZC7HnEIMKJz3LpCRHWSlWNz5o8qDSZBprTPds0wD3qdV";
  const app_secret = "6f9c20a5232c83f4cc8352202284308a";
  const app_id = "1824124084589157";
  const id = "act_394803416105034";

  const api = bizSdk.FacebookAdsApi.init(access_token);

  const showDebugingInfo = true; // Setting this to true shows more debugging info.
  if (showDebugingInfo) {
    api.setDebug(true);
  }

  const logApiCallResult = (apiCallName, data) => {
    console.log(apiCallName);
    if (showDebugingInfo) {
      console.log("Data:" + JSON.stringify(data));
    }
  };

  let fields, params;
  fields = [];

  params = {
    name: "My Ad",
    //'adset_id': adcreative_id,
    //'creative': { 'instagram_actor_id':'3604386419647806', 'page_id': '101217845351407' },
    //'ad_format': 'FACEBOOK_STORY_MOBILE',
    //'status': 'PAUSED',
    body: "Like My Page",
    object_story_spec: {
      page_id: "101217845351407",
      link_data: {
        image_hash: "93b69941e447390dd4830bd39d7d12cb",
        message: "try it out",
        body: "Like My Page",
      },
    },
  };

  const adcreative = await new AdAccount(id).createAdCreative(fields, params);
  adCreator(adcreative._data.id, adset_id);
}

async function adCreator(adcreative_id, adset_id) {
  const AdAccount = bizSdk.AdAccount;

  const access_token =
    "EAAZA7BZCwWkmUBABPdQGaRxqcRlh9pYzZAhBaOzLkZBD6kpWF2nfDic6KBvmCkjQcYOIpIbMMsh1NGOCLxetacnob98eGeTleVbx6jz4W8UQuZAVmE9KOlZBW1F2uwRS19cjZB7rpm10SZC7HnEIMKJz3LpCRHWSlWNz5o8qDSZBprTPds0wD3qdV";
  const app_secret = "6f9c20a5232c83f4cc8352202284308a";
  const app_id = "1824124084589157";
  const id = "act_394803416105034";

  const api = bizSdk.FacebookAdsApi.init(access_token);

  const showDebugingInfo = true; // Setting this to true shows more debugging info.
  if (showDebugingInfo) {
    api.setDebug(true);
  }

  const logApiCallResult = (apiCallName, data) => {
    console.log(apiCallName);
    if (showDebugingInfo) {
      console.log("Data:" + JSON.stringify(data));
    }
  };

  let fields, params;
  fields = [];
  params = {
    name: "My Ad",
    adset_id: adset_id,
    creative: { creative_id: adcreative_id },
    status: "PAUSED",
  };
  const ads = new AdAccount(id).createAd(fields, params);

  //logApiCallResult('ads api call complete.', ads);
}
