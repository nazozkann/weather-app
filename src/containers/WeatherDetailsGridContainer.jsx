import { useTranslation } from "react-i18next";
import { format, fromUnixTime } from "date-fns";
import ThermometerIcon from "../assets/icons/thermometer.svg";
import BarometerIcon from "../assets/icons/barometer.svg";
import CloudIcon from "../assets/icons/cloudy.svg";
import HumidityIcon from "../assets/icons/humidity.svg";
import UVIndexIcon from "../assets/icons/uv-index.svg";
import WindIcon from "../assets/icons/wind.svg";
import PrecipationIcon from "../assets/icons/raindrop.svg";

export default function WeatherDetailsGridContainer({ dayData }) {
  const { t } = useTranslation();

  const createWeatherDetails = () => {
    if (
      !dayData ||
      !dayData.temp ||
      !dayData.weather ||
      dayData.weather.length === 0
    ) {
      return [];
    }

    return [
      {
        id: "temperature",
        title: t("temperature"),
        icon: ThermometerIcon,
        data: [
          { value: Math.round(dayData.temp.min), label: t("min"), unit: "°C" },
          { value: Math.round(dayData.temp.max), label: t("max"), unit: "°C" },
          { value: Math.round(dayData.temp.day), label: t("day"), unit: "°C" },
          {
            value: Math.round(dayData.temp.night),
            label: t("night"),
            unit: "°C",
          },
        ],
      },
      {
        id: "feelsLike",
        title: t("feelsLike"),
        data: [
          {
            value: Math.round(dayData.feels_like?.day || 0),
            label: t("day"),
            unit: "°C",
          },
          {
            value: Math.round(dayData.feels_like?.night || 0),
            label: t("night"),
            unit: "°C",
          },
        ],
        summary: dayData.summary || "",
      },
      {
        id: "conditions",
        title: t("conditions"),
        data: [
          {
            value: dayData.humidity || 0,
            label: t("humidity"),
            unit: "%",
            icon: HumidityIcon,
          },
          { value: dayData.pressure || 0, label: "hPa", icon: BarometerIcon },
          { value: dayData.uvi || 0, label: t("uvIndex"), icon: UVIndexIcon },
          {
            value: dayData.clouds || 0,
            label: t("clouds"),
            unit: "%",
            icon: CloudIcon,
          },
        ],
      },
      {
        id: "wind",
        title: t("wind"),
        icon: WindIcon,
        data: [
          { value: dayData.wind_speed || 0, label: "m/s" },
          { value: `${dayData.wind_deg || 0}°`, label: t("direction") },
        ],
      },
      {
        id: "precipitation",
        title: t("precipitation"),
        icon: PrecipationIcon,
        data: [
          ...(dayData.pop
            ? [
                {
                  value: `${Math.round(dayData.pop * 100)}%`,
                  label: t("rainChance"),
                },
              ]
            : []),
          ...(dayData.rain
            ? [{ value: `${dayData.rain} mm`, label: t("rain") }]
            : []),
        ],
      },
      {
        id: "sunMoon",
        title: t("sunMoon"),
        data: [
          {
            value: dayData.sunrise
              ? format(fromUnixTime(dayData.sunrise), "HH:mm")
              : "--:--",
            label: t("sunrise"),
          },
          {
            value: dayData.sunset
              ? format(fromUnixTime(dayData.sunset), "HH:mm")
              : "--:--",
            label: t("sunset"),
          },
          {
            value: dayData.moonrise
              ? format(fromUnixTime(dayData.moonrise), "HH:mm")
              : "--:--",
            label: t("moonrise"),
          },
          {
            value: dayData.moonset
              ? format(fromUnixTime(dayData.moonset), "HH:mm")
              : "--:--",
            label: t("moonset"),
          },
        ],
      },
    ];
  };

  const weatherDetails = createWeatherDetails();
  return { weatherDetails };
}
