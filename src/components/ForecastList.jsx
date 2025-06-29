import DailyCard from "./DailyCard";

export default function ForecastList({ daily }) {
  return (
    <div>
      {daily.map((day) => {
        <DailyCard key={day.dt} data={day} />;
      })}
    </div>
  );
}
