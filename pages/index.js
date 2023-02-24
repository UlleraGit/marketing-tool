import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import backgroundPicture from "../public/ZgefragtHintergrund.png";
import * as AWS from "aws-sdk/global";
import Cookies from "js-cookie"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://zgefragt.com">
        Zgefragt
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    React.useState("");
  const [newPasswordRequired, setNewPasswordRequired] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [userAttributes, setUserAttributes] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/public/authenticate", {
      method: "POST",
      body: JSON.stringify({ Username: username, Password: password }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.state == "newpassword") {
          setNewPasswordRequired(true);
          console.log(response.userAttributes);
          setUserAttributes(response.userAttributes);
        }
        else if(response.state == "success"){
          Cookies.set('Token', response.token)
          window.location.replace("/u/dashboard")
        }
      })
      .catch((err) => {
        setErr(err.err);
      });
  };
  const handleNewPassword = (event) => {
    event.preventDefault();
    if (newPassword == newPasswordConfirmation) {
      console.log(userAttributes);
      fetch("/api/public/newpassword", {
        method: "POST",
        body: JSON.stringify({
          Username: username,
          Password: password,
          NewPassword: newPassword,
        }),
      })
        .then((response) => response.json())
        .then((response) => console.log(response));
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundPicture.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{ height: "100vh", width: "100vw" }}
      >
        {newPasswordRequired ? (
          <Box
            sx={{
              paddingTop: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4" sx={{ color: "#fff" }}>
              Neues Passwort benötigt
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="NewPassword"
                label="Neues Passwort"
                type="password"
                id="newpassword"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="NewPasswordConfirmation"
                label="Neues Passwort bestätigen"
                type="password"
                id="newpasswordconfirmaton"
                value={newPasswordConfirmation}
                onChange={(event) =>
                  setNewPasswordConfirmation(event.target.value)
                }
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={[
                  { "&:hover": { backgroundColor: "#FF54BD" } },
                  { mt: 3, mb: 2, backgroundColor: "#EB0388" },
                ]}
                onClick={handleNewPassword}
              >
                Login
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              paddingTop: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4" sx={{ color: "#fff" }}>
              Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="Username"
                autoComplete="username"
                value={username}
                autoFocus
                onChange={(event) => setUsername(event.target.value)}
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={[
                  { "&:hover": { backgroundColor: "#FF54BD" } },
                  { mt: 3, mb: 2, backgroundColor: "#EB0388" },
                ]}
              >
                Login
              </Button>
            </Box>
          </Box>
        )}
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </div>
  );
}
