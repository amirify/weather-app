import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Declare a variable to hold the React root
let weatherAppRoot = null;

// Define a mount function
export function mountWeatherApp() {
  const container = document.getElementById('root');
  if (!container) {
    console.error('Container with id "root" not found.');
    return;
  }
  // Create a new root and render the app
  weatherAppRoot = createRoot(container);
  weatherAppRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Define an unmount function
export function unmountWeatherApp() {
  if (weatherAppRoot) {
    weatherAppRoot.unmount();
    weatherAppRoot = null;
  } else {
    console.warn("Weather app was not mounted");
  }
}

// Attaching these functions to window so they can be called externally
window.mountWeatherApp = mountWeatherApp;
window.unmountWeatherApp = unmountWeatherApp;

// Mount the app immediately on load:
mountWeatherApp();
