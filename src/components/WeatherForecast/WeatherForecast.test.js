// src/components/WeatherForecast/WeatherForecast.test.js
import "@testing-library/jest-dom"; // Import custom Jest matchers
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { WeatherForecast } from "./WeatherForecast";
import { fetchForecastData } from "../../utils/weatherUtils";
import { formatDate } from "../../utils/dateUtils";

// Mock external dependencies
jest.mock("../../utils/weatherUtils");
jest.mock("../../utils/dateUtils");
jest.mock("../LoadingIndicator/LoadingIndicator", () => ({
  LoadingIndicator: ({ message }) => <div>{message}</div>,
}));

describe("WeatherForecast", () => {
  const mockLocation = { latitude: 51.5074, longitude: -0.1278 };
  const mockApiKey = "test-api-key";

  // Create mock forecast data with 40 items.
  // The component will select forecast items at indices: 7, 15, 23, 31, and 39.
  const mockForecastData = {
    cod: "200",
    list: Array.from({ length: 40 }, (_, i) => ({
      dt: 1633072800 + i * 10800, // Each 3-hour interval: 10800 seconds
      main: { temp: 20 + i },
      weather: [{ description: `Description ${i}`, icon: "01d" }],
    })),
  };

  beforeEach(() => {
    // Immediately set forecast data when fetchForecastData is called.
    fetchForecastData.mockImplementation(
      (location, apiKey, setForecastData, setError) => {
        setForecastData(mockForecastData);
      }
    );
    // For testing, have formatDate return a string based on the dt value.
    formatDate.mockImplementation((dt) => `Formatted Date ${dt}`);
  });

  it("renders weather forecast items when data is available", async () => {
    render(<WeatherForecast location={mockLocation} apiKey={mockApiKey} />);

    // Wait for the forecast heading to appear.
    await waitFor(() => {
      expect(screen.getByText("Weather Forecast")).toBeInTheDocument();
    });

    // The loop picks indices 7, 15, 23, 31, and 39.
    // For example, the forecast at index 7:
    // Temperature: 20 + 7 = 27°C
    expect(screen.getByText("Temperature: 27°C")).toBeInTheDocument();

    // Also check that five forecast items are rendered.
    // Here we assume each forecast item displays a temperature value matching /Temperature: \d+°C/
    const temperatureElements = screen.getAllByText(/Temperature: \d+°C/);
    expect(temperatureElements).toHaveLength(5);
  });
});
