import campagneCreator from "../../../util/campagne"
export default async function handler(req, res) {
    try {
        await campagneCreator("New")
        res.status(200).json({res:succes});
    }
    catch (err) {
        console.log(err)
        res.status(400).json({error:"result"})
    }
}
