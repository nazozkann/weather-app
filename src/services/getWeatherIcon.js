export function getWeatherIconFile(iconCode) {
  const baseUrl = import.meta.env.BASE_URL || "/";

  const iconMap = {
    "01d": `${baseUrl}icons/weather/01d.svg`,
    "01n": `${baseUrl}icons/weather/01n.svg`,
    "02d": `${baseUrl}icons/weather/02d.svg`,
    "02n": `${baseUrl}icons/weather/02n.svg`,
    "03d": `${baseUrl}icons/weather/03d.svg`,
    "03n": `${baseUrl}icons/weather/03n.svg`,
    "04d": `${baseUrl}icons/weather/04d.svg`,
    "04n": `${baseUrl}icons/weather/04n.svg`,
    "09d": `${baseUrl}icons/weather/09d.svg`,
    "09n": `${baseUrl}icons/weather/09n.svg`,
    "10d": `${baseUrl}icons/weather/10d.svg`,
    "10n": `${baseUrl}icons/weather/10n.svg`,
    "11d": `${baseUrl}icons/weather/11d.svg`,
    "11n": `${baseUrl}icons/weather/11n.svg`,
    "13d": `${baseUrl}icons/weather/13d.svg`,
    "13n": `${baseUrl}icons/weather/13n.svg`,
    "50d": `${baseUrl}icons/weather/50d.svg`,
    "50n": `${baseUrl}icons/weather/50n.svg`,
  };

  return iconMap[iconCode] || `${baseUrl}icons/weather/01d.svg`;
}
