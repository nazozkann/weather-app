import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WeatherCard from "./WeatherCard";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

/* eslint-disable no-undef */
jest.mock("../services/weatherAPI");

const mockWeatherData = {
  name: "London",
  main: {
    temp: 20.5,
    feels_like: 21,
    temp_min: 18,
    temp_max: 22,
    humidity: 65,
  },
  weather: [{ description: "clear sky", icon: "01d" }],
  wind: { speed: 3.5 },
  coord: { lat: 51.51, lon: -0.13 },
  sys: {
    sunrise: 1625454000,
    sunset: 1625508000,
  },
};

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </BrowserRouter>
  );
};

describe("WeatherCard Component", () => {
  test("renders weather data correctly", () => {
    const mockOnDescriptionChange = jest.fn();

    renderWithProviders(
      <WeatherCard
        data={mockWeatherData}
        onDescriptionChange={mockOnDescriptionChange}
      />
    );

    expect(
      screen.getByRole("heading", { name: /london/i })
    ).toBeInTheDocument();

    expect(screen.getByText("21")).toBeInTheDocument();

    expect(screen.getByText("clear sky")).toBeInTheDocument();

    const weatherIcon = screen.getByAltText("clear sky");
    expect(weatherIcon).toBeInTheDocument();

    expect(mockOnDescriptionChange).toHaveBeenCalledWith("clear sky");
  });
});
