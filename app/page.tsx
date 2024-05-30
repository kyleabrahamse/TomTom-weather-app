"use client";

import { useEffect, useState } from "react";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCard from "./components/ForecastCard";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [location, setLocation] = useState("london");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const apiKey = "c815e7e6f6adf63781437395939c7e9d";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minutely&appid=${apiKey}`;

  useEffect(() => {
    const data = fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeather(data);
      });
  }, []);

  const handleChange = (event: any) => {
    setLocation(event.target.value);
  };

  const latChange = (event: any) => {
    setLatitude(event.target.value);
  };

  const longChange = (event: any) => {
    setLongitude(event.target.value);
  };

  const handleClick = () => {
    if (latitude && longitude) {
      foreCastFetch();
    } else {
      currentWeatherFetch();
    }
  };

  const currentWeatherFetch = () => {
    const data = fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        console.log(weather);
      })
      .catch((err) => console.log(err));
  };

  const foreCastFetch = () => {
    const data = fetch(forecastApiUrl)
      .then((res) => res.json())
      .then((data) => {
        setForecast(data);
        console.log(forecast);
      })
      .catch((err) => console.log(err));
  };

  // console.log(weather);
  return (
    <main>
      <input
        className="border-2 border-black text-4xl"
        type="text"
        onChange={handleChange}
      />
      <div>
        <input
          placeholder="latitude"
          type="text"
          className="border-2 border-black text-4xl"
          onChange={latChange}
        />
        <input
          placeholder="longitude"
          type="text"
          className="border-2 border-black text-4xl"
          onChange={longChange}
        />
      </div>
      <button onClick={handleClick} className="border-2 border-black text-4xl">
        Search
      </button>
      {/* {weather ? (
        <CurrentWeatherCard
          name={weather.name}
          image={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          temp={weather.main.temp}
          humid={weather.main.humidity}
          wind={weather.wind.speed}
          visibility={weather.visibility}
          feelsLike={weather.main.feels_like}
        />
      ) : null} */}
      {forecast
        ? forecast.daily.map((day:any, i:number) => {
            return (
              <ForecastCard
                minTemp={day.temp.min}
                maxTemp={day.temp.max}
                unix={day.dt}
                key={i}
              />
            );
          })
        : null}
    </main>
  );
}
