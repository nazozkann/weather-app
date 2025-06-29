import DailyCard from "./DailyCard";
import { Link } from "react-router-dom";

export default function ForecastList({ daily, city }) {
  return (
    <div>
      {daily.map((day, index) => (
        <Link
          key={day.dt || index}
          to={`/details/${index}`}
          state={{ daily, city }}
        >
          <DailyCard data={day} />
        </Link>
      ))}
    </div>
  );
}
