import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };
  return (
    <header>
      <h1>{t("app.title")}</h1>
      <div>
        <button onClick={toggleLanguage}>
          {i18n.language === "en" ? "es" : "en"}
        </button>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}
