import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import backgroundPicture from '../public/ZgefragtHintergrund.png'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Zgefragt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundPicture.src})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", }}>
      <Container component="main" maxWidth="xs" sx={{ height: "100vh", width: "100vw", }} >
        <Box
          sx={{
            paddingTop: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

          }}
        >
          <Typography component="h1" variant="h4" sx={{color:'#fff'}}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={[{ '&:hover': { backgroundColor: "#FF54BD" } }, { mt: 3, mb: 2, backgroundColor: "#EB0388" }]}
            >
              Login
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </div>
  );
}