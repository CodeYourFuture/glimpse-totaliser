import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import App from "./App";
import Home from "./Home";
import "./index.css";

ReactDOM.render(
  <Router>
    <Home path="/" />
    <App path="/:store" />
  </Router>,
  document.getElementById("root")
);
