import { useState, useEffect } from "react";
import { WeatherCurrent } from "./components/WeatherCurrent/WeatherCurrent";
import { WeatherForecast } from "./components/WeatherForecast/WeatherForecast";
import "./App.css";

function App() {
  // After successfully obtaining the user's geolocation,
  // set the location state and pass it as a prop to Weather components
  // to fetch weather data based on the user's location
  const [location, setLocation] = useState(null);

  // If an error occurs while fetching the user's location,
  // display a descriptive message to help guide the user
  const [error, setError] = useState(null);

  // Import the OpenWeatherMap API key from environment variables
  // and pass it to Weather components for API authentication
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || process.env.OPENWEATHER_API_KEY;

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        const errorMessage = error.message || "An unknown error occurred.";
        console.error("Geolocation Error: ", errorMessage);
        setError(
          "We couldn't access your location. Please enable location services in your browser settings to continue."
        );
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const content = error ? (
    <p>Error: {error}</p>
  ) : (
    <div>
      <WeatherCurrent location={location} apiKey={API_KEY} />
      <WeatherForecast location={location} apiKey={API_KEY} />
    </div>
  );

  return <div>{content}</div>;
}

export default App;
