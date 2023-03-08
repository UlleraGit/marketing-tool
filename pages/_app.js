import React from "react";
import lightTheme from "../styles/theme/lightTheme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
};
export default MyApp;
