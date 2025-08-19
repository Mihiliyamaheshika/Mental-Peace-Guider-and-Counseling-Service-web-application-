import React from "react";
import ReactDOM from "react-dom/client"; // updated for React 18+
import App from "./app"; 
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
