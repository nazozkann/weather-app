import { useQuery } from "@tanstack/react-query";
import {
  getCurrentWeather,
  getWeeklyWeather,
  getCurrentWeatherByCoords,
} from "../services/weatherAPI";

export function useCurrentWeather(city) {
  return useQuery({
    queryKey: ["currentWeather", city],
    queryFn: () => getCurrentWeather(city),
    enabled: Boolean(city),
  });
}
export function useWeeklyWeather(coords) {
  return useQuery({
    queryKey: ["weeklyWeather", coords],
    queryFn: () => getWeeklyWeather(coords),
    enabled: Boolean(coords?.lat && coords?.lon),
  });
}

export function useCurrentWeatherByCoords(coords) {
  return useQuery({
    queryKey: ["currentWeatherByCoords", coords],
    queryFn: () => getCurrentWeatherByCoords(coords),
    enabled: Boolean(coords?.lat && coords?.lon),
  });
}
