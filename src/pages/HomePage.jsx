import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCities } from "../hooks/useCities";
import GeolocationContainer from "../containers/GeolocationContainer";
import WeatherContainer from "../containers/WeatherContainer";
import GeoErrorComponent from "../components/GeoErrorComponent";
import CityWeather from "../components/CityWeather";
import Header from "../components/Header";

export default function HomePage() {
  const { t } = useTranslation();
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const { cities, removeCity, selectedCity } = useCities();

  const { coords: geoCoords, geoError: locationError } = GeolocationContainer({
    onLocationUpdate: setCoords,
    onError: setGeoError,
  });

  const { displayError, bgImage, WeatherCardComponent, isLoading } =
    WeatherContainer({
      selectedCity,
      coords: coords || geoCoords,
    });

  if (geoError || locationError) {
    return <GeoErrorComponent error={geoError || locationError} />;
  }

  if (isLoading || (!coords && !geoCoords && !selectedCity)) {
    return (
      <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-dark">
        <div className="absolute inset-0 bg-white dark:bg-black"></div>
        <main className="relative z-10 p-4 text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div
                className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-b-4 border-gray-800 dark:border-gray-200 mx-auto mb-6"
                role="status"
                aria-label={t("loading")}
              ></div>

              <div className="text-2xl sm:text-3xl lg:text-4xl font-[300] mb-2">
                {t("loading")}...
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
      }}
    >
      <div className="absolute inset-0 bg-white dark:bg-black opacity-60"></div>

      <main className="relative z-10 p-4 text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
        <Header />

        {displayError && (
          <p className="text-red-500 mb-4 text-center">
            {t("error_fetching_weather")}: {displayError.message}
          </p>
        )}

        {WeatherCardComponent}

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {cities.map((city) => (
            <CityWeather
              key={city}
              city={city}
              onRemove={() => removeCity(city)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
