import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdSearch } from "react-icons/md";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-300 dark:bg-gray-300 rounded-lg p-2 outline-none w-full"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("search")}
        className="bg-gray-300 dark:bg-gray-300 text-gray-800 dark:text-gray-700 outline-none w-full"
      />
      <button
        type="submit"
        className="text-gray-600 dark:text-gray-700 cursor-pointer"
      >
        <MdSearch size={24} />
      </button>
    </form>
  );
}
