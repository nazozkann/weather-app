import { useLocation, useNavigate } from "react-router-dom";
import { format, fromUnixTime } from "date-fns";
import { getWeatherIconFile } from "../services/getWeatherIcon";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import Header from "../components/Header";
import WeeklyWeatherContainer from "../containers/WeeklyWeatherContainer";
import CarouselContainer from "../containers/CarouselContainer";
import { CAROUSEL_ANIMATION } from "../constants/AnimationConstants";

export default function WeeklyDetailsPage() {
  const { t } = useTranslation();
  const { formatTemp, unit } = useTemperatureUnit();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { city, coords } = state || {};

  const {
    weeklyData,
    isLoading,
    error,
    setSelectedIndex,
    bgImage,
    visibleIndexes,
    daily,
  } = WeeklyWeatherContainer({ coords });

  const { getAnimationValues } = CarouselContainer();

  useEffect(() => {
    if (!city || !coords) {
      navigate("/", { replace: true });
    }
  }, [city, coords, navigate]);

  if (!city || !coords) return null;

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-dark">
        <div className="absolute inset-0 bg-white dark:bg-black"></div>
        <main className="relative z-10 p-4 text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-b-4 border-gray-800 dark:border-gray-200 mx-auto mb-6"></div>

              <div className="text-2xl sm:text-3xl lg:text-4xl font-[300] mb-2">
                {t("loading")}...
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !daily) {
    return (
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
      >
        <div className="absolute inset-0 bg-white dark:bg-black opacity-60"></div>
        <main className="relative z-10 p-4 text-gray-800 dark:text-gray-200 min-h-screen">
          <Header />
          <div className="flex items-center justify-center h-full">
            <div className="text-2xl sm:text-3xl mb-6 text-center">
              {t("error_loading_forecast")}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
    >
      <div className="absolute inset-0 bg-white dark:bg-black opacity-60"></div>

      <main className="relative z-10 p-2 sm:p-4 text-gray-800 dark:text-gray-200 min-h-screen">
        <Header />

        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-8 sm:mb-[10vh] text-center font-outline px-4">
            {city} - {t("weekly_forecast")}
          </h1>

          <div className="flex items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4 lg:px-8">
            <AnimatePresence mode="popLayout">
              {visibleIndexes.map((idx, position) => {
                const dayData = daily[idx];
                const dayString = format(
                  fromUnixTime(dayData.dt),
                  "EEEE, MMM d"
                );
                const iconUrl = getWeatherIconFile(dayData.weather[0].icon);

                const { offset, scale, zIndex, opacity, x, rotateY } =
                  getAnimationValues(position);

                return (
                  <motion.div
                    key={idx}
                    layoutId={`card-${idx}`}
                    initial={false}
                    animate={{ scale, opacity, x, rotateY }}
                    transition={CAROUSEL_ANIMATION}
                    style={{ zIndex, transformStyle: "preserve-3d" }}
                    onClick={() => setSelectedIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedIndex(idx);
                      }
                    }}
                    className="w-40 sm:w-48 lg:w-56 flex-shrink-0"
                    tabIndex={0}
                    role="button"
                    aria-label={`${dayString} forecast`}
                  >
                    <motion.div
                      className="bg-opacity-90 backdrop-blur-sm py-8 sm:py-12 lg:py-16 px-2 sm:px-3 lg:px-4 rounded-lg text-center border-2 border-gray-800 dark:border-gray-300"
                      whileHover={{
                        scale: offset === 0 ? 1.05 : 0.8,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <h2 className="text-sm sm:text-lg lg:text-xl mb-2 font-semibold font-outline">
                        {dayString}
                      </h2>

                      <div className="flex justify-center items-start mt-4 sm:mt-6 lg:mt-8">
                        <p className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-outline">
                          {formatTemp(dayData.temp.day)}
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg font-outline">
                          {unit === "celsius" ? "°C" : "°F"}
                        </p>
                      </div>

                      <img
                        src={iconUrl}
                        alt={dayData.weather[0].description}
                        className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 mx-auto mb-2 brightness-30 dark:brightness-100 saturate-0"
                      />

                      <p className="capitalize mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-lg lg:text-xl px-1">
                        {dayData.weather[0].description}
                      </p>

                      {offset === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Link
                            to={`/weekly-details/${idx}`}
                            state={{
                              daily: weeklyData.daily,
                              city,
                              coords: coords,
                              dayIndex: idx,
                              dayData,
                            }}
                            className="text-xs sm:text-sm pointer border rounded p-1.5 sm:p-2 text-gray-700 dark:text-gray-100 hover:bg-gray-600 dark:hover:bg-gray-200 hover:text-white dark:hover:text-black transition-colors duration-200"
                          >
                            {t("viewDetails")} →
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
