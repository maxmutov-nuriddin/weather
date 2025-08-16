import { createContext, useState, useContext } from "react";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState("Tashkent"); // default shahar
  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCity = () => useContext(CityContext);
