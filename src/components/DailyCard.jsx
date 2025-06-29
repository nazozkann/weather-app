import { format, fromUnixTime } from "date-fns";

export default function DailyCard({ data }) {
  const {
    dt,
    temp: { day },
    weather: [{ icon, description }],
  } = data;
  const dayName = format(fromUnixTime(dt), "EEEE");
  return (
    <div>
      {console.log("Daily Card Data:", data)}
      <p>{dayName}</p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <p>{Math.round(day)}°C</p>
    </div>
  );
}
