import { format } from "date-fns";
import ForecastList from "./ForecastList";
import { getWeatherIconFile } from "../services/getWeatherIcon";

export default function WeatherCard({
  data,
  weeklyData,
  loadingWeeklyCoords,
  errorWeeklyCoords,
}) {
  const {
    name,
    sys: { country },
    main: { temp, temp_min, temp_max },
    weather: [{ description, icon }],
  } = data;

  const iconUrl = getWeatherIconFile(icon);

  const todaysDate = format(new Date(), "EEEE, d MMMM");

  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-sm flex justify-between items-center font-outfit font-[400] px-8">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-xl">
          {name}, {country}
        </h2>
        <p className="text-6xl">{Math.round(temp)}°C</p>
        <p className="text-2xl">{description}</p>
        <div className="flex gap-8">
          <div>
            <p>Min</p>
            <p>{Math.round(temp_min)}°C</p>
          </div>
          <div>
            <p>Max</p>
            <p>{Math.round(temp_max)}°C</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <img src={iconUrl} alt={description} className="mx-auto w-60 h-60" />
        <p>{todaysDate}</p>
      </div>
      <div>
        {loadingWeeklyCoords && <ForecastList loading />}
        {errorWeeklyCoords && (
          <p>Error fetching weekly weather: {errorWeeklyCoords.message}</p>
        )}
        {weeklyData && <ForecastList daily={weeklyData.daily} city={name} />}
      </div>
    </div>
  );
}
