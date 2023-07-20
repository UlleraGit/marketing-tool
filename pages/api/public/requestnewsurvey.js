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
            let result = await connection({ task: "get", collection: "dcSurveys", find: { _id: { $nin: user[0].answeredSurveys } } });
            res.status(200).json(result)
        }
        
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: err })
    }
}