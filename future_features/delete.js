import connection from "../lib/mongodb"
export default async function handler(req, res) {
    try {
        const values = JSON.parse(req.body);
        await connection({ task: "drop", data: values , collection: "adRequests" })
        res.status(200).json({state:"OK"});
    } catch (err) {
        console.log(err)
    }
}