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
    <div style={style}>
      <button
        key={`${filteredCities[index].name}-${index}`}
        onClick={() => {
          setCity(filteredCities[index].name);
          burgerBtn();
        }}
        className="text-left px-4 py-2 hover:bg-white/10 w-full transition-colors truncate text-blue-100/90 hover:text-white"
      >
        {filteredCities[index].name}
      </button>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Drawer Overlay (closes menu when clicked outside) */}
      {burger && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={burgerBtn}
        />
      )}

      <header className="fixed z-50 right-6 top-6">
        <Checkbox burger={burger} burgerBtn={burgerBtn} />
      </header>

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-slate-900/40 backdrop-blur-xl border-r border-white/10 text-white transform ${burger ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-40 shadow-2xl`}
      >
        <nav className="flex flex-col h-full pt-6">
          <div className="px-4 pb-6 border-b border-white/10">
            <h2 className="text-xl font-bold mb-4 text-center tracking-wider px-2">Weather App</h2>
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search City..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-blue-400/50 outline-none transition-all placeholder-gray-400"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 z-50 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  ✖
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 py-2">
            <List
              height={window.innerHeight - 130}
              itemCount={filteredCities.length}
              itemSize={44}
              width={320}
              className="scrollbar-hide"
            >
              {Row}
            </List>
          </div>
        </nav>
      </div>

      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layouts;
