import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Application from "./Network";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("root")
);
