import { ObjectId } from "mongodb";
import connection from "../../../lib/mongodb";
export default async function handler(req, res) {
    try {
        const values = req.body;
        const jwt = require('jsonwebtoken');
        const accessToken = req.cookies.IdToken;
        const decodedToken = jwt.decode(accessToken, { complete: true });
        const { payload } = decodedToken;
        const email = payload.email;
        const givenName = payload.given_name;
        const familyName = payload.family_name;
        let user = await connection({ task: "get", collection: "users", find: { email: email } })
        let nOAS = user[0].numberOfAnsweredSurveys + 1

        await connection({ task: "push", collection: "users", find: { _id: user[0]._id }, change: { answeredSurveys: ObjectId(values.id) } })
        await connection({ task: "change", collection: "users", find: { _id: user[0]._id }, change: { numberOfAnsweredSurveys: nOAS } })
        await connection({ task: "push", collection: "dcSurveys", find: { _id: values.id }, change: { answers: values.answer } })
        console.log("done")
        res.status(200).json({ state: "success" })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: err })
    }
}