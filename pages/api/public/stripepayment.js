// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
    if (items.type === "dcsurvey") {
        return items.questions.length * 6000
    }
    else if (items.type === "ipsurvey") {
        if (items.ageMin > 20 && items.ageMin < 35) {
            return 50 + items.questNum * 0.25
        } else if (items.ageMin >= 35) {
            return 75 + items.questNum * 0.25
        } else {
            return items.questNum * 0.25
        }
    }
};

export default async function handler(req, res) {
    const values = JSON.parse(req.body);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(values),
        currency: "eur",
        payment_method_types: ['card', 'paypal', 'klarna'],
        metadata: {
            delivered: false
        }
    });
    res.send({
        clientSecret: paymentIntent.client_secret, amount: (paymentIntent.amount / 100)
    });
};