export default function SkeletonWeatherCard() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4" />
      <div className="flex items-center">
        <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded mr-4" />
        <div className="space-y-2 flex-1">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}
