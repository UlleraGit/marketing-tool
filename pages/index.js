/* eslint-disable */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import backgroundPicture from "../public/DCHintergrund.png";
import Cookies from "js-cookie";
import CookieBanner from "../components/CookieBanner";
import { InputAdornment, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="#fff"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://datacircle.eu">
        datacircle GmbH
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = React.useState("");
  const [newPasswordRequired, setNewPasswordRequired] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [userAttributes, setUserAttributes] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/public/authenticate", {
      method: "POST",
      body: JSON.stringify({ Username: username, Password: password }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          if (response.state == "newpassword") {
            setNewPasswordRequired(true);
            setUserAttributes(response.userAttributes);
          } else if (response.state == "success") {
            Cookies.set("AccessToken", response.accessToken);
            Cookies.set("RefreshToken", response.refreshToken);
            Cookies.set("IdToken", response.idToken)
            router.push("/u/dashboard")
          }
        } else {
          setErr("Falscher Benutzername oder falsches Passwort!");
        }
      })
      .catch((err) => {
        console.log(err)
        setErr("Fehler beim Aufbau einer Verbindung! Versuche es nochmal.");
      });
  };
  const handleNewPassword = (event) => {
    event.preventDefault();
    if (newPassword == newPasswordConfirmation) {
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
                  { "&:hover": { backgroundColor: "#1E90FF" } },
                  { mt: 3, mb: 2, backgroundColor: "#0000FF" },
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
                label="Email"
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
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                InputProps={{ // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={[
                  { "&:hover": { backgroundColor: "#1E90FF" } },
                  { mt: 3, mb: 2, backgroundColor: "#0000FF" },
                ]}
              >
                Login
              </Button>
            </Box>
            {err && <Typography color="error">{err}</Typography>}
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Link style={{ color: "#fff", }} href="/register">
                Registrieren
              </Link>
              <Link style={{ color: "#fff", }} href="/forgotcode">
                Passwort zurücksetzen
              </Link>
            </Box>
          </Box>
        )}
        <CookieBanner />
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </div>
  );
}
