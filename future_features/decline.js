import connection from "../lib/mongodb"
export default async function handler(req, res) {
    try {
        const values = JSON.parse(req.body);
        await connection({ task: "change", find: values, change: { status: "ABGELEHNT" } , collection: "adRequests" })
        res.status(200).json({state:"OK"});
    } catch (err) {
        console.log(err)
    }
}