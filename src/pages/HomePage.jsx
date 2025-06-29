import { useState, useEffect } from "react";
import {
  useCurrentWeather,
  useCurrentWeatherByCoords,
  useWeeklyWeather,
} from "../hooks/useWeatherData";
import { useTranslation } from "react-i18next";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import SearchBar from "../components/SearchBar";
import LoadingWeatherCard from "../components/LoadingWeatherCard";
import GeoErrorComponent from "../components/GeoErrorComponent";

export default function HomePage() {
  const { t } = useTranslation();
  const [city, setCity] = useState(null);
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoords({
            lat: latitude,
            lon: longitude,
          });
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setGeoError(t("error_geolocation_denied"));
              break;
            case err.POSITION_UNAVAILABLE:
              setGeoError(t("error_geolocation_unavailable"));
              break;
            case err.TIMEOUT:
              setGeoError(t("error_geolocation_timeout"));
              break;
            default:
              setGeoError(t("error_geolocation_unknown"));
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
      );
    }
  }, []);

  const handleSearch = (cityTerm) => {
    if (!cityTerm) return;
    setCity(cityTerm);
    setCoords(null);
  };

  const cityQuery = useCurrentWeather(city);
  const coordsQuery = useCurrentWeatherByCoords(coords);

  const forecastByCity = useWeeklyWeather(cityQuery.data?.coord);
  const forecastByCoords = useWeeklyWeather(coords);

  const {
    data: currentWeatherCity,
    isLoading: loadingCurrentCity,
    error: errorCurrentCity,
  } = cityQuery;
  const {
    data: currentWeatherCoords,
    isLoading: loadingCurrentCoords,
    error: errorCurrentCoords,
  } = coordsQuery;

  const {
    data: weeklyWeatherCity,
    isLoading: loadingWeeklyCity,
    error: errorWeeklyCity,
  } = forecastByCity;
  const {
    data: weeklyWeatherCoords,
    isLoading: loadingWeeklyCoords,
    error: errorWeeklyCoords,
  } = forecastByCoords;

  // Decide which data to use based on city or coords
  const currentWeather = city ? currentWeatherCity : currentWeatherCoords;
  const loadingCurrent = city ? loadingCurrentCity : loadingCurrentCoords;
  const errorCurrent = city ? errorCurrentCity : errorCurrentCoords;

  const weeklyWeather = city ? weeklyWeatherCity : weeklyWeatherCoords;
  const loadingWeekly = city ? loadingWeeklyCity : loadingWeeklyCoords;
  const errorWeekly = city ? errorWeeklyCity : errorWeeklyCoords;

  if (geoError) {
    return <GeoErrorComponent error={geoError} />;
  }

  return (
    <>
      <h1>{t("app_title")}</h1>
      <p>Get the latest weather updates for your location.</p>
      <SearchBar onSearch={handleSearch} />
      {loadingCurrent && <LoadingWeatherCard />}
      {errorCurrent && (
        <p>Error fetching current weather: {errorCurrent.message}</p>
      )}
      {currentWeather && <WeatherCard data={currentWeather} />}
      {loadingWeekly && <ForecastList isLoading />}
      {errorWeekly && (
        <p>Error fetching weekly weather: {errorWeekly.message}</p>
      )}
      {weeklyWeather && (
        <div>
          {console.log(weeklyWeather)}
          <ForecastList daily={weeklyWeather.daily} city={city} />
        </div>
      )}
    </>
  );
}
