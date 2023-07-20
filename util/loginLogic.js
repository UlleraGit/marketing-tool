import {
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

export class Authentication {
  authenticationDetails;
  userData;
  cognitoUser;
  CookieStorage;

  setauthenticationDetails(authenticationData) {
    this.authenticationDetails = new AuthenticationDetails(authenticationData);
  }

  setuserData(authenticationData) {
    this.userData = { Username: authenticationData.Username, Pool: UserPool };
    this.cognitoUser = new CognitoUser(this.userData);
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      this.cognitoUser.authenticateUser(this.authenticationDetails, {
        onSuccess: function (result) {
          var idToken = result.getIdToken().getJwtToken();
          var refreshToken = result.getRefreshToken().getToken();
          var accessToken = result.getAccessToken().getJwtToken();
          resolve({ state: "success", accessToken, idToken, refreshToken });
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
  handleNewPassword(newPassword, sessionUserAttributes) {
    return new Promise((resolve, reject) => {
      let cognitoUser = this.cognitoUser;
      cognitoUser.authenticateUser(this.authenticationDetails, {
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          cognitoUser.completeNewPasswordChallenge(
            newPassword,
            userAttributes,
            {
              onSuccess: function (result) {
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

/*
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

export class Authentication {
  constructor() {
    this.cognitoUser = null;
  }

  authenticate(username, password) {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: username,
      Pool: UserPool,
    };
    this.cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const accessToken = result.getAccessToken().getJwtToken();
          const idToken = result.getIdToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();
          resolve({ state: "success", accessToken, idToken, refreshToken });
        },
        onFailure: (err) => {
          reject(err); // Use reject instead of resolve for errors
        },
        newPasswordRequired: (userAttributes) => {
          delete userAttributes.email_verified;
          resolve({ state: "newpassword", userAttributes });
        },
      });
    });
  }

  handleNewPassword(newPassword, sessionUserAttributes) {
    return new Promise((resolve, reject) => {
      this.cognitoUser.completeNewPasswordChallenge(
        newPassword,
        sessionUserAttributes,
        {
          onSuccess: (result) => {
            resolve({ state: "successNewPassword", result });
          },
          onFailure: (err) => {
            reject(err); // Use reject instead of resolve for errors
          },
        }
      );
    });
  }
}
*/