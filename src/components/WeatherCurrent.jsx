import { useState, useEffect } from "react";
import { fetchWeatherData } from "../utils/weatherUtils";
import { formatDate } from "../utils/dateUtils";
import { LoadingIndicator } from "./LoadingIndicator";

export const WeatherCurrent = ({ location, apiKey }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data once location is available
    if (location) {
      fetchWeatherData(location, apiKey, setWeather, setError);
    }
  }, [location, apiKey]);

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button
          onClick={() =>
            fetchWeatherData(location, apiKey, setWeather, setError)
          }
        >
          Retry
        </button>
      </div>
    );
  }

  if (!weather && !error) {
    return <LoadingIndicator message="Detecting your location..." />;
  }

  const { name, main, wind, visibility, weather: weatherDetails } = weather;
  const { description, icon } = weatherDetails[0];

  return (
    <div>
      <h1>Weather in {name}</h1>
      <p>{formatDate(weather.dt)}</p>
      <div>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
        {description}
      </div>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s</p>
      <p>Wind Direction: {wind.deg}°</p>
      <p>Pressure: {main.pressure} hPa</p>
      <p>Visibility: {visibility} m</p>
    </div>
  );
};
