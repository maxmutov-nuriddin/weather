import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Layouts from "./layouts/Layouts";
import GlobalPages from "./pages/GlobalPages";
import AboutPages from "./pages/AboutPages";
import ForecastPages from "./pages/ForecastPages";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<GlobalPages />} />
          <Route path="forecast" element={<ForecastPages />} />
          <Route path="about" element={<AboutPages />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
