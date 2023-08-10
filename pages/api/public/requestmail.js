import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../../util/UserPool';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const { username } = req.body;
    console.log(username)
    try {
        const result = await newPassword(username);
        res.status(200).json({ message: 'Verification successful', result });
    } catch (error) {
        res.status(400).json({ message: 'Invalid verification code', error: error.message });
    }
}

async function newPassword(username) {
    const userPool = UserPool;
    const userData = {
        Username: username,
        Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    try {
        const result = await new Promise((resolve, reject) => {
            cognitoUser.forgotPassword({
                onSuccess: function (data) {
                    // Successfully initiated reset password request
                    console.log('CodeDeliveryData from forgotPassword:', data.CodeDeliveryDetails);
                    resolve(data);
                },
                onFailure: function (err) {
                    reject(err);
                },
            });
        });

        return result;
    } catch (error) {
        throw error;
    }
}
