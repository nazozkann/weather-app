export default function SkeletonDailyCard() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-2 text-center animate-pulse">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto mb-2" />
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-2" />
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mx-auto" />
    </div>
  );
}
