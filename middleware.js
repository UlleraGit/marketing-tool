import { NextResponse } from "next/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

export async function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  const provider = new CognitoIdentityProvider({ region: "eu-central-1" });
  const verifier = await CognitoJwtVerifier.create({
    userPoolId: "eu-central-1_Ijwy5O5t1",
    tokenUse: "access",
    clientId: "3k6bj2r7tnkkmque5l4v67a6be",
  });
  let tokenValid;
  let res;
  try {
    await verifier.verify(request.cookies.get("AccessToken").value);
    res = await provider.getUser({
      AccessToken: request.cookies.get("AccessToken").value,
    });
    tokenValid = true;
  } catch (e) {
    tokenValid = false;
    console.log(e);
  }
  if (tokenValid) {
    if (tokenValid) {
      requestHeaders.set("x-username", res.Username);
      if (res.UserAttributes[1].Value == "1") {
        requestHeaders.set("x-admin-state", true);
        return NextResponse.next({ request: { headers: requestHeaders } });
      } else {
        requestHeaders.set("x-admin-state", false);
        return NextResponse.next({ request: { headers: requestHeaders } });
      }
    }
  } else {
    return NextResponse.redirect(new URL("http://localhost:3000/"));
  }
}
export const config = {
  matcher: ["/u/:path*", "/api/private/:path*"],
};
