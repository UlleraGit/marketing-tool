import { CognitoJwtVerifier } from "aws-jwt-verify";
import { getCookie } from "cookies-next";

export default async function handler(req, res) {
  let tokenValid;
  const verifier = CognitoJwtVerifier.create({
    userPoolId: "eu-central-1_HYkj5z08r",
    tokenUse: "access",
    clientId: "6gapt5uqq79fome27kngjuetht",
  });
  let Token = getCookie("Token", { req, res });
  console.log(Token);
  try {
    const payload = await verifier.verify(Token.value);
    tokenValid = true;
  } catch {
    tokenValid = false;
  }
  if (tokenValid) {
    res.status(200).json({ mess:"1" });
  } else {
    res.status(501).json({error:"2"});
  }
}
