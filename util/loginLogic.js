import * as AWS from "aws-sdk/global";
import {
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

export class Authentication {
  constructor(authenticationData) {
    this.authenticationDetails = new AuthenticationDetails(authenticationData);
    this.userData = { Username: authenticationData.Username, Pool: UserPool };
    this.cognitoUser = new CognitoUser(this.userData);
  }
  authenticate() {
    return new Promise((resolve, reject) => {
      this.cognitoUser.authenticateUser(this.authenticationDetails, {
        onSuccess: function (result) {
          var accessToken = result.getAccessToken().getJwtToken();
          AWS.config.region = process.env.COGNITO_REGION;
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.COGNITO_USER_POOL_ID,
            Logins: {
              "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_daOY6Fu4E":
                result.getIdToken().getJwtToken(),
            },
          });
          AWS.config.credentials.refresh((error) => {
            if (error) {
              console.error(error);
            } else {
              console.log("Successfully logged!");
            }
          });
          resolve({ state: "success", Token: accessToken });
        },
        onFailure: function (err) {
          resolve({ state: "failure", err: JSON.stringify(err) });
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          delete userAttributes.email_verified;
          resolve({ state: "newPasswordRequired", userAttributes });
        },
      });
    });
  }
  handleNewPassword(newPassword) {
    this.cognitoUser.completeNewPasswordChallenge(
      newPassword,
      sessionUserAttributes
    );
  }
}
