/* eslint-disable */
import React, { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr'
import { Box, Typography, TextField, Button, Popover } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { useMediaQuery } from '@mui/material';

export default function PopupBox(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const phone = useMediaQuery('(max-width:767px)')
  const { mutate } = useSWRConfig()

  const fetcher = (...args) => fetch(...args, {
    method: "POST",
    body: JSON.stringify({ search: sessionStorage.getItem("search") }),
  }).then(res => res.json())
  const { data, error, isLoading, isValidating } = useSWR('/api/private/unsplash', fetcher, {
    revalidateOnFocus: false,
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const debouncedUpdate = debounce(updateDebounceValue, 500);

  function debounce(callback, time) {
    let debounceTimer;

    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        callback.apply(this, args);
      }, time);
    };
  }

  function updateDebounceValue(e) {
    sessionStorage.setItem('search', e.target.value);
    mutate('/api/private/unsplash');
  }

  if (phone) {
    return (
      <div>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          <ImageSearchIcon />
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}

          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box sx={{ width: "400px", height: "100%" }}>
            <Box sx={{ my: "5px" }}>
              <TextField id="" label="search" variant="outlined" sx={{ width: "100%", height: "100%" }} onChange={e => {
                debouncedUpdate(e);
              }}>
              </TextField>
            </Box>
            <Box sx={{ display: "flex", minHeight: "100%", width: "98%", flexWrap: "wrap", pt: "10px", gap: "1px", justifyContent: "center" }}>
              {
                (isLoading || isValidating) ? (<CircularProgress />) : (data.map((n, i) =>
                  <Box key={i} sx={{ display: "flex", flexDirection: "column", width: "33%", height: "100%", alignItems: "center", }}>
                    <Box key={i} id={i} onClick={(e) => { props.onClick(data[e.target.id].image) }} sx={{ backgroundImage: `url('${n.image}')`, objectFit: "cover", backgroundSize: "100% 100%", width: "100%", height: "64px", objectPosition: "center 0%" }}></Box>
                    <Typography fontSize="15px">{n.creator}</Typography>
                  </Box>)
                )
              }
            </Box>
          </Box>
        </Popover>
      </div>
    )
  } else {
    return (
      <div>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          <ImageSearchIcon />
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}

          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box sx={{ height: "650px", width: "500px" }}>
            <Box >
              <TextField id="" label="search" variant="outlined" sx={{ width: "100%", height: "100%" }} onChange={(e) => {
                debouncedUpdate(e);
              }}>
              </TextField>
            </Box>
            <Box sx={{ display: "flex", minHeight: "100%", minWidth: "100%", flexWrap: "wrap", pt: "10px", gap: "1px", width: "100%", justifyContent: "center" }}>
              {
                (isLoading || isValidating) ? (<CircularProgress />) : (data.map((n, i) =>
                  <Box key={i} sx={{ display: "flex", flexDirection: "column", width: "24%", height: "100%", alignItems: "center", }}>
                    <Box key={i} id={i} onClick={(e) => { props.onClick(data[e.target.id].image) }} sx={{ backgroundImage: `url('${n.image}')`, objectFit: "cover", backgroundSize: "100% 100%", width: "100%", height: "64px", objectPosition: "center 0%" }}></Box>
                    <Typography fontSize="15px">{n.creator}</Typography>
                  </Box>)
                )
              }
            </Box>
          </Box>
        </Popover>
      </div>
    );
  }
};