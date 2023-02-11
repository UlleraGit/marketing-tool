import { Authentication } from "../../../util/loginLogic";
export default async function handler(req, res) {
    const authenticate = new Authentication(req.body);
    const result = await authenticate.handleNewPassword();
    console.log(result);
    if (result.state == "success") {

    } else {
        res.status(501).json(result.err);
    }
}