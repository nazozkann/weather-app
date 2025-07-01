import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { useCities } from "../hooks/useCities";
import { useLocation, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const { addCity } = useCities();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };
  return (
    <header className="flex justify-between items-start p-4 text-gray-900 dark:text-gray-100 pt-6 gap-12">
      <Link to="/" className="font-quicksand font-[700] text-3xl">
        Meteoly
      </Link>
      {isHomePage && <SearchBar onSearch={addCity} />}
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <MdOutlineDarkMode size={32} />
          ) : (
            <MdOutlineLightMode size={32} />
          )}
        </button>
        <button
          onClick={toggleLanguage}
          className="font-quicksand font-[600] text-lg"
        >
          {i18n.language === "en" ? "ES" : "EN"}
        </button>
      </div>
    </header>
  );
}
