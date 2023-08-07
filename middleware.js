import { NextResponse } from "next/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

export async function middleware(request) {
  // Create a new instance of CognitoIdentityProvider with the specified region.
  const provider = new CognitoIdentityProvider({ region: "eu-central-1" });

  // Create a CognitoJwtVerifier instance with the specified user pool ID, token use, and client ID.
  const verifier = await CognitoJwtVerifier.create({
    userPoolId: "eu-central-1_mU2eOQo0o",
    tokenUse: "access",
    clientId: "5ng3u55q2mhjn2kpdgk6rvvnk0",
  });

  let tokenValid;
  let res;

  try {
    // Verify the access token extracted from the request's cookies.
    await verifier.verify(request.cookies.get("AccessToken").value);

    // If the verification is successful, get the user information from Cognito.
    res = await provider.getUser({
      AccessToken: request.cookies.get("AccessToken").value,
    });

    tokenValid = true;
  } catch (e) {
    // If the verification fails or there's an error, set tokenValid to false and log the error.
    tokenValid = false;
  }

  // If the token is valid, allow the request to proceed.
  if (tokenValid) {
    return NextResponse.next({ /*request: { headers: requestHeaders }*/ });
  } else {
    // If the token is not valid, redirect the user to the homepage.
    return NextResponse.redirect(new URL("http://localhost:3000/"));
  }
}

export const config = {
  matcher: ["/u/:path*", "/api/private/:path*"],
};
