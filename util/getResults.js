const fs = require('fs');
const bizSdk = require('facebook-nodejs-business-sdk');

const AdAccount = bizSdk.AdAccount;

const access_token = "EAAZA7BZCwWkmUBAHo4MdZBAX3TiEtaiczfWYZArkrZA9HavvIFkNqFkKugsvnskRRt8ZCp3FnqVsMNpPxLMdv7k03s1wKRUZABNZC2G9FWhbhQD8sZAnyBx8n0cWkre5QnPQytEjdkk30gmlwEXcwergmPOzncSMjqWOcClta193w9JOIHZB8GfIe8";
const ad_account_id = 'act_394803416105034';

const api = bizSdk.FacebookAdsApi.init(access_token);
const account = new AdAccount(ad_account_id);

const fields = [
    'interactive_component_tap',
    'campaign_name',
];
/*function fetchInsightsBatch(allInsights = []) {
  const params = {
    'time_range': { 'since': '2022-02-01', 'until': '2023-08-31' },
    'filtering': [],
    "breakdowns": ["age", "gender"],
    'level': 'ad',
    'limit': 100, // Set the number of results per page (max: 100)
  };
  return account.getInsights(fields, params)
    .then((insights) => {
      const updatedInsights = allInsights.concat(insights);
      const nextUrl = insights.paging && insights.paging.next;
      if (nextUrl) {
        const newParams = { ...params, ...getUrlParams(nextUrl) };
        return fetchInsightsBatch(newParams, updatedInsights);
      } else {
        return updatedInsights;
     // }
    });
}*/
function fetchInsightsResult(allInsights = []) {
    const params = {
        'time_range': { 'since': '2022-02-01', 'until': '2023-08-31' },
        'filtering': [],
        'action_breakdowns': ['interactive_component_sticker_id', 'interactive_component_sticker_response'],
        'level': 'ad',
        'limit': 100, // Set the number of results per page (max: 100)
    };
    return account.getInsights(fields, params)
        .then((insights) => {
            const updatedInsights = allInsights.concat(insights);
            const nextUrl = insights.paging && insights.paging.next;
            if (nextUrl) {
                const newParams = { ...params, ...getUrlParams(nextUrl) };
                return fetchInsightsResult(newParams, updatedInsights);
            } else {
                return updatedInsights;
            }
        });
}

function fetchInsightsBatch(allInsights = []) {
    const params = {
        'time_range': { 'since': '2022-02-01', 'until': '2023-08-31' },
        'filtering': [],
        "breakdowns": ['country'],
        'level': 'ad',
        'limit': 100, // Set the number of results per page (max: 100)
    };
    return account.getInsights(fields, params)
        .then((insights) => {
            const updatedInsights = allInsights.concat(insights);
            /*const nextUrl = insights.paging && insights.paging.next;
            if (nextUrl) {
              const newParams = { ...params, ...getUrlParams(nextUrl) };
              return fetchInsightsBatch(newParams, updatedInsights);
            } else {*/
            return updatedInsights;
            // }
        });
}

function getUrlParams(url) {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params = {};
    let match;
    while ((match = regex.exec(url))) {
        params[match[1]] = match[2];
    }
    return params;
}

fetchInsightsBatch()
    .then((allInsights) => {
        // Process the insights data or save it to a file
        const insightsJSON = JSON.parse(JSON.stringify(allInsights, null, 2));
        let temp = insightsJSON.map((a, i) => {
            if (a.interactive_component_tap) { return ({ result: a.interactive_component_tap, name: a.campaign_name, age: a.age, gender: a.gender, region:a.country }) }
            else {
                return ({
                    result: [{ "value": "0" }], name: a.campaign_name, age: a.age, gender: a.gender, region: a.country
                })
            }
        })
        return (temp)
    }).then(async (res) => {
        const campaigns = new Map();
        let result = await fetchInsightsResult().then(res => { return (JSON.parse(JSON.stringify(res, null, 2))) })
        result.map((a, i) => {
            (campaigns.set(a.campaign_name, { name: a.campaign_name, answers: a.interactive_component_tap, groups: [] }))
        })
        res.map((a, i) => {
            let t = campaigns.get(a.name);
            // t.groups.push({ result: a.result, age: a.age, gender: a.gender });
            t.groups.push({ result: a.result, region: a.region });
            campaigns.set(a.name, t)
        })
        return (Array.from(campaigns.values()))
    })
    .then((temp) => {
        fs.writeFile('insights.json', JSON.stringify(temp), (err) => {
            if (err) {
                console.error('Error saving insights:', err);
            } else {
                console.log('Insights saved to insights.json');
            }
        });
    }
    )
    .catch((error) => {
        console.error('Error fetching insights:', error);
    });