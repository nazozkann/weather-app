import { useState } from "react";
import { useCurrentWeather, useWeeklyWeather } from "../hooks/useWeatherData";

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
      {currentWeather && (
        <div>
          <h2>Current Weather in {currentWeather.name}</h2>
          <p>Temperature: {currentWeather.main.temp}°C</p>
          <p>Condition: {currentWeather.weather[0].description}</p>
        </div>
      )}
      {loadingWeekly && <p>Loading weekly weather...</p>}
      {errorWeekly && (
        <p>Error fetching weekly weather: {errorWeekly.message}</p>
      )}
      {weeklyWeather && (
        <div>
          <h2>Weekly Weather Forecast</h2>
          <ul>
            {weeklyWeather.daily.map((day, index) => (
              <li key={index}>
                <p>
                  Day {index + 1}: {day.temp.day}°F,{" "}
                  {day.weather[0].description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
