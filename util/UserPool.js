import { CognitoUserPool,CookieStorage } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId:'eu-central-1_Ijwy5O5t1',
    ClientId: '3k6bj2r7tnkkmque5l4v67a6be',
    cookieStorage: {
        domain: 'localhost',
        secure: false,
        path: '/',
        expires: 365,
      },
}
export default new CognitoUserPool(poolData);