import { useTranslation } from "react-i18next";

export default function WeatherDetailCard({ detail }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center bg-opacity-50 border-2 border-gray-600 dark:border-gray-200 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
      {detail.icon && (
        <div className="flex flex-col items-center mb-4">
          <img
            src={detail.icon}
            alt={detail.title}
            className="w-16 h-16 sm:w-24 sm:h-24 mb-2 brightness-30 saturate-0 dark:brightness-90"
          />
          <h3 className="text-base sm:text-lg font-[400] text-gray-700 dark:text-gray-300">
            {detail.title}
          </h3>
        </div>
      )}

      {!detail.icon && (
        <h3 className="text-base sm:text-lg font-[400] text-gray-700 dark:text-gray-300 mb-4">
          {detail.title}
        </h3>
      )}

      <div
        className={`grid gap-3 ${
          detail.data.length === 4
            ? "grid-cols-2"
            : detail.data.length === 2
            ? "grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        {detail.data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {item.icon && (
              <img
                src={item.icon}
                className="w-16 h-16 sm:w-20 sm:h-20 mb-1 brightness-30 saturate-0 dark:brightness-90"
                alt={item.label}
              />
            )}
            <span className="text-base sm:text-lg font-[400] text-gray-700 dark:text-gray-100">
              {item.value}
              {item.unit}
            </span>
            <p className="text-xs sm:text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      {detail.summary && (
        <div className="flex flex-col items-center mt-4">
          <h4 className="text-base sm:text-lg font-[400] text-gray-700 dark:text-gray-300 mb-2">
            {t("summary")}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">
            {detail.summary}
          </p>
        </div>
      )}
    </div>
  );
}
