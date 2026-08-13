import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ShopView from "./ShopView/ShopView";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopView />
  </StrictMode>,
);
