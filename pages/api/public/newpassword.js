import { Authentication } from "../../../util/loginLogic";
export default async function handler(req, res) {
    console.log(req.body)
    const values = JSON.parse(req.body);
    const authenticate = new Authentication();
    authenticate.setuserData(values)
    const result = await authenticate.handleNewPassword(values.NewPassword, values.UserAttributes);
    console.log(result)
    if (result.state == "success") {
        res.status(200).json(result)
    } else {
        res.status(501).json(result.err);
    }
}

