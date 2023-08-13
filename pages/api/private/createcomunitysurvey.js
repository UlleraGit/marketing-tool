import connection from "../../../lib/mongodb";
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
        const values = JSON.parse(req.body);

        if (Math.floor(user[0].numberOfAnsweredSurveys / 7) >= 1 && isUser) {
            let nOAS = user[0].numberOfAnsweredSurveys - 7
            connection({ task: "set", collection: "dcSurveys", data: { title: values.title, survey: values.questions, issuer: user[0].hash, status: "AKTIV", answers:[], type: "dcsurvey", numbertoask: 100 } });
            connection({ task: "change", collection: "users", find: { _id: user[0]._id }, change: { numberOfAnsweredSurveys: nOAS } })
            res.status(200).json("success");
        } else {
            res.status(400).json({ error: "Es wurden nicht genug Umfragen beantwortet! Bitte beantworte mindestens 7 Umfragen um eine Gratisumfrage zu erhalten." });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "err" });
    }
}
