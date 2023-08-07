import { CognitoIdentityServiceProvider, config as AWSConfig } from 'aws-sdk';
AWSConfig.update({ region: 'eu-central-1' });
export default async function handler(req, res){    
  const { email, password } = JSON.parse(req.body);
  console.log(email)
  const cognito = new CognitoIdentityServiceProvider();

  const params = {
    ClientId: '3bufc9hve7llktjqh26nrb1jvf',
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  try {
    const signUpResponse = await cognito.signUp(params).promise();
    const userId = signUpResponse.UserSub;

    const authenticationParams = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: '3bufc9hve7llktjqh26nrb1jvf',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: '16dftpmi33sl0bmkh50mn5hq81br8jiu6fbddokmfut978si0rd6',
      },
    };

    const authenticationResponse = await cognito
      .initiateAuth(authenticationParams)
      .promise();

    const accessToken = authenticationResponse.AuthenticationResult.AccessToken;
    const refreshToken = authenticationResponse.AuthenticationResult.RefreshToken;
    const idToken = authenticationResponse.AuthenticationResult.IdToken;

    res.status(200).json({ userId, accessToken, refreshToken, idToken });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'An error occurred while signing up.' });
  }
};
