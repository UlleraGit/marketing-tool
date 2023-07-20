import { NextResponse } from "next/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

export async function middleware(request) {
  const provider = new CognitoIdentityProvider({ region: "eu-central-1" });
  const verifier = await CognitoJwtVerifier.create({
    userPoolId: "eu-central-1_mU2eOQo0o",
    tokenUse: "access",
    clientId: "5ng3u55q2mhjn2kpdgk6rvvnk0",
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
        return NextResponse.next({ /*request: { headers: requestHeaders }*/ });
  } else {
    return NextResponse.redirect(new URL("http://localhost:3000/"));
  }
}
export const config = {
  matcher: ["/u/:path*", "/api/private/:path*"],
};
