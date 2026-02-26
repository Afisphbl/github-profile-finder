import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { GithubUser } from "./context/GithubUser";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <GithubUser>
        <App />
      </GithubUser>
    </ThemeProvider>
  </React.StrictMode>,
);
