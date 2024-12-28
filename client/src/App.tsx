import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/store";
import { Routes } from "./Routes";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <Router>
            <Routes />
          </Router>
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
