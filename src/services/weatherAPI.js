import axios from "axios";

const API_KEY = import.meta.env.VITE_OWM_API_KEY;

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    appid: API_KEY,
    units: "metric",
  },
});

export function getCurrentWeather(city, lang = "en") {
  return weatherApi
    .get("/data/2.5/weather", {
      params: {
        q: city,
        lang: lang,
      },
    })
    .then((response) => response.data);
}

export function getWeeklyWeather({ lat, lon }, lang = "en") {
  return weatherApi
    .get("/data/3.0/onecall", {
      params: {
        lat,
        lon,
        exclude: "minutely,hourly,alerts",
        lang: lang,
      },
    })
    .then((response) => response.data);
}

export function getCurrentWeatherByCoords(coords, lang = "en") {
  return weatherApi
    .get("/data/2.5/weather", {
      params: {
        lat: coords.lat,
        lon: coords.lon,
        lang: lang,
      },
    })
    .then((response) => response.data);
}

// API TEST HERE //

// getCurrentWeather("New York")
//   .then((data) => console.log("Current Weather:", data))
//   .catch((error) => console.error("Error fetching current weather:", error));

// getCurrentWeather("Los Angeles")
//   .then((current) =>
//     console.log("Current Weather in Los Angeles:", current.coord)
//   )
//   .catch((error) =>
//     console.error("Error fetching current weather in Los Angeles:", error)
//   );

export default weatherApi;
