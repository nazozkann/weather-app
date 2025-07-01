import { useState, useEffect } from "react";
import { useWeeklyWeather } from "../hooks/useWeatherData";
import { getBackgroundImage } from "../services/getBackgroundImage";

export default function WeeklyWeatherContainer({ coords }) {
  const { data: weeklyData, isLoading, error } = useWeeklyWeather(coords);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    if (weeklyData?.daily?.[selectedIndex]?.weather?.[0]?.description) {
      const description =
        weeklyData.daily[selectedIndex].weather[0].description;
      setBgImage(getBackgroundImage(description));
    }
  }, [selectedIndex, weeklyData]);

  const getVisibleIndexes = (center, length) => {
    const indexes = [];
    for (let i = -2; i <= 2; i++) {
      let index = center + i;
      if (index < 0) index += length;
      if (index >= length) index -= length;
      indexes.push(index);
    }
    return indexes;
  };

  const visibleIndexes = weeklyData?.daily
    ? getVisibleIndexes(selectedIndex, weeklyData.daily.length)
    : [];

  return {
    weeklyData,
    isLoading,
    error,
    selectedIndex,
    setSelectedIndex,
    bgImage,
    visibleIndexes,
    daily: weeklyData?.daily,
  };
}
