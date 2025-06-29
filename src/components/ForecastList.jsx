import DailyCard from "./DailyCard";
import { Link } from "react-router-dom";
import LoadingDailyCard from "./LoadingDailyCard";

export default function ForecastList({ daily, city, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <LoadingDailyCard key={i} />
        ))}
      </div>
    );
  }
  if (!daily || !Array.isArray(daily)) {
    return <p>No forecast data available</p>;
  }
  return (
    <div className="flex flex-col gap-4 bg-gray-300 dark:bg-gray-900 p-4 rounded-lg shadow-sm font-outfit font-[400] text-gray-600 dark:text-gray-200">
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
