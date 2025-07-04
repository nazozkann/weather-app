import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

export function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within CitiesProvider");
  }
  return context;
}
