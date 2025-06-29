import { useTranslation } from "react-i18next";
import { useCurrentWeather, useWeeklyWeather } from "../hooks/useWeatherData";

export default function CityWeather({ city, onRemove }) {
  const { t } = useTranslation();

  const currentWeatherQuery = useCurrentWeather(city);
  const forecastQuery = useWeeklyWeather(currentWeatherQuery.data?.coord);

  const {
    data: current,
    isLoading: loadingCurrent,
    error: errorCurrent,
  } = currentWeatherQuery;

  const {
    data: forecast,
    isLoading: loadingForecast,
    error: errorForecast,
  } = forecastQuery;

  return (
    <div>
      {onRemove && <button onClick={onRemove}>×</button>}

      <h2>{city}</h2>

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
        <div>
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
              alt={current.weather[0].description}
            />
          </div>
          <p>{Math.round(current.main.temp)}°C</p>
          <p>{current.weather[0].description}</p>
        </div>
      ) : null}

      {loadingForecast ? (
        <div>
          <div></div>
          <div></div>
        </div>
      ) : errorForecast ? (
        <p>
          {t("error")} {errorForecast.message}
        </p>
      ) : forecast && forecast.daily ? (
        <div>
          <h3>7-Day Forecast</h3>
          <div>
            {forecast.daily.slice(0, 5).map((day, index) => (
              <div key={day.dt}>
                <span>
                  {index === 0
                    ? "Today"
                    : new Date(day.dt * 1000).toLocaleDateString("en", {
                        weekday: "short",
                      })}
                </span>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                />
                <span>
                  <span>{Math.round(day.temp.max)}°</span>
                  <span>{Math.round(day.temp.min)}°</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
