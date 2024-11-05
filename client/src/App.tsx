import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeConfig from "./theme/ThemeConfig";
import { store } from "./redux/store";
import { Routes } from "./routes";

function App() {
  return (
    <Provider store={store}>
      <ThemeConfig>
        <Router>
          <Routes />
        </Router>
      </ThemeConfig>
    </Provider>
  );
}

export default App;
