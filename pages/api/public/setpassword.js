import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../../util/UserPool';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    console.log(req.body)
    const { username, code, password } = req.body;
    newPassword(code, password, username)
        .then(() => {
            res.status(200).json({ message: 'Verification successful' });
        })
        .catch((error) => {
            res.status(400).json({ message: '', error: error.message });
        });
}

function newPassword(code, password, username) {
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
        cognitoUser.confirmPassword(code, password, {
            onSuccess() {
                console.log('Password confirmed!');
            },
            onFailure(err) {
                console.log('Password not confirmed!');
            },
        });
    });
}
