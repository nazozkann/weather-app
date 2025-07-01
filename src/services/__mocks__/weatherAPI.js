import { jest } from "@jest/globals";

export const getCurrentWeather = jest.fn(() =>
  Promise.resolve({
    name: "Test City",
    main: { temp: 21 },
    weather: [{ description: "clear sky", icon: "01d" }],
  })
);

export const getCurrentWeatherByCoords = jest.fn(() =>
  Promise.resolve({
    name: "Current Location",
    main: { temp: 18 },
    weather: [{ description: "few clouds", icon: "02d" }],
  })
);

export const getWeeklyWeather = jest.fn(() =>
  Promise.resolve({
    daily: Array(7)
      .fill()
      .map((_, i) => ({
        dt: Date.now() / 1000 + i * 86400,
        temp: { day: 20 + i, night: 15 + i },
        weather: [{ description: "clear sky", icon: "01d" }],
      })),
  })
);
