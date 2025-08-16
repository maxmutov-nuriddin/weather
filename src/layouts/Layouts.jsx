import { useState, useMemo } from "react";
import Checkbox from "../components/Checkbox";
import { useCity } from "../utils/CityContext";
import { Outlet } from "react-router-dom";
import cities from "../data/city.list.json";
import { FixedSizeList as List } from "react-window";

const Layouts = () => {
  const [burger, setBurger] = useState(false);
  const [query, setQuery] = useState(""); 
  const { setCity } = useCity();

  function burgerBtn() {
    setBurger(!burger);
  }
  const filteredCities = useMemo(() => {
    return cities.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const Row = ({ index, style }) => (
    <button
      key={`${filteredCities[index].name}-${index}`}
      style={style}
      onClick={() => {
        setCity(filteredCities[index].name);
        burgerBtn();
      }}
      className="text-left px-3 py-2 hover:underline w-full"
    >
      {filteredCities[index].name}
    </button>
  );

  return (
    <div className="relative min-h-screen">
      <header className="absolute z-100 right-6 top-3">
        <Checkbox burger={burger} burgerBtn={burgerBtn} />
      </header>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 text-white transform ${
          burger ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <nav className="flex flex-col h-full">
          <div className="p-3 border-b border-blue-500 bg-blue-800">
            <input
              type="text"
              placeholder="Поиск города..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-2 py-1 rounded text-white"
            />
          </div>

          <div className="flex-1">
            <List
              height={window.innerHeight - 60} 
              itemCount={filteredCities.length}
              itemSize={40}
              width={256}
            >
              {Row}
            </List>
          </div>
        </nav>
      </div>

      <main className="p-4 bg-black min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layouts;
