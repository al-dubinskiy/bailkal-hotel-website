import React from "react";
import { Provider } from "react-redux";
import ThemeConfig from "./theme/ThemeConfig";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeConfig>
        <div>123</div>
      </ThemeConfig>
    </Provider>
  );
}

export default App;
