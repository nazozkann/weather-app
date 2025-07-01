import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import App from "../App";
import { jest, expect, describe, test } from "@jest/globals";

jest.mock("../containers/GeolocationContainer", () => ({
  __esModule: true,
  default: () => ({
    coords: { lat: 52.52, lon: 13.41 },
    geoError: null,
  }),
}));

jest.mock("../containers/WeatherContainer", () => ({
  __esModule: true,
  default: (props) => {
    const city = props.selectedCity;
    return {
      displayData: {
        name: city || "Test City",
        main: { temp: 20 },
        weather: [{ description: "clear sky" }],
      },
      displayError: null,
      bgImage: "mock-image.jpg",
      isLoading: false,
      WeatherCardComponent: (
        <div data-testid="weather-card">
          {city ? `Weather for ${city}` : "Weather Card Content"}
        </div>
      ),
    };
  },
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

describe("Search and Display Flow", () => {
  test("user can search for a city and see weather details", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search city/i);

    await user.type(searchInput, "Berlin");

    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
    });

    expect(screen.getByTestId("weather-card")).toBeInTheDocument();
  });
});
