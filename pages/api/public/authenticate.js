import { Authentication } from "../../../util/loginLogic";
export default async function handler(req, res) {
  const authenticate = new Authentication(JSON.parse(req.body));
  const result = await authenticate.authenticate();
  console.log(result);
  if (result.state == "newpassword") {
    res.json(result)
  } else if (result.state == "success") {

  } else {
    res.status(501).json(result.err);
  }
}