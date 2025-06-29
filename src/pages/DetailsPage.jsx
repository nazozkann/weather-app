import { useParams, useLocation, useNavigate } from "react-router-dom";
import { format, fromUnixTime } from "date-fns";

export default function DetailsPage() {
  const { day } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { daily, city } = state || {};
  const dayData = daily[day];
  const dayString = format(fromUnixTime(dayData.dt), "EEEE, MMMM d, yyyy");

  if (!daily || !daily[day]) {
    navigate("/", { replace: true });
    return null;
  }
  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>
        {city} - {dayString}
      </h1>
      <div>
        <div>
          {/* Temperatures */}
          <h2>Temperature</h2>
          <p>Min: {dayData.temp.min}°C</p>
          <p>Max: {dayData.temp.max}°C</p>
          <p>Day: {dayData.temp.day}°C</p>
          <p>Night: {dayData.temp.night}°C</p>
        </div>
        <div>
          {/* Additional Details */}
          <h2>Additional Details</h2>
          <p>Feels Like: {dayData.feels_like.day}°C</p>
          <p>Humidity: {dayData.humidity}%</p>
          <p>Pressure: {dayData.pressure} hPa</p>
          <p>UV Index: {dayData.uvi}</p>
        </div>
        <div>
          {/* Wind */}
          <h2>Wind</h2>
          <p>Speed: {dayData.wind_speed} m/s</p>
          <p>Direction: {dayData.wind_deg}°</p>
          {dayData.wind_gust && (
            <p>Strong Wind: {Math.round(dayData.wind_gust)} m/s</p>
          )}
        </div>
        <div>
          {/* Weather Conditions */}
          <h2>Weather Conditions</h2>
          <p>Description: {dayData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${dayData.weather[0].icon}@4x.png`}
            alt={dayData.weather[0].description}
          />
          <p>{dayData.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
}
