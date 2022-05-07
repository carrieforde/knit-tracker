import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { App } from "components";
import { theme } from "mui/theme";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { openDatabase } from "services/indexedDb/indexedDb";
import reportWebVitals from "./reportWebVitals";

(function () {
  openDatabase();
})();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
