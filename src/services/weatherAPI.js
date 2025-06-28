import axios from "axios";

const API_KEY = import.meta.env.VITE_OWM_API_KEY;

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    appid: API_KEY,
    units: "metric",
  },
});

export function getCurrentWeather(city) {
  return weatherApi
    .get("/data/2.5/weather", {
      params: { q: city },
    })
    .then((response) => response.data);
}
export function getWeeklyWeather({ lat, lon }) {
  return weatherApi
    .get("/data/2.5/onecall", {
      params: {
        lat,
        lon,
        exclude: "minutely,hourly,alerts",
      },
    })
    .then((response) => response.data);
}

getCurrentWeather("New York")
  .then((data) => console.log("Current Weather:", data))
  .catch((error) => console.error("Error fetching current weather:", error));

getCurrentWeather("Los Angeles")
  .then((current) =>
    console.log("Current Weather in Los Angeles:", current.coord)
  )
  .catch((error) =>
    console.error("Error fetching current weather in Los Angeles:", error)
  );

export default weatherApi;
