import React from "react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "../src/assets/sass/app.scss";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <Router>
    <App />
  </Router>
);