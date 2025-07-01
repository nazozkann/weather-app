import { createContext, useState } from "react";

const CitiesContext = createContext();

export { CitiesContext };

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const addCity = (cityTerm) => {
    if (!cityTerm) return;
    setSelectedCity(cityTerm);
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
    <CitiesContext.Provider
      value={{ cities, addCity, removeCity, selectedCity, setSelectedCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
