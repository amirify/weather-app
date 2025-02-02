export const fetchWeatherData = async (
  location,
  apiKey,
  setWeather,
  setError
) => {
  try {
    const { latitude, longitude } = location;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.cod !== 200 && data.cod !== "200") {
      throw new Error(data.message || "Unknown error occurred");
    }

    setWeather(data);
  } catch (err) {
    setError("Error fetching weather data");
  }
};

export const fetchForecastData = async (
  location,
  apiKey,
  setForecastData,
  setError
) => {
  try {
    const { latitude, longitude } = location;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.cod !== 200 && data.cod !== "200") {
      throw new Error(data.message || "Unknown error occurred");
    }

    setForecastData(data);
  } catch (err) {
    setError("Error fetching weather data");
  }
};
