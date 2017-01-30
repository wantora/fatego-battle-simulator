import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import App from "./App";
import appTheme from "./appTheme";

injectTapEventPlugin();
require("normalize.css");
require("./css/main.css");

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("app")
);
