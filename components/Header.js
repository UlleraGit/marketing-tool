import { useState } from 'react';
import { useRouter } from 'next/router';
import * as React from "react"
import { AppBar, Toolbar, Typography, IconButton,Button, Menu, MenuItem, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserPool from '../util/UserPool';
import Link from 'next/link';

const Header = () => {
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleNavigate = (path) => {
      router.push(path);
      handleClose();
    };
  
    const handleLogout = () => {
      const userPool = UserPool
  
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.signOut();
      }
  
      handleClose();
      // Redirect to the login page or any other desired route
      router.push('/');
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          datacircle.
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Link href="/surveyselect" style={{ textDecoration: 'none', color:"#000" }} >
            <Button sx={{color:"#fff"}}>Tool</Button>
          </Link>
          <Link href="/surveystodo" style={{ textDecoration: 'none', color:"#000" }}>
            <Button sx={{color:"#fff"}}>Teilnahme an Umfrage</Button>
          </Link>
          <Link href="/results" style={{ textDecoration: 'none', color:"#000" }}>
            <Button sx={{color:"#fff"}}>Ergebnisse</Button>
          </Link>
          <Link href="/dataplatform" style={{ textDecoration: 'none', color:"#000" }}>
            <Button sx={{color:"#fff"}}>Datenplattform</Button>
          </Link>
          <Link href="/statistics" style={{ textDecoration: 'none', color:"#000" }}>
            <Button sx={{color:"#fff"}}>Erworbene Statistiken</Button>
          </Link>
        </Box>
        <Button color="inherit" onClick={handleClick}>
          <AccountCircleIcon sx={{ marginRight: '0.5rem' }} />
          Options
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          keepMounted
        >
          
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
