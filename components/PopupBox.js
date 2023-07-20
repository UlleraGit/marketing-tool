import React, { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr'
import { Box, Typography, TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

export default function PopupBox(props) {
  const { mutate } = useSWRConfig()
  const fetcher = (...args) => fetch(...args, {
    method: "POST",
    body: JSON.stringify({ search: keyword }),
  }).then(res => res.json())
  const { data, error, isLoading, isValidating } = useSWR('/api/public/unsplash', fetcher)
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = React.useState("new");
  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    mutate('/api/public/unsplash')
  }, [keyword])
  if (error) return (<CircularProgress color="neutral" />)

  if (isLoading || isValidating) return (
    <Box sx={{ position: "relative", }}>
      <Button onClick={handleButtonClick} sx={{ color: '#fff', height: '100%', width: "49%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ImageSearchIcon />
      </Button>
      {isOpen ?
        (<Box sx={{ width: "540px", overflow: "scroll", height: "485px", p: "10px", position: "absolute", top: "-150%", right: "10%", pointerEvents: "auto", boxShadow: " 0 3px 10px rgb(0 0 0 / 1)", backgroundColor: "#fff", zIndex: 1, borderRadius: "4px", }} className="popup-box">
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box sx={{ display: "flex", alignItems: "center", opacity: "1" }}>
              <span className="close" onClick={handleClose}>
                &times;
              </span>
            </Box>
            <Box >
              <TextField id="" label="search" variant="outlined" sx={{ width: "100%", height: "100%" }} onChange={e => {
                setKeyword(e.target.value);
              }}>
              </TextField>
            </Box>
            <Box sx={{ display: "flex", minHeight: "100%", minWidth: "100%", justifyContent: "center", alignItems: "center", flexWrap: "wrap", pt: "10px" }}>
              <CircularProgress />
            </Box>
          </Box>
        </Box>) :
        (<></>)
      }
    </Box >)

  return (
    <Box sx={{ position: "relative", }}>
      <Button onClick={handleButtonClick} sx={{ color: '#fff', height: '100%', width: "49%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ImageSearchIcon />
      </Button>
      {isOpen ?
        (<Box sx={{ width: "540px", overflow: "scroll", height: "485px", p: "10px", position: "absolute", top: "-150%", right: "10%", pointerEvents: "auto", boxShadow: " 0 3px 10px rgb(0 0 0 / 1)", backgroundColor: "#fff", zIndex: 1, borderRadius: "4px", }} className="popup-box">
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box sx={{ display: "flex", alignItems: "center", opacity: "1" }}>
              <span className="close" onClick={handleClose}>
                &times;
              </span>
            </Box>
            <Box >
              <TextField id="" label="search" variant="outlined" sx={{ width: "100%", height: "100%" }} onChange={e => {
                setKeyword(e.target.value);
              }}>
              </TextField>
            </Box>
            <Box sx={{ display: "flex", minHeight: "100%", minWidth: "100%", flexWrap: "wrap", pt: "10px", gap: "1px", width: "100%", justifyContent: "center" }}>
              {
                data.map((n, i) => {
                  return (
                    <Box key={i} sx={{ display: "flex", flexDirection: "column", width: "24%", height: "100%", alignItems: "center", }}>
                      <Box key={i} id={i} onClick={(e) => { props.onClick(data[e.target.id].image)}} sx={{ backgroundImage: `url('${n.image}')`, objectFit: "cover", backgroundSize: "100% 100%", width: "100%", height: "64px", objectPosition: "center 0%" }}></Box>
                      <Typography fontSize="15px">{n.creator}</Typography>
                    </Box>
                  )
                })
              }
            </Box>
          </Box>
        </Box>) :
        (<></>)
      }
    </Box >
  );
};
