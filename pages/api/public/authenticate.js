import { Authentication } from "../../../util/loginLogic";
export default async function handler(req, res) {
  const values = JSON.parse(req.body);
  const authenticate = new Authentication();
  authenticate.setauthenticationDetails(values);
  authenticate.setuserData(values);
  const result = await authenticate.authenticate();
  console.log(result);
  if (result.state == "newpassword") {
    res.json(result);
  } else if (result.state == "success") {
    res.status(200).json({ state: result.state, token: result.accessToken });
  } else {
    res.status(501).json(result.err);
  }
}
