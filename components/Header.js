import { useState } from 'react';
import { useRouter } from 'next/router';
import * as React from "react"
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import Logo from '../public/LOGO-DC.png'
const Header = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNavigate = (path) => {
    router.push(path);
    handleClose();
  };

  const handleLogout = async () => {
    deleteCookie("AccessToken");
    deleteCookie("IdToken")
    deleteCookie("RefreshToken");
    router.push('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar sx={{backgroundColor:"#fff"}} position="static">
      <Toolbar>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center" ,flexGrow: 1 }}>
          <Link href="/u/dashboard" style={{ width: "150px", height:"45px", textDecoration: 'none', color: "#fff" }}>
            <Image
              src={Logo}
              width={150}
              height={45}
            />
          </Link>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Link href="/u/surveyselect" style={{ textDecoration: 'none', color: "#000" }} >
            <Button sx={{ color: "#000" }}>Tool</Button>
          </Link>
          <Link href="/u/surveystodo" style={{ textDecoration: 'none', color: "#000" }}>
            <Button sx={{ color: "#000" }}>Umfrage Mitmachen</Button>
          </Link>
          <Link href="/u/results" style={{ textDecoration: 'none', color: "#000" }}>
            <Button sx={{ color: "#000" }}>Ergebnisse</Button>
          </Link>
          <Link href="/u/reports" style={{ textDecoration: 'none', color: "#000" }}>
            <Button sx={{ color: "#000" }}>reports</Button>
          </Link>
        </Box>
        <Button sx={{color:"#000"}} onClick={handleClick}>
          <AccountCircleIcon sx={{ marginRight: '0.5rem' }} />
          Options
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          keepMounted
        >
          <MenuItem onClick={() => handleNavigate('https://billing.stripe.com/p/login/test_4gw3dz9GD8cedvW288')}>Manage Subscriptions</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar >
  );
};

export default Header;
