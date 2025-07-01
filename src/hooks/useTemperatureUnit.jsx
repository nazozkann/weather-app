import { useContext } from "react";
import { TemperatureUnitContext } from "../contexts/TemperatureContext";

export function useTemperatureUnit() {
  const context = useContext(TemperatureUnitContext);

  if (!context) {
    throw new Error(
      "useTemperatureUnit must be used within a TemperatureUnitProvider"
    );
  }

  return context;
}
