/* eslint-disable */
import { useState } from 'react';
import { useRouter } from 'next/router';
import * as React from "react"
import { AppBar, Toolbar, Drawer, Button, Menu, MenuItem, Box, useMediaQuery } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import Logo from '../public/LOGO-DC.png'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

const Header = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
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

  const phone = useMediaQuery('(max-width:767px)')
  const tablet = useMediaQuery('(max-width:1024px)')
  if (tablet) {
    return (
      <Box>
        <AppBar sx={{backgroundColor:"#fff"}} position='static' open={open}>
          <Toolbar>
          <Box sx={{ flexGrow: 1 , display:"flex"}}>
            <Link href="/u/dashboard" style={{ width: "150px", height: "45px", textDecoration: 'none', color: "#fff", alignItems:"end",alignContent:"end" }}>
              <Image
                src={Logo}
                width={150}
                height={45}
              />
            </Link>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ color:"#000", ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: "100%",
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: "100%",
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', }}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon fontSize="large"/>
            </IconButton>
          </Box>
          <Divider />
          <List>
            {[{ name: "Tool", adresse: "surveyselect" }, { name: "Umfrage Mitmachen", adresse: "surveystodo" }, { name: "Ergebnisse", adresse: "results" }, { name: "Reports", adresse: "reports" }].map((a, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <Link href={`/u/${a.adresse}`} style={{ textDecoration: 'none', color: "#000", fontSize:"40px" }}>
                    {a.name}
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
            <ListItemButton onClick={() => handleNavigate('https://billing.stripe.com/p/login/bIY7vt4QT9kG5Og144')} sx={{fontSize:"40px"}}>
              Report Abos verwalten
            </ListItemButton>
            <ListItemButton onClick={handleLogout}  sx={{fontSize:"40px"}}>
              Außloggen
            </ListItemButton>
          </List>
        </Drawer>
      </Box>
    )
  } else {
    return (
      <AppBar sx={{ backgroundColor: "#fff" }} position="static">
        <Toolbar>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", flexGrow: 1 }}>
            <Link href="/u/dashboard" style={{ width: "150px", height: "45px", textDecoration: 'none', color: "#fff" }}>
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
              <Button sx={{ color: "#000" }}>Report</Button>
            </Link>
          </Box>
          <Button sx={{ color: "#000" }} onClick={handleClick}>
            <AccountCircleIcon sx={{ marginRight: '0.5rem' }} />
            Options
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            keepMounted
          >
            <MenuItem onClick={() => handleNavigate('https://billing.stripe.com/p/login/bIY7vt4QT9kG5Og144')}>Report Abos verwalten</MenuItem>
            <MenuItem onClick={handleLogout}>Außloggen</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar >);
  }
};

export default Header;
