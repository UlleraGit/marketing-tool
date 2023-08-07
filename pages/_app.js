import React from "react";
import lightTheme from "../styles/theme/lightTheme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Script from "next/script";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (<>
    <Head>
    <link rel="shortcut icon" href="/public/Icon-dc-trans.ico" />
    </Head>
    <div>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <Script async src="https://js.stripe.com/v3/pricing-table.js" />
    </div>
  </>
  );
};
export default MyApp;
