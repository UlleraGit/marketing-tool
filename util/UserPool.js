import { CognitoUserPool,CookieStorage } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId:'eu-central-1_mU2eOQo0o',
    ClientId: '5ng3u55q2mhjn2kpdgk6rvvnk0',
    cookieStorage: {
        domain: 'localhost',
        secure: false,
        path: '/',
        expires: 365,
      },
}
export default new CognitoUserPool(poolData);