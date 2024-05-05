import type { AppProps } from "next/app";
import store, { persistor } from "@store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import theme from "@utils/theme";


const cache = createCache({ key: "css", prepend: true });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={cache}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
              
            </ThemeProvider>
          </StyledEngineProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
