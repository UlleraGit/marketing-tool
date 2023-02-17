import { CognitoUserPool,CookieStorage } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId:'eu-central-1_HYkj5z08r',
    ClientId: '6gapt5uqq79fome27kngjuetht',
    Storage: new CookieStorage({domain: process.env.COOKIE_DOMAIN, secure:false})
}

export default new CognitoUserPool(poolData);