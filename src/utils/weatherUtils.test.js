import { fetchWeatherData, fetchForecastData } from "./weatherUtils";

// Mocking global fetch
global.fetch = jest.fn();

describe("weatherUtils", () => {
  const mockLocation = { latitude: 51.5074, longitude: -0.1278 }; // London coordinates
  const mockApiKey = "test-api-key";

  // Updated mock objects include a valid `cod` property.
  const mockWeatherData = {
    cod: 200,
    name: "London",
    dt: 1633072800,
    main: { temp: 20, humidity: 80, pressure: 1012 },
    wind: { speed: 5, deg: 270 },
    visibility: 10000,
    weather: [{ description: "Clear sky", icon: "01d" }],
  };

  const mockForecastData = {
    cod: "200",
    list: [
      {
        dt: 1633072800,
        main: { temp: 20 },
        weather: [{ description: "Clear sky", icon: "01d" }],
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it("fetchWeatherData should call setWeather on success", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    const setWeather = jest.fn();
    const setError = jest.fn();

    await fetchWeatherData(mockLocation, mockApiKey, setWeather, setError);

    // Wait for asynchronous operations to settle
    await new Promise((r) => process.nextTick(r));

    expect(setWeather).toHaveBeenCalledWith(mockWeatherData);
    expect(setError).not.toHaveBeenCalled();
  });

  it("fetchWeatherData should call setError on error (non-ok response)", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "Server error" }),
    });

    const setWeather = jest.fn();
    const setError = jest.fn();

    await fetchWeatherData(mockLocation, mockApiKey, setWeather, setError);

    await new Promise((r) => process.nextTick(r));

    expect(setError).toHaveBeenCalledWith("Error fetching weather data");
    expect(setWeather).not.toHaveBeenCalled();
  });

  it("fetchForecastData should call setForecastData on success", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockForecastData,
    });

    const setForecastData = jest.fn();
    const setError = jest.fn();

    await fetchForecastData(
      mockLocation,
      mockApiKey,
      setForecastData,
      setError
    );

    await new Promise((r) => process.nextTick(r));

    expect(setForecastData).toHaveBeenCalledWith(mockForecastData);
    expect(setError).not.toHaveBeenCalled();
  });

  it("fetchForecastData should call setError on error (non-ok response)", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "Server error" }),
    });

    const setForecastData = jest.fn();
    const setError = jest.fn();

    await fetchForecastData(
      mockLocation,
      mockApiKey,
      setForecastData,
      setError
    );

    await new Promise((r) => process.nextTick(r));

    expect(setError).toHaveBeenCalledWith("Error fetching weather data");
    expect(setForecastData).not.toHaveBeenCalled();
  });
});
