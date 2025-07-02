import { useTranslation } from "react-i18next";
import { useCurrentWeather } from "../hooks/useWeatherData";
import { getWeatherIconFile } from "../services/getWeatherIcon";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";

export default function CityWeather({ city, onRemove }) {
  const { t } = useTranslation();
  const { formatTemp, unit } = useTemperatureUnit();

  const currentWeatherQuery = useCurrentWeather(city);

  const {
    data: current,
    isLoading: loadingCurrent,
    error: errorCurrent,
  } = currentWeatherQuery;

  const iconUrl = getWeatherIconFile(current?.weather[0]?.icon);

  return (
    <div className="flex flex-col items-center gap-2 border-2 border-gray-500 dark:border-gray-300 p-4 rounded-lg font-outfit font-[400] text-gray-900 dark:text-gray-200 backdrop-blur-sm mt-[2rem]">
      {onRemove && (
        <button
          className="text-right w-full font-[200] text-2xl cursor-pointer dark:hover:text-gray-50 hover:text-gray-900 transition-colors duration-300"
          onClick={onRemove}
          aria-label={t("remove_city")}
        >
          ×
        </button>
      )}

      <h2 className="text-xl capitalize mt-[-1.5rem] mb-6">{city}</h2>

      {loadingCurrent ? (
        <div>
          <div></div>
          <div></div>
        </div>
      ) : errorCurrent ? (
        <p>
          {t("error")} {errorCurrent.message}
        </p>
      ) : current ? (
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center">
            <div className="flex flex-row items-start justify-center gap-1">
              <p className="text-6xl">{formatTemp(current.main.temp)}</p>
              <p className="font-[200] text-2xl">
                {unit === "celsius" ? "°C" : "°F"}
              </p>
            </div>
            <img
              src={iconUrl}
              alt={current.weather[0].description}
              className="brightness-30 dark:brightness-140 saturate-0 w-12 h-12"
            />
          </div>
          <p className="capitalize text-xl capitalize font-[300]">
            {current.weather[0].description}
          </p>
        </div>
      ) : null}
    </div>
  );
}
