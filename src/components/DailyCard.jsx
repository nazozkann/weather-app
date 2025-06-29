import { format, fromUnixTime } from "date-fns";

export default function DailyCard({ data }) {
  const {
    dt,
    temp: { day },
    weather: [{ icon, description }],
  } = data;
  const dayName = format(fromUnixTime(dt), "EEEE");
  return (
    <div className="flex items-center justify-between gap-6">
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="w-12 h-12"
      />
      <div className="flex flex-col items-center">
        <p>{dayName}</p>
        <p className="font-[100] opacity-80">{description}</p>
      </div>
      <p>{Math.round(day)}°C</p>
    </div>
  );
}
