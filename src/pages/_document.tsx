// MyDocument.tsx
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@emotion/cache";
import theme from "@utils/theme";
import { Hidden } from "@mui/material";

const cache = createEmotionCache({ key: "css" });

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,300;0,500;1,300&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <CacheProvider value={cache}>
            <Main />
            <NextScript />
          </CacheProvider>
        </body>
      </Html>
    );
  }
}
