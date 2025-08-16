import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CityProvider } from "./utils/CityContext.jsx";

createRoot(document.getElementById("root")).render(
  <CityProvider>
    <App />
  </CityProvider>
);
