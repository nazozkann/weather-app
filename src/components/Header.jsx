import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { useCities } from "../hooks/useCities";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";
import { useLocation, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

export default function Header() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { unit, toggleUnit } = useTemperatureUnit();
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
        <button
          onClick={toggleUnit}
          className="font-outstand font-[400] text-base text-xl px-2 py-1  rounded-md"
          aria-label={
            unit === "celsius"
              ? t("switch_to_fahrenheit")
              : t("switch_to_celsius")
          }
        >
          {unit === "celsius" ? "°F" : "°C"}
        </button>

        <button
          onClick={toggleTheme}
          aria-label={
            theme === "light"
              ? t("switch_to_dark_mode")
              : t("switch_to_light_mode")
          }
        >
          {theme === "light" ? (
            <MdOutlineDarkMode size={32} />
          ) : (
            <MdOutlineLightMode size={32} />
          )}
        </button>
        <button
          onClick={toggleLanguage}
          className="font-quicksand font-[600] text-lg"
          aria-label={
            i18n.language === "en"
              ? t("switch_to_spanish")
              : t("switch_to_english")
          }
        >
          {i18n.language === "en" ? "ES" : "EN"}
        </button>
      </div>
    </header>
  );
}
