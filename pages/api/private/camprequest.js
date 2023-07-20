import connection from "../../../lib/mongodb";

export default async function handler(req, res) {
  const values = JSON.parse(req.body);
  let upload = await connection(values);
  res.status(200).json(upload)
}
