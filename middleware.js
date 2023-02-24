import { NextResponse } from "next/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { getCookie } from "cookies-next";
import {
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CookieStorage,
  CognitoUserSession,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js";
import UserPool from "./util/UserPool";
//import * as AWS from "aws-sdk";

export async function middleware(request) {
  //var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({region:process.env.COGNITO_REGION});
  let tokenValid;
  const verifier = await CognitoJwtVerifier.create({
    userPoolId: "eu-central-1_HYkj5z08r",
    tokenUse: "access",
    clientId: "6gapt5uqq79fome27kngjuetht",
  });

  const payload = await verifier.verify(
    request.cookies.get("AccessToken").value
  );
  const cognitoUser = new CognitoUser({
    Username: payload.username,
    Pool: UserPool,
  });

  const accessToken = new CognitoAccessToken(
    request.cookies.get("AccessToken").value
  );
  const idToken = new CognitoIdToken(request.cookies.get("IdToken").value);
  const refreshToken = new CognitoRefreshToken(
    request.cookies.get("RefreshToken").value
  );
  const userSession = new CognitoUserSession({
    AccessToken: accessToken,
    IdToken: idToken,
    RefreshToken: refreshToken,
  });
  await cognitoUser.setSignInUserSession(userSession);
  await cognitoUser.getSession(
    (err, session) => {
      console.log(err)
      if (session.isValid()) {
        console.log("valid");
      } else {
        console.log("invalid");
      }
    }
    /*{ AccessToken: Token },
      (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      }*/
  );
  /*  tokenValid = true;
  } catch {
    tokenValid = false;
  }
  if (tokenValid) {
    return;
  } else {
    return NextResponse.redirect(new URL("http://localhost:3000/"));
  }*/
  return;
}

export const config = {
  matcher: ["/u/:path*", "/api/private/:path*"],
};
