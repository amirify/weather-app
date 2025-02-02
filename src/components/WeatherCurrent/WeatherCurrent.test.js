// Import Jest DOM matchers
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { WeatherCurrent } from "./WeatherCurrent";
import { fetchWeatherData } from "../../utils/weatherUtils";
import { formatDate } from "../../utils/dateUtils";

// Mock external dependencies
jest.mock("../../utils/weatherUtils");
jest.mock("../../utils/dateUtils");
// Provide a simple implementation for the LoadingIndicator
jest.mock("../LoadingIndicator/LoadingIndicator", () => ({
  LoadingIndicator: ({ message }) => <div>{message}</div>,
}));

describe("WeatherCurrent", () => {
  const mockLocation = { latitude: 51.5074, longitude: -0.1278 };
  const mockApiKey = "test-api-key";

  beforeEach(() => {
    // Immediately set weather data when fetchWeatherData is called.
    fetchWeatherData.mockImplementation(
      (location, apiKey, setWeather, setError) => {
        setWeather({
          name: "London",
          dt: 1633072800,
          main: { temp: 20, humidity: 80, pressure: 1012 },
          wind: { speed: 5, deg: 270 },
          visibility: 10000,
          weather: [{ description: "Clear sky", icon: "01d" }],
        });
      }
    );
    // Return a fixed formatted date.
    formatDate.mockReturnValue("October 1, 2021");
  });

  it("renders weather info when data is available", async () => {
    render(<WeatherCurrent location={mockLocation} apiKey={mockApiKey} />);

    // Wait for the weather info to be rendered.
    await waitFor(() => {
      expect(screen.getByText("Weather in London")).toBeInTheDocument();
    });

    // Check that key weather details are rendered.
    expect(screen.getByText("October 1, 2021")).toBeInTheDocument();
    expect(screen.getByText("Clear sky")).toBeInTheDocument();
    expect(screen.getByText("Temperature: 20°C")).toBeInTheDocument();
  });
});
