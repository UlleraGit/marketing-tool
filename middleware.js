import { NextResponse } from "next/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { getCookie } from "cookies-next";
import * as AWS from "aws-sdk";

export async function middleware(request) {
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  let tokenValid;
  const verifier = CognitoJwtVerifier.create({
    userPoolId: "eu-central-1_HYkj5z08r",
    tokenUse: "access",
    clientId: "6gapt5uqq79fome27kngjuetht",
  });
  try {
    let Token = request.cookies.get("Token").value;
    const payload = await verifier.verify(Token);
    console.log(payload);
    cognitoidentityserviceprovider.getUser(
      { AccessToken: Token },
      (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      }
    );
    tokenValid = true;
  } catch {
    tokenValid = false;
  }
  if (tokenValid) {
    return;
  } else {
    return NextResponse.redirect(new URL("http://localhost:3000/"));
  }
}

export const config = {
  matcher: ["/u/:path*", "/api/private/:path*"],
};
