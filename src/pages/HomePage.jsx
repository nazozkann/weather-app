import { useState } from "react";
import { useCurrentWeather, useWeeklyWeather } from "../hooks/useWeatherData";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";

export default function HomePage() {
  const [city, setCity] = useState("Istanbul");
  const {
    data: currentWeather,
    isLoading: loadingCurrent,
    error: errorCurrent,
  } = useCurrentWeather(city);
  const {
    data: weeklyWeather,
    isLoading: loadingWeekly,
    error: errorWeekly,
  } = useWeeklyWeather(currentWeather?.coord);

  const onSubmit = (e) => {
    e.preventDefault();
    const cityInput = e.target.city.value.trim();
    if (cityInput) {
      setCity(cityInput);
    }
  };

  return (
    <>
      <h1>Weather App</h1>
      <p>Get the latest weather updates for your location.</p>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="city"
          defaultValue={city}
          placeholder="enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {loadingCurrent && <p>Loading current weather...</p>}
      {errorCurrent && (
        <p>Error fetching current weather: {errorCurrent.message}</p>
      )}
      {currentWeather && <WeatherCard data={currentWeather} />}
      {loadingWeekly && <p>Loading weekly weather...</p>}
      {errorWeekly && (
        <p>Error fetching weekly weather: {errorWeekly.message}</p>
      )}
      {weeklyWeather && <ForecastList daily={weeklyWeather.daily} />}
    </>
  );
}
