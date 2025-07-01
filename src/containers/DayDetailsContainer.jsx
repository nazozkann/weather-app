import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWeeklyWeather } from "../hooks/useWeatherData";
import { getBackgroundImage } from "../services/getBackgroundImage";
import { format, fromUnixTime } from "date-fns";
import { getWeatherIconFile } from "../services/getWeatherIcon";

export default function DayDetailsContainer({ state }) {
  const { day } = useParams();
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState("");

  const { city, coords } = state || {};
  const { data: weeklyData, isLoading } = useWeeklyWeather(coords);
  const daily = weeklyData?.daily;

  useEffect(() => {
    if (!city || !coords) {
      navigate("/", { replace: true });
    }
  }, [city, coords, navigate]);

  useEffect(() => {
    if (daily && daily[day]?.weather?.[0]?.description) {
      setBgImage(getBackgroundImage(daily[day].weather[0].description));
    }
  }, [daily, day]);

  const dayData = daily?.[day];
  const dayString = dayData
    ? format(fromUnixTime(dayData.dt), "EEEE, MMMM d, yyyy")
    : "";
  const iconUrl = dayData ? getWeatherIconFile(dayData.weather[0].icon) : "";

  return {
    city,
    coords,
    daily,
    dayData,
    dayString,
    iconUrl,
    bgImage,
    isLoading,
    isValidData: !!(city && coords && daily && dayData),
  };
}
