import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CategoriesContextProvider } from "./context/CategoryContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import "../node_modules/primereact/resources/themes/lara-light-cyan/theme.css";
import "../node_modules/primereact/resources/primereact.min.css";
import "../node_modules/primeicons/primeicons.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; // Solid icons
import { far } from "@fortawesome/free-regular-svg-icons"; // Regular icons
import { fab } from "@fortawesome/free-brands-svg-icons"; // Brands icons

library.add(fas, far, fab);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CategoriesContextProvider>
    <App />
  </CategoriesContextProvider>
);
