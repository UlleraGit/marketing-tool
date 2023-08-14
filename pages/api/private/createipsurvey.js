import campagneCreator from "../../../util/campagne"
import connection from "../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
var bcrypt = require('bcryptjs');

export default async function handler(req, res) {
    const value = req.body
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

        if (isUser) {
            const intent = await stripe.paymentIntents.retrieve(value.paymentIntent);
            if (intent.status === "succeeded" && intent.metadata.delivered == "false") {
                let locationData = { geo_locations: { countries: [] } };
                let gender;
                for (let i = 0; i < value.country.length; i++) {
                    locationData.geo_locations.countries.push(value.country[i].country_code);
                }
                switch (value.gender) {
                    case 'Weiblich':
                        gender = [2]
                        break;
                    case 'Männlich':
                        gender = [1]
                        break;
                    case 'Alle':
                        gender = [1, 2]
                        break;
                }
                await campagneCreator({
                    hash: user[0].hash,
                    title: value.title,
                    age_min: parseInt(value.ageMin),
                    age_max: parseInt(value.ageMax),
                    geo_locations: locationData.geo_locations,
                    question_text: value.question,
                    answerA: value.answerA,
                    answerB: value.answerB,
                    gender: gender
                })
                await connection({ task: "set", collection: "adRequests", data: { name: value.title + " " + user[0].hash, status: "AKTIV", issuer: user[0].hash, ...value, answers: null, creationTime: new Date() } });
                await stripe.paymentIntents.update(
                    value.paymentIntent,
                    { metadata: { delivered: "true" } }
                );
                res.status(200).json({ status: "success" })
            } else {
                res.status(400).json({ error: "Contract has already been created or Payment didn't work." });
            }
        }
        else {
            res.status(500).json("wrong user")
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: err })
    }
}
