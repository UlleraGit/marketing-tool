import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId:'eu-central-1_HYkj5z08r',
    ClientId: '6gapt5uqq79fome27kngjuetht'
}

export default new CognitoUserPool(poolData);