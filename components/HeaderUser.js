import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Image from 'next/image'
import icon from '/public/iconn.svg'
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const provider = new CognitoIdentityProvider({ region: "eu-central-1" });
  const router = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () =>{
     provider.globalSignOut(getCookie("AccessToken"));
     router.reload();
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar sx={{display:"flex", justifyContent:"space-between", mx:"10%"}}>
          <Image src={icon} width={30} height={30} style={{alignSelf:"center"}}/>
          <Typography sx={{fontSize:"21px"}}>Zgefragt.</Typography>
          <div>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              edge="end"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize='large'/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogOut}>Abmelden</MenuItem>
              <MenuItem onClick={handleClose}>Hilfe</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}