import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import App from "./components/App";
import appTheme from "./appTheme";
import {Store} from "./flux";
import Storage from "./Storage";
import valueTypes from "./valueTypes";

injectTapEventPlugin();
require("normalize.css");
require("./css/main.css");

function reducer(state, action) {
  if (action.type === "update") {
    return Object.assign({}, state, {
      values: Object.assign({}, state.values, {[action.name]: action.value}),
    });
  } else if (action.type === "reset") {
    return Object.assign({}, state, {
      values: initialState.values,
    });
  }
  return state;
}

function render() {
  storage.save(store.state);
  ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
      <App {...store.state} />
    </MuiThemeProvider>,
    document.getElementById("app")
  );
}

const initialState = {
  values: {},
};

Object.keys(valueTypes).forEach((name) => {
  initialState.values[name] = valueTypes[name].defaultValue;
});

const storage = new Storage("fatego-battle-simulator", sessionStorage);
const store = new Store(storage.load(initialState), reducer);

store.subscribe(render);
render();
