import * as AWS from "aws-sdk/global";
import {
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CookieStorage,
} from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

export class Authentication {
  authenticationDetails;
  userData;
  cognitoUser;
  CookieStorage
  setauthenticationDetails(authenticationData) {
    this.authenticationDetails = new AuthenticationDetails(authenticationData);
  }

  setuserData(authenticationData) {
    this.userData = { Username: authenticationData.Username, Pool: UserPool,};
    this.cognitoUser = new CognitoUser(this.userData);
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      this.cognitoUser.authenticateUser(this.authenticationDetails, {
        onSuccess: function (result) {
          var idToken = result.getIdToken().getJwtToken();
          var refreshToken = result.getRefreshToken().getToken();
          var accessToken = result.getAccessToken().getJwtToken();
          /*      AWS.config.region = process.env.COGNITO_REGION;
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.COGNITO_USER_POOL_ID,
            Logins: {
              "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_HYkj5z08r":
                result.getIdToken().getJwtToken(),
            },
          });
          AWS.config.credentials.refresh((error) => {
            if (error) {
              console.error(error);
            } else {
              console.log("Successfully logged!");
            }
          });*/
          resolve({ state: "success", accessToken});
        },
        onFailure: function (err) {
          resolve({ state: "failure", err: err });
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          delete userAttributes.email_verified;
          resolve({ state: "newpassword", userAttributes });
        },
      });
    });
  }

  /*
  handleNewPassword(newPassword, sessionUserAttributes) {
    return new Promise((resolve, reject) => {
      this.cognitoUser.completeNewPasswordChallenge(
        newPassword,
        JSON.stringify({ UserAttributes: [{ name: "" }] }),
        {
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
            resolve({ state: "failure", err: err });
          },
        }
      );
    }); */
  handleNewPassword(newPassword, sessionUserAttributes) {
    return new Promise((resolve, reject) => {
      let cognitoUser = this.cognitoUser;
      cognitoUser.authenticateUser(this.authenticationDetails, {
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          console.log(userAttributes);
          cognitoUser.completeNewPasswordChallenge(
            newPassword,
            userAttributes,
            {
              onSuccess: function (result) {
                console.log(result);
                resolve({ state: "successNewPassword", result });
              },
              onFailure: function (err) {
                resolve({ state: "failure", err });
              },
            }
          );
        },
      });
    });
  }
}
