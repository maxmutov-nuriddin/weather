import { useEffect, useState } from "react";
import Card from "../components/StyledWrapper";
import { useCity } from "../utils/CityContext";

const GlobalPages = () => {
  const { city } = useCity(); // ⚡ city global contextdan keladi
  const [weatherData, setWeatherData] = useState(null);


  console.log(weatherData);
  
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
  }, [city]); // ⚡ city o‘zgarsa qayta yuklanadi

  return <Card data={weatherData} />;
};

export default GlobalPages;
