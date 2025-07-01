import { rest } from "msw";

const mockCurrentWeather = {
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
  main: {
    temp: 25.5,
    feels_like: 26,
    temp_min: 22,
    temp_max: 28,
    pressure: 1012,
    humidity: 65,
  },
  wind: { speed: 3.5, deg: 120 },
  clouds: { all: 5 },
  sys: {
    sunrise: 1625454000,
    sunset: 1625508000,
  },
  name: "Test City",
};

const mockWeeklyWeather = {
  current: {
    /* current weather data */
  },
  daily: [
    {
      dt: 1625486400,
      sunrise: 1625454000,
      sunset: 1625508000,
      temp: {
        day: 25.5,
        min: 20,
        max: 28,
        night: 22,
        eve: 24,
        morn: 21,
      },
      feels_like: {
        day: 26,
        night: 22.5,
        eve: 24.5,
        morn: 21.5,
      },
      pressure: 1012,
      humidity: 65,
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
      ],
      clouds: 5,
      wind_speed: 3.5,
      wind_deg: 120,
      uvi: 6.2,
      pop: 0.2,
    },
  ],
};

export const handlers = [
  rest.get(
    "https://api.openweathermap.org/data/2.5/weather",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockCurrentWeather));
    }
  ),

  rest.get(
    "https://api.openweathermap.org/data/3.0/onecall",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockWeeklyWeather));
    }
  ),
];
