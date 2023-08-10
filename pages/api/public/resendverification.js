import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../../util/UserPool';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    const { username } = req.body;
    verifyCode(username)
        .then(() => {
            res.status(200).json({ message: 'Email sent' });
        })
        .catch((error) => {
            res.status(400).json({ message: 'Invalid verification code', error: error.message });
        });
}

function verifyCode(username) {
    const userPool = UserPool
    const userData = {
        Username: username,
        Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
        if (!cognitoUser) {
            reject(new Error('User not found'));
            return;
        }
        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                resolve(err)
            }
            console.log('call result: ' + result);
            resolve(result)
        });
    });
}
