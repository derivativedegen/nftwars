import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NodeProvider from "./Provider";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <NodeProvider />
  </Provider>,
  document.getElementById("root")
);
