import React from "react";
import { createRoot } from "react-dom/client";
import App from "@/app/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "@/styles/global.css";

const container = document.getElementById("root");

const root = createRoot(container as Element);
root.render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>,
);

reportWebVitals();
