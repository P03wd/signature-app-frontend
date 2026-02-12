import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";

// optional styling (safe even if file doesn't exist yet)
// you can delete this line if you don't have index.css
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
