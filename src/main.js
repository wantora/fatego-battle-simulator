import "core-js";

import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import App from "./components/App";
import appTheme from "./appTheme";
import {Store} from "./flux";
import PermanentStorage from "./PermanentStorage";
import StoreValues, {initialValues} from "./StoreValues";

injectTapEventPlugin();
require("normalize.css");
require("./css/main.css");

function reducer(state, action) {
  if (action.type === "update") {
    return Object.assign({}, state, {
      values: Object.assign({}, state.values, {
        [action.name]: action.value,
      }),
    });
  } else if (action.type === "reset") {
    return Object.assign({}, state, {
      values: initialValues,
    });
  }
  return state;
}

function render() {
  storage.save(store.state);
  
  const storeValues = new StoreValues(store.state.values);
  
  ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
      <App values={storeValues} />
    </MuiThemeProvider>,
    document.getElementById("app")
  );
}

const initialState = {
  version: 3,
  values: initialValues,
};

const storage = new PermanentStorage("fatego-battle-simulator", sessionStorage);
const store = new Store(storage.load(initialState), reducer);

store.subscribe(render);
render();
