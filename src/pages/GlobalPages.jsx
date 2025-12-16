import { useEffect, useState } from "react";
import WeatherDashboard from "../components/WeatherDashboard";
import { useCity } from "../utils/CityContext";

const GlobalPages = () => {
  const { city } = useCity();
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "a1eda70acff73cb6b226bae7b1c84c5a";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCurrent = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`
        );
        const current = await resCurrent.json();

        const resForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ru`
        );
        const forecast = await resForecast.json();

        // 3 kunlik prognoz
        const dailyForecast = forecast.list
          .filter((_, i) => i % 8 === 0)
          .slice(1, 4);

        setWeatherData({
          city: current.name,
          country: current.sys.country,
          temp: Math.round(current.main.temp),
          description: current.weather[0].description,
          feels_like: Math.round(current.main.feels_like),
          humidity: current.main.humidity,
          pressure: current.main.pressure,
          wind_speed: current.wind.speed,
          date: new Date().toLocaleDateString("ru-RU", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }),
          forecast: dailyForecast.map((f) => ({
            date: new Date(f.dt_txt).toLocaleDateString("ru-RU", {
              weekday: "long",
              day: "numeric",
              month: "long",
            }),
            temp: Math.round(f.main.temp),
          })),
        });
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      }
    };

    fetchData();
  }, [city]);

  return <WeatherDashboard data={weatherData} />;
};

export default GlobalPages;
