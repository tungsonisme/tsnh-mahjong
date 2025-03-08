import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import App from "./App.tsx";

const mahjongRoot = document.getElementById("mahjong-root");

if (mahjongRoot) {
  createRoot(mahjongRoot).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
