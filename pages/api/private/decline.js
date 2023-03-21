import connection from "../../../lib/mongodb"
export default async function handler(req, res) {
    try {
        const values = JSON.parse(req.body);
        await connection({ task: "change", find: values , collection: "adRequests" })
        res.status(200);
    } catch (err) {
        console.log(err)
    }
}
