import campagneCreator from "../../../util/campagne"
import connection from "../../../lib/mongodb";
var bcrypt = require('bcryptjs');

export default async function handler(req, res) {
    const value = JSON.parse(req.body)
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
            await connection({ task: "set", collection: "ipRequest", data: { name: value.title + " " + user[0].hash, issuer: user[0].hash, ...value, answers: null, creationTime: new Date() } });
            res.status(200).json({ status: "success" })
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
