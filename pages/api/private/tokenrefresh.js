import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";


export default async function handler(req, res) {
    let newToken = await refreshAccessToken(req.cookies.RefreshToken)
    return res.status(200).json(newToken);
}

async function refreshAccessToken(refreshToken) {
    const poolData = {
        UserPoolId: "eu-central-1_mU2eOQo0o",
        ClientId: "5ng3u55q2mhjn2kpdgk6rvvnk0"
    };
    const refreshParams = {
        AuthFlow: "REFRESH_TOKEN_AUTH",
        ClientId: poolData.ClientId,
        AuthParameters: {
            REFRESH_TOKEN: refreshToken
        }
    };
    const cognitoClient = new CognitoIdentityProviderClient({ region: "eu-central-1" });
    try {
        const refreshCommand = new InitiateAuthCommand(refreshParams);
        const refreshResponse = await cognitoClient.send(refreshCommand);

        // Extract new session tokens
        const newIdToken = refreshResponse.AuthenticationResult.IdToken;
        const newAccessToken = refreshResponse.AuthenticationResult.AccessToken;

        return { newIdToken, newAccessToken }
        // Now you have refreshed tokens that you can use for further authenticated requests.
    } catch (error) {
        console.error("Error refreshing token:", error);
        // Handle token refresh failure, e.g., redirect the user to the login page.
    }
}