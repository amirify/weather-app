import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create the root for the weather app
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Function to unmount the app
function unmountWeatherApp() {
  root.unmount();
}

// Attach the unmount function to the window object
window.unmountWeatherApp = unmountWeatherApp;

// Render the app
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
