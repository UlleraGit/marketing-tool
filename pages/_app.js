import React from "react";
import lightTheme from "../styles/theme/lightTheme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Script from "next/script";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <Script async src="https://js.stripe.com/v3/pricing-table.js" />
    </div>
  );
};
export default MyApp;
