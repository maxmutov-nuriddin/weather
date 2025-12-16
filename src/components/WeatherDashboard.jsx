import React from 'react';

const WeatherDashboard = ({ data }) => {
  if (!data) return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400"></div>
    </div>
  );

  const { city, country, temp, description, feels_like, humidity, wind_speed, pressure, forecast } = data;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] w-full max-w-7xl mx-auto p-4 md:p-8">

      {/* Main Glass Card */}
      <div className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col gap-8 text-white relative overflow-hidden">

        {/* Background Gradients (Decorative) */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/30 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-10 -right-10 w-60 h-60 bg-purple-500/30 rounded-full blur-[80px]"></div>

        {/* Top Section: City & Main Temp */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center sm:items-start text-center md:text-left gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
              {city}, <span className="text-blue-300">{country}</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mt-2 capitalize font-medium tracking-wide">
              {description}
            </p>
            <p className="text-sm text-blue-200 mt-1 opacity-80">{data.date}</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-8xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200 drop-shadow-xl leading-none">
              {temp}°
            </span>
          </div>
        </div>

        {/* Middle Section: Details Grid */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <DetailCard label="Feels Like" value={`${feels_like}°C`} icon="🌡️" />
          <DetailCard label="Humidity" value={`${humidity}%`} icon="💧" />
          <DetailCard label="Wind" value={`${wind_speed} m/s`} icon="💨" />
          <DetailCard label="Pressure" value={`${pressure} hPa`} icon="🧭" />
        </div>

        {/* Bottom Section: Forecast */}
        <div className="relative z-10 mt-8">
          <h3 className="text-xl font-semibold mb-4 text-blue-100/90 pl-1">3-Day Forecast</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-black/20 hover:bg-black/30 transition-all duration-300 rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 backdrop-blur-sm group"
              >
                <p className="text-blue-100 text-sm font-medium mb-1 opacity-80">{day.date}</p>
                <div className="text-3xl font-bold my-1 group-hover:scale-110 transition-transform duration-300">{day.temp}°C</div>
                <div className="h-1 w-12 bg-blue-400/50 rounded-full mt-2 group-hover:bg-blue-400 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const DetailCard = ({ label, value, icon }) => (
  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
    <div className="text-2xl mb-2">{icon}</div>
    <span className="text-blue-100 text-xs uppercase tracking-wider font-semibold opacity-70">{label}</span>
    <span className="text-xl font-bold mt-1">{value}</span>
  </div>
);

export default WeatherDashboard;
