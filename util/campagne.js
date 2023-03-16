const bizSdk = require("facebook-nodejs-business-sdk");
export default async function campaignCreator(name) {
  const AdAccount = bizSdk.AdAccount;
  /*const access_token = process.env.ACCESS_TOKEN;
    const app_secret = process.env.APP_SECRET;
    const app_id = process.env.APP_ID;
    const id = process.env.ID;*/

  const access_token =
    "EAAZA7BZCwWkmUBAFSNHmKErBdUt8d3ZA2YW3pkg0EirUW7qVQALGXlcs9Noj1rWTDeB5E51JiUUHTnoJUCx3ya857w7u2awlHixPpBv77NSXb1yZCJysDlKnAkyxPBWXqUL4AuGBYr9ahX0EcUND77JWqIUnm5ME5o5XOvw6xtdkBN26KJL4";
  const app_secret = "6f9c20a5232c83f4cc8352202284308a";
  const app_id = "1824124084589157";
  const id = "act_394803416105034";//"act_2219999991505258"

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
  await adSetCreator(campaigns._data.id);
  //logApiCallResult('campaigns api call complete.', campaigns);
}

async function adSetCreator(campagne_id) {
  const AdAccount = bizSdk.AdAccount;
  const access_token =
    "EAAZA7BZCwWkmUBAFSNHmKErBdUt8d3ZA2YW3pkg0EirUW7qVQALGXlcs9Noj1rWTDeB5E51JiUUHTnoJUCx3ya857w7u2awlHixPpBv77NSXb1yZCJysDlKnAkyxPBWXqUL4AuGBYr9ahX0EcUND77JWqIUnm5ME5o5XOvw6xtdkBN26KJL4";

  const app_secret = "6f9c20a5232c83f4cc8352202284308a";
  const app_id = "1824124084589157";
  const id = "act_394803416105034";;

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

  await adCreativeCreator(adset._data.id);
}

async function adCreativeCreator(adset_id) {
  const AdAccount = bizSdk.AdAccount;
  const access_token =
    "EAAZA7BZCwWkmUBAFSNHmKErBdUt8d3ZA2YW3pkg0EirUW7qVQALGXlcs9Noj1rWTDeB5E51JiUUHTnoJUCx3ya857w7u2awlHixPpBv77NSXb1yZCJysDlKnAkyxPBWXqUL4AuGBYr9ahX0EcUND77JWqIUnm5ME5o5XOvw6xtdkBN26KJL4";

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
      "instagram_actor_id": "3604386419647806",
      "photo_data": {
        "image_hash": "93b69941e447390dd4830bd39d7d12cb",
      }
    },
    interactive_components_spec: {
      "components": [{
        "type": "poll",
        "poll_spec": {
          "question_text": "Which option do you like?",
          "option_a_text": "NONE",
          "option_b_text": "ALL",
        },
        "position_spec": {
          "x": 0.5,
          "y": 0.5,
          "width": 0.5,
          "height": 0.2,
          "rotation": 0,
        }
      }]
    }
  };

  const adcreative = await new AdAccount(id).createAdCreative(fields, params);
  await adCreator(adcreative._data.id, adset_id);
}

async function adCreator(adcreative_id, adset_id) {
  const AdAccount = bizSdk.AdAccount;

  const access_token =
    "EAAZA7BZCwWkmUBAFSNHmKErBdUt8d3ZA2YW3pkg0EirUW7qVQALGXlcs9Noj1rWTDeB5E51JiUUHTnoJUCx3ya857w7u2awlHixPpBv77NSXb1yZCJysDlKnAkyxPBWXqUL4AuGBYr9ahX0EcUND77JWqIUnm5ME5o5XOvw6xtdkBN26KJL4";

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
  const ads = await new AdAccount(id).createAd(fields, params);

  //logApiCallResult('ads api call complete.', ads);
}
