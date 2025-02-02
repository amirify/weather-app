/*
 * Weather Current Component
 *
 * Displays current weather information based on the provided location.
 * Uses fetchWeatherData utility function to fetch data from the
 * OpenWeatherMap, Current weather data API
 *
 * Props:
 * - location (object): Contains latitude and longitude for fetching weather data.
 * - apiKey (string): Passes as a parameter to fetchWeatherData for api authentication
 */

import React from "react";
import { useState, useEffect } from "react";
import { fetchWeatherData } from "../../utils/weatherUtils";
import { formatDate } from "../../utils/dateUtils";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";

export const WeatherCurrent = ({ location, apiKey }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data once location is available
    // and set the weather or error state according to fetch result
    if (location) {
      fetchWeatherData(location, apiKey, setWeather, setError);
    }
  }, [location, apiKey]);

  // Display an error message with a retry button if fetching weather data fails
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

  // Display a loading indicator while detecting location and fetching weather data
  if (!weather && !error) {
    return <LoadingIndicator message="Detecting your location..." />;
  }

  // Destructure weather data for improved readability and easier access
  const { name, main, wind, visibility, weather: weatherDetails } = weather;
  const { description, icon } = weatherDetails[0];

  return (
    <div>
      <h1>Weather in {name}</h1>
      <p>{formatDate(weather.dt)}</p>
      <div className="weather-overview">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
        />
        <span>{description}</span>
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
