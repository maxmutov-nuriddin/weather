import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Layouts from "./layouts/Layouts";
import GlobalPages from "./pages/GlobalPages";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<GlobalPages />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
