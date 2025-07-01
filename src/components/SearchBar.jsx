import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdSearch } from "react-icons/md";
import { getCurrentWeather } from "../services/weatherAPI";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const { t } = useTranslation();
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsValidating(true);
    setError("");

    try {
      await getCurrentWeather(input.trim());

      onSearch(input.trim());
      setInput("");
    } catch (error) {
      setError("City not found. Please try again.");
      console.log(error);
    } finally {
      setIsValidating(false);
    }
  };
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-lg p-2 border-2 border-gray-500 dark:border-gray-200 w-full"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("search")}
          disabled={isValidating}
          className=" text-gray-700 dark:text-gray-200 outline-none w-full"
        />
        <button
          type="submit"
          disabled={isValidating}
          className="text-gray-600 dark:text-gray-200 cursor-pointer"
        >
          <MdSearch size={24} />
        </button>
      </form>
      {error && <p className="text-gray-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
