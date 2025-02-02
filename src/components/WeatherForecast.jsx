import { useState, useEffect } from "react";
import { fetchForecastData } from "../utils/weatherUtils";
import { formatDate } from "../utils/dateUtils";
import { LoadingIndicator } from "./LoadingIndicator";

export const WeatherForecast = ({ location, apiKey }) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data once location is available
    if (location) {
      fetchForecastData(location, apiKey, setForecastData, setError);
    }
  }, [location, apiKey]);

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button
          onClick={() =>
            fetchForecastData(location, apiKey, setForecastData, setError)
          }
        >
          Retry
        </button>
      </div>
    );
  }

  if (!forecastData && !error) {
    return <LoadingIndicator message="Detecting your location..." />;
  }

  const { list } = forecastData;
  const forecastByDay = [];

  for (let i = 7; i < list.length; i += 8) {
    forecastByDay.push(list[i]);
  }

  const weatherForecastItems = forecastByDay.map((weather) => (
    <div key={weather.dt}>
      <p>{formatDate(weather.dt)}</p>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <div>-----------------------------</div>
    </div>
  ));

  return (
    <div>
      <h2>Weather Forecast</h2>
      {weatherForecastItems}
    </div>
  );
};
