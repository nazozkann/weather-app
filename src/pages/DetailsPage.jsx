import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import DayDetailsContainer from "../containers/DayDetailsContainer";
import WeatherDetailsGridContainer from "../containers/WeatherDetailsGridContainer";
import WeatherDetailCard from "../components/WeatherDetailCard";

export default function DetailsPage() {
  const { t } = useTranslation();
  const { state } = useLocation();

  const { city, dayData, dayString, iconUrl, bgImage, isLoading, isValidData } =
    DayDetailsContainer({ state });

  const { weatherDetails } = WeatherDetailsGridContainer({
    dayData: dayData || {},
  });

  if (!isValidData) return null;

  console.log("Loading state:", isLoading, "dayData:", !!dayData);

  if (isLoading || !dayData) {
    console.log("SHOWING LOADING SCREEN");
    return (
      <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="absolute inset-0 bg-white dark:bg-black opacity-60"></div>
        <main className="relative z-10 p-4 text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-b-4 border-gray-800 dark:border-gray-200 mx-auto mb-6"></div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-[300] mb-2">
                {t("loading")}...
              </div>
              <div className="text-lg sm:text-xl font-[200] text-gray-600 dark:text-gray-400">
                {t("loading_daily_details")}
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
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
    >
      <div className="absolute inset-0 bg-white dark:bg-black opacity-60"></div>

      <main className="relative z-10 p-4 text-gray-800 dark:text-gray-200 min-h-screen font-outfit font-[300]">
        <Header />

        <div className="p-4 sm:p-6 rounded-lg">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 text-center font-[400]">
            {city} - {dayString}
          </h1>

          {/* Main Weather Display */}
          <div className="flex flex-col lg:flex-row items-center justify-center mb-6 sm:mb-8 gap-6 sm:gap-8">
            <img
              src={iconUrl}
              alt={dayData.weather[0].description}
              className="w-32 h-32 sm:w-48 sm:h-48 lg:w-52 lg:h-52 brightness-30 dark:brightness-150 saturate-0"
            />
            <div className="text-center">
              <div className="flex items-start justify-center gap-2 mb-4">
                <p className="text-6xl sm:text-7xl lg:text-8xl font-[300]">
                  {Math.round(dayData.temp.day)}
                </p>
                <p className="text-2xl sm:text-3xl font-[200] mt-2 sm:mt-4">
                  °C
                </p>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl capitalize font-[300]">
                {dayData.weather[0].description}
              </p>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {weatherDetails.map((detail) => (
              <WeatherDetailCard key={detail.id} detail={detail} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
