import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Image from 'next/image'
import icon from '/public/iconn.svg'
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
/* eslint-disable */
export default function headerUser() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    deleteCookie("AccessToken");
    deleteCookie("RefreshToken");
    router.reload();
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#fff'}} >
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
/* eslint-disable */