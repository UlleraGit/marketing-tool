import { campaignCreator, } from "../../util/campagne";


export default async function handler(req, res) {
  await campaignCreator('d');
  res.status(200).json({ name: "ok" })
}