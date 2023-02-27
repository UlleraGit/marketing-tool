import { Authentication } from "../../../util/loginLogic";
export default async function handler(req, res) {
  const values = JSON.parse(req.body);
  const authenticate = new Authentication();
  authenticate.setauthenticationDetails({
    Username: values.Username,
    Password: values.Password,
  });
  authenticate.setuserData(values);
  const result = await authenticate.handleNewPassword(
    values.NewPassword,
    values.UserAttributes
  );
  if (result.state == "sucessNewPassword") {
    res.status(200).json(result);
  } else {
    res.status(501).json(result.err);
  }
}
