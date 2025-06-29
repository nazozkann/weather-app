import { useState, useEffect } from "react";
import {
  useCurrentWeatherByCoords,
  useWeeklyWeather,
} from "../hooks/useWeatherData";
import { useTranslation } from "react-i18next";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import SearchBar from "../components/SearchBar";
import LoadingWeatherCard from "../components/LoadingWeatherCard";
import GeoErrorComponent from "../components/GeoErrorComponent";
import CityWeather from "../components/CityWeather";

export default function HomePage() {
  const { t } = useTranslation();
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [cities, setCities] = useState([]);

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
  }, [t]);

  const coordsQuery = useCurrentWeatherByCoords(coords);
  const forecastByCoords = useWeeklyWeather(coords);

  const {
    data: currentWeatherCoords,
    isLoading: loadingCurrentCoords,
    error: errorCurrentCoords,
  } = coordsQuery;

  const {
    data: weeklyWeatherCoords,
    isLoading: loadingWeeklyCoords,
    error: errorWeeklyCoords,
  } = forecastByCoords;

  const handleSearch = (cityTerm) => {
    if (!cityTerm) return;
    if (!cities.includes(cityTerm)) {
      setCities((prev) => [...prev, cityTerm]);
    }
  };

  const handleRemoveCity = (cityToRemove) => {
    setCities((prevCities) =>
      prevCities.filter((city) => city !== cityToRemove)
    );
  };

  if (geoError) {
    return <GeoErrorComponent error={geoError} />;
  }

  return (
    <>
      <h1>{t("app_title")}</h1>
      <p>Get the latest weather updates for your location.</p>
      <SearchBar onSearch={handleSearch} />

      {loadingCurrentCoords && <LoadingWeatherCard />}
      {errorCurrentCoords && (
        <p>Error fetching current weather: {errorCurrentCoords.message}</p>
      )}
      {currentWeatherCoords && <WeatherCard data={currentWeatherCoords} />}

      {loadingWeeklyCoords && <ForecastList isLoading />}
      {errorWeeklyCoords && (
        <p>Error fetching weekly weather: {errorWeeklyCoords.message}</p>
      )}
      {weeklyWeatherCoords && (
        <div>
          <ForecastList
            daily={weeklyWeatherCoords.daily}
            city={currentWeatherCoords?.name}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cities.map((city) => (
          <CityWeather
            key={city}
            city={city}
            onRemove={() => handleRemoveCity(city)}
          />
        ))}
      </div>
    </>
  );
}
