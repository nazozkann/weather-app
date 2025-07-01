import { useState } from "react";
import {
  useCurrentWeatherByCoords,
  useCurrentWeather,
} from "../hooks/useWeatherData";
import { getBackgroundImage } from "../services/getBackgroundImage";
import WeatherCard from "../components/WeatherCard";

export default function WeatherContainer({ selectedCity, coords }) {
  const [bgImage, setBgImage] = useState("");

  const coordsQuery = useCurrentWeatherByCoords(coords);
  const selectedCityQuery = useCurrentWeather(selectedCity);

  const {
    data: currentWeatherCoords,
    error: errorCurrentCoords,
    isLoading: isLoadingCoords,
  } = coordsQuery;
  const {
    data: selectedCityData,
    error: selectedCityError,
    isLoading: isLoadingCity,
  } = selectedCityQuery;

  const displayData = selectedCity ? selectedCityData : currentWeatherCoords;
  const displayError = selectedCity ? selectedCityError : errorCurrentCoords;
  const isLoading = selectedCity ? isLoadingCity : isLoadingCoords;

  const handleDescriptionChange = (description) => {
    if (description) {
      setBgImage(getBackgroundImage(description));
    }
  };

  return {
    displayData,
    displayError,
    bgImage,
    isLoading,
    handleDescriptionChange,
    WeatherCardComponent: displayData ? (
      <WeatherCard
        data={displayData}
        onDescriptionChange={handleDescriptionChange}
      />
    ) : null,
  };
}
