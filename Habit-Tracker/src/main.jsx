import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HeroView from "../src/HeroView/HeroView";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroView />
  </StrictMode>,
);
