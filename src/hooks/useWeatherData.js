import { useQuery } from "@tanstack/react-query";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getWeeklyWeather,
} from "../services/weatherAPI";
import { useTranslation } from "react-i18next";

export const useCurrentWeather = (city) => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "es" ? "es" : "en";

  return useQuery({
    queryKey: ["current-weather", city, lang],
    queryFn: () => getCurrentWeather(city, lang),
    enabled: !!city,
  });
};

export const useCurrentWeatherByCoords = (coords) => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "es" ? "es" : "en";

  return useQuery({
    queryKey: ["current-weather-coords", coords, lang],
    queryFn: () => getCurrentWeatherByCoords(coords, lang),
    enabled: !!coords,
  });
};

export const useWeeklyWeather = (coords) => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "es" ? "es" : "en";

  return useQuery({
    queryKey: ["weekly-weather", coords, lang],
    queryFn: () => getWeeklyWeather(coords, lang),
    enabled: !!coords,
  });
};
