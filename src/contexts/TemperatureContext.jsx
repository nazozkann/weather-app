import { createContext, useState } from "react";

// eslint-disable-next-line
export const TemperatureUnitContext = createContext();

export function TemperatureUnitProvider({ children }) {
  const [unit, setUnit] = useState(() => {
    const savedUnit = localStorage.getItem("meteoly-temp-unit");
    return savedUnit || "celsius";
  });

  const toggleUnit = () => {
    const newUnit = unit === "celsius" ? "fahrenheit" : "celsius";
    setUnit(newUnit);
    localStorage.setItem("meteoly-temp-unit", newUnit);
  };

  const convertToF = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const formatTemp = (temp) => {
    if (unit === "fahrenheit") {
      return Math.round(convertToF(temp));
    }
    return Math.round(temp);
  };

  return (
    <TemperatureUnitContext.Provider value={{ unit, toggleUnit, formatTemp }}>
      {children}
    </TemperatureUnitContext.Provider>
  );
}
