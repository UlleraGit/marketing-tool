import { NextResponse } from "next/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { getCookie } from "cookies-next";
import {
  CognitoIdentityProvider,
  AddCustomAttributesCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import UserPool from "./util/UserPool";

export async function middleware(request) {
  const provider = new CognitoIdentityProvider({ region: "eu-central-1" });
  const verifier = await CognitoJwtVerifier.create({
    userPoolId: "eu-central-1_HYkj5z08r",
    tokenUse: "access",
    clientId: "6gapt5uqq79fome27kngjuetht",
  });
  let tokenValid;
  let adminStatus;

  try {
    const payload = await verifier.verify(
      request.cookies.get("AccessToken").value
    );
    const res = await provider.getUser({
      AccessToken: request.cookies.get("AccessToken").value,
    });
    console.log(res);
    tokenValid = true;
  } catch (e) {
    tokenValid = false;
    console.log(e);
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
