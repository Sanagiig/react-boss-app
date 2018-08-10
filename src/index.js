import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import "antd-mobile/dist/antd-mobile.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./methods/ajax";
import { userReducer, userScopeName } from "./store/user/user";

const store = createStore(
  combineReducers({
    [userScopeName]: userReducer
  })
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
