import { NextResponse } from 'next/server';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'

export function middleware(request) {
  var poolData = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID, // Your user pool id here
    ClientId: process.env.COGNITO_CLIENT_ID, // Your client id here
  };
  var userPool = new CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();

  if (!cognitoUser) {
    reject('Could not retrieve current user');
    return;
  }

  cognitoUser.getSession((err, session) => {
    if (err) {
      reject('Error retrieving user session: ', err);
      return;
    }

    if (session.isValid()) {
      
    } else {
      reject('Session is not valid');
    }
  });
}

export const config = {
  matcher: ['/u/:path*', '/api/private/:path*'],
}
