import { CognitoUserPool,CookieStorage } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId:'eu-central-1_Mxr9gRsxQ',
    ClientId: '8g7ht3oqdb8li32kfj4ha5uba',
    cookieStorage: {
        domain: 'localhost',
        secure: false,
        path: '/',
        expires: 365,
      },
}
export default new CognitoUserPool(poolData);