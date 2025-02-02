import { useState, useEffect } from "react";
import { WeatherCurrent } from "./components/WeatherCurrent";
import { WeatherForecast } from "./components/WeatherForecast";
import "./App.css";

function App() {
  const [location, setLocation] = useState(null);

  // OpenWeatherMap API key
  const apiKey = "4cecaf87da69c50b6ec1dafab0fd008c";

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div>
      <WeatherCurrent location={location} apiKey={apiKey} />
      <WeatherForecast location={location} apiKey={apiKey} />
    </div>
  );
}

export default App;
