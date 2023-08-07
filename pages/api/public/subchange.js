var getRawBody = require("raw-body")
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51NBwZQFfHEwLeNSSkO7x4vRx7Qbnu3MlGRkGbLCL4PeUcTb7MI6U4OdyJhyV2r7yapCDfGlpPsd3Yt4rcdrTmG8p00t4bxcDfe', {
    apiVersion: '2022-11-15', // Replace with the latest Stripe API version
});

const endpointSecret = 'whsec_31e6a984b1a96a2b693e2dcc7f20ead1a56a6d6e531891634a27f2d3a229b664';

export default async function handler(req, res) {
    if (req.method === 'POST') {
       let test = await getRawBody(req)
        try {
            const sig = req.headers['stripe-signature'];
            let event;

            try {
                event = await stripe.webhooks.constructEvent(test, sig, endpointSecret);
            } catch (err) {
                console.log(err.message);
                return res.status(400).send(`Webhook Error: ${err.message}`);
            }

            // Handle the event
            switch (event.type) {
                case 'customer.subscription.updated':
                    const customerSubscriptionUpdated = event.data.object;
                    console.log('customer.subscription.updated:', customerSubscriptionUpdated);
                    // Then define and call a function to handle the event customer.subscription.updated
                    break;
                case 'subscription_schedule.canceled':
                    const subscriptionScheduleCanceled = event.data.object;
                    console.log('subscription_schedule.canceled:', subscriptionScheduleCanceled);
                    // Then define and call a function to handle the event subscription_schedule.canceled
                    break;
                // ... handle other event types
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }

            // Return a 200 response to acknowledge receipt of the event
            return res.status(200).end();
        } catch (error) {
            console.error(error);
            return res.status(500).end();
        }
    }

    // Return a 404 response for non-POST requests
    return res.status(404).end();
}
export const config = {
    api: {
        bodyParser: false,
    }
}