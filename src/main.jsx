import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Create a root element for rendering the app
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render the app initially
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Call this function to unmount the app
window.unmountWeatherApp = () => {
  root.unmount();
};
