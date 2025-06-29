import { useState } from "react";
import { useTranslation } from "react-i18next";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">{t("search")}</button>
    </form>
  );
}
