import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../util/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" style={{ backgroundColor: "#f2f2f2" }}>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <script
            async
            src="https://js.stripe.com/v3/pricing-table.js">
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}