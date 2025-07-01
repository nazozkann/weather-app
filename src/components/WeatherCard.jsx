import { format } from "date-fns";
import { getWeatherIconFile } from "../services/getWeatherIcon";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function WeatherCard({ data, onDescriptionChange }) {
  const { t } = useTranslation();
  const {
    name,
    sys: { country },
    main: { temp },
    weather: [{ description, icon }],
    coord,
  } = data;

  const iconUrl = getWeatherIconFile(icon);
  const todaysDate = format(new Date(), "EEEE, d MMMM");

  useEffect(() => {
    if (onDescriptionChange) {
      onDescriptionChange(description);
    }
  }, [description, onDescriptionChange]);

  return (
    <div className="p-4 rounded-lg font-outfit font-[400] min-h-[40vh] lg:h-[50vh] flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 lg:gap-48 px-4 lg:px-8">
      {/* Temperature and Location Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-4 lg:gap-0 text-center lg:text-left">
        <div className="flex items-start">
          <p className="text-[6rem] sm:text-[12rem] lg:text-[16rem] leading-none">
            {Math.round(temp)}
          </p>
          <p className="text-3xl sm:text-4xl lg:text-6xl ml-2 mt-2 sm:mt-4 lg:mt-8 font-[200]">
            °C
          </p>
        </div>
        <div className="lg:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl capitalize">
            {name}, {country}
          </h2>
          <span className="text-lg sm:text-xl lg:text-2xl font-[200]">
            {todaysDate}
          </span>
        </div>
      </div>

      {/* Weather Icon and Details Section */}
      <div className="flex flex-col items-center">
        <img
          src={iconUrl}
          alt={description}
          className="w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 mb-2 lg:mb-[-2rem] brightness-30 dark:brightness-140 saturate-0"
        />
        <p className="text-lg sm:text-xl lg:text-2xl capitalize font-[300] mb-4">
          {description}
        </p>

        <div className="text-center">
          <Link
            to="/weekly-details"
            state={{
              city: name,
              coords: coord,
            }}
            className="inline-block border-2 border-gray-600 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-200 hover:text-white hover:dark:text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm w-full sm:w-auto"
          >
            {t("view_7_day_forecast")}
          </Link>
        </div>
      </div>
    </div>
  );
}
