import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer position="top-center" />
    </Provider>
  </StrictMode>
);
