import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../utils/theme";
import { MyAppInitialProps } from "../interfaces/EmotionInterfaces";

import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import { AppProvider } from "../contexts/Global";
import Snackbar from "../components/snackbar/Snackbar";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppInitialProps) {
  return (
    <CacheProvider value={emotionCache}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <Component {...pageProps} />
            <Snackbar />
          </LocalizationProvider>
        </ThemeProvider>
      </AppProvider>
    </CacheProvider>
  );
}
