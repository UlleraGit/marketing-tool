import { TextField } from "@mui/material";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";
import * as React from "react"

export default () =>{
    const [oldpassword, setOldPassword] = React.useState('');
    const [newpassword, setNewPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const changePassword = (event) =>{
        event.preventDefault();
        var userData = {
            Username: 'username',
            Pool: userPool,}
    }

    return(
        <div>
            <TextField onChange={(event) => setOldPassword(event.target.value)}/>
            <TextField onChange={(event) => setNewPassword(event.target.value)}/>
            <TextField onChange={(event) => setUsername(event.target.value)}/>
            <button onSubmit={changePassword}>Test</button>
        </div>
    )
}