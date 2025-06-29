import { createContext, useState } from "react";

const CitiesContext = createContext();

export { CitiesContext };

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);

  const addCity = (cityTerm) => {
    if (!cityTerm) return;
    if (!cities.includes(cityTerm)) {
      setCities((prev) => [...prev, cityTerm]);
    }
  };

  const removeCity = (cityToRemove) => {
    setCities((prevCities) =>
      prevCities.filter((city) => city !== cityToRemove)
    );
  };

  return (
    <CitiesContext.Provider value={{ cities, addCity, removeCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
