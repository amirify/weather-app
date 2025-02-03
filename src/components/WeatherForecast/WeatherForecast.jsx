/*
 * Weather Forecast Component
 *
 * Displays 5 day weather forecast based on the provided location.
 * Uses fetchForecastData utility function to fetch data from the
 * OpenWeatherMap, 5 day weather forecast API
 *
 * Props:
 * - location (object): Contains latitude and longitude for fetching weather data.
 * - apiKey (string): Passes as a parameter to fetchWeatherData for api authentication
 */

import React from "react";
import { useState, useEffect } from "react";
import { fetchForecastData } from "../../utils/weatherUtils";
import { formatDate } from "../../utils/dateUtils";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";

export const WeatherForecast = ({ location, apiKey }) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data once location is available
    // and set the forecastData or error state according to fetch result
    if (location) {
      fetchForecastData(location, apiKey, setForecastData, setError);
    }
  }, [location, apiKey]);

  // Display an error message with a retry button if fetching weather data fails
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

  // Display a loading indicator while detecting location and fetching weather data
  if (!forecastData && !error) {
    return <LoadingIndicator message="Fetching forecast data..." />;
  }

  // Destructure weather data for improved readability and easier access
  const { list } = forecastData;
  const forecastByDay = [];

  // The 5-day forecast API provides data in 3-hour intervals (8 entries per day).
  // Loop through the list, picking one entry per day (at index 7, 15, 23, 31, 39).
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
