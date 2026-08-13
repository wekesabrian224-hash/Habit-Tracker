import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HeroView from "./HeroView/HeroView.jsx";
import HeroView from "./HeroView/HeroView.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
