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
        if (isUser) {
            let dcsurveys = await connection({ task: "get", collection: "dcSurveys", find: { issuer: user[0].hash } })
            let ipsurveys = await connection({ task: "get", collection: "adRequests", find: { issuer: user[0].hash } })
            let result = [...dcsurveys, ...ipsurveys]
            console.log(result)
            res.status(200).json(result)
        }
        res.status(200)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: err })
    }
}