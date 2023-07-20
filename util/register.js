const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import UserPool from "./UserPool";

const userPool = UserPool

export default function registerUser(firstName, lastName, password, email) {
  const attributeList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: 'email',
      Value: email
    }),
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: 'given_name',
      Value: firstName
    }),
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: 'family_name',
      Value: lastName
    })
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err)
        reject(err);
      } else {
        resolve(result.user);
      }
    });
  });
}