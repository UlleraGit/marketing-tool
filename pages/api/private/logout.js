import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { getCookie } from 'cookies-next';
export default async function handler(req, res) {
    try {
        const provider = new CognitoIdentityProvider({ region: "eu-central-1" });
        const token = await getCookie('AccessToken', {req,res})
        await provider.globalSignOut(token).then(result => console.log(result))
        res.status(200)
    } catch (err) {
        console.log(err)
    }
}
