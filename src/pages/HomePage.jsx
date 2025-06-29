import { useState, useEffect } from "react";
import {
  useCurrentWeatherByCoords,
  useWeeklyWeather,
} from "../hooks/useWeatherData";
import { useTranslation } from "react-i18next";
import { useCities } from "../hooks/useCities";
import WeatherCard from "../components/WeatherCard";
import LoadingWeatherCard from "../components/LoadingWeatherCard";
import GeoErrorComponent from "../components/GeoErrorComponent";
import CityWeather from "../components/CityWeather";

export default function HomePage() {
  const { t } = useTranslation();
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const { cities, removeCity } = useCities();

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

  if (geoError) {
    return <GeoErrorComponent error={geoError} />;
  }

  return (
    <main className="p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-[calc(100vh-theme(spacing.20))]">
      {loadingCurrentCoords && <LoadingWeatherCard />}
      {errorCurrentCoords && (
        <p>Error fetching current weather: {errorCurrentCoords.message}</p>
      )}
      {currentWeatherCoords && (
        <WeatherCard
          data={currentWeatherCoords}
          weeklyData={weeklyWeatherCoords}
          loadingWeeklyCoords={loadingWeeklyCoords}
          errorWeeklyCoords={errorWeeklyCoords}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cities.map((city) => (
          <CityWeather
            key={city}
            city={city}
            onRemove={() => removeCity(city)}
          />
        ))}
      </div>
    </main>
  );
}
