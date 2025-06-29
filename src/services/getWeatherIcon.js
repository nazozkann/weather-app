export function getWeatherIconFile(iconCode) {
  const iconMap = {
    "01d": "/icons/weather/01d.svg",
    "01n": "/icons/weather/01n.svg",
    "02d": "/icons/weather/02d.svg",
    "02n": "/icons/weather/02n.svg",
    "03d": "/icons/weather/03d.svg",
    "03n": "/icons/weather/03n.svg",
    "04d": "/icons/weather/04d.svg",
    "04n": "/icons/weather/04n.svg",
    "09d": "/icons/weather/09d.svg",
    "09n": "/icons/weather/09n.svg",
    "10d": "/icons/weather/10d.svg",
    "10n": "/icons/weather/10n.svg",
    "11d": "/icons/weather/11d.svg",
    "11n": "/icons/weather/11n.svg",
    "13d": "/icons/weather/13d.svg",
    "13n": "/icons/weather/13n.svg",
    "50d": "/icons/weather/50d.svg",
    "50n": "/icons/weather/50n.svg",
  };

  return iconMap[iconCode] || "/icons/weather/01d.svg";
}
