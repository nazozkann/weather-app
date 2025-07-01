import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherContainer from "./WeatherContainer";

/* global jest, describe, test, expect */

jest.mock("../services/weatherAPI");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

jest.mock("../hooks/useWeatherData", () => ({
  useCurrentWeatherByCoords: () => ({
    data: {
      name: "Test City",
      main: { temp: 25 },
      weather: [{ description: "clear sky", icon: "01d" }],
    },
    isLoading: false,
    error: null,
  }),
  useCurrentWeather: () => ({
    data: {
      name: "Selected City",
      main: { temp: 22 },
      weather: [{ description: "few clouds", icon: "02d" }],
    },
    isLoading: false,
    error: null,
  }),
}));

describe("WeatherContainer", () => {
  test("returns data from coordinates when no selected city", async () => {
    const coords = { lat: 40.7, lon: -74 };

    const { result } = renderHook(
      () => WeatherContainer({ selectedCity: null, coords }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.displayData).toBeTruthy();
    });

    expect(result.current.displayData.name).toBe("Test City");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.WeatherCardComponent).toBeTruthy();
  });

  test("returns data from selected city when provided", async () => {
    const coords = { lat: 40.7, lon: -74 };
    const selectedCity = "Selected City";

    const { result } = renderHook(
      () => WeatherContainer({ selectedCity, coords }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.displayData).toBeTruthy();
    });

    expect(result.current.displayData.name).toBe("Selected City");
    expect(result.current.isLoading).toBe(false);
  });
});
