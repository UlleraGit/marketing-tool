import React from 'react';
import lightTheme from '../styles/theme/lightTheme';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";



const MyApp = ({ Component, pageProps }) => {
  
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};
export default MyApp;
