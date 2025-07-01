import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import HomePage from "./HomePage";
import { expect, jest, describe, test } from "@jest/globals";
jest.mock("../services/weatherAPI");

jest.mock("../containers/GeolocationContainer", () => ({
  __esModule: true,
  default: () => ({
    coords: { lat: 51.5, lon: -0.1 },
    geoError: null,
  }),
}));

jest.mock("../containers/WeatherContainer", () => ({
  __esModule: true,
  default: () => ({
    displayData: {
      name: "London",
      main: { temp: 20 },
      weather: [{ description: "clear sky" }],
    },
    displayError: null,
    bgImage: "mock-image.jpg",
    isLoading: false,
    WeatherCardComponent: (
      <div data-testid="weather-card">Weather Card Content</div>
    ),
  }),
}));

jest.mock("../hooks/useCities", () => ({
  useCities: () => ({
    cities: ["London", "Paris"],
    removeCity: jest.fn(),
    selectedCity: null,
  }),
}));

const renderWithProviders = (ui) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("HomePage Integration", () => {
  test("renders weather card and city list", async () => {
    renderWithProviders(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId("weather-card")).toBeInTheDocument();
    });

    expect(screen.getByText("Meteoly")).toBeInTheDocument();

    expect(screen.getByTestId("weather-card")).toBeInTheDocument();

    expect(screen.getAllByRole("button", { name: /remove/i }).length).toBe(2);
  });
});
