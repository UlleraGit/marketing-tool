import connection from "../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
var bcrypt = require('bcryptjs');

export default async function handler(req, res) {
    const jwt = require('jsonwebtoken');
    const accessToken = req.cookies.IdToken;
    const decodedToken = jwt.decode(accessToken, { complete: true });
    const { payload } = decodedToken;
    const email = payload.email;
    const givenName = payload.given_name;
    const familyName = payload.family_name;
    try {
        let user = await connection({ task: "get", collection: "users", find: { email: email } })
        let temp = givenName + familyName + email
        let isUser = await bcrypt.compare(temp, user[0].hash)
        const values = req.body;
        const intent = await stripe.paymentIntents.retrieve(values.paymentIntent);
        if (intent.status === "succeeded" && intent.metadata.delivered == "false" && isUser) {
            connection({ task: "set", collection: "dcSurveys", data: { title: values.data.title, survey: values.data.questions, issuer: user[0].hash, status: "AKTIV", type: "dcsurvey", answers:[], numbertoask: 100 } });
            await stripe.paymentIntents.update(
                values.paymentIntent,
                { metadata: { delivered: "true" } }
            );
            res.status(200).json("success");
        } else {
            console.log(intent.error);
            res.status(400).json({ error: intent.error });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
}
