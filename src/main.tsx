import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Не найден контейнер #root в index.html");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
