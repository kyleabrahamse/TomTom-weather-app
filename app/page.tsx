"use client";

import { useEffect, useState } from "react";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCard from "./components/ForecastCard";

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const CurrentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minutely&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  // fetch current weather for base route
  useEffect(() => {
    const data = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentWeather(data);
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
      setLatitude("");
      setLongitude("");
    } else if (location) {
      currentWeatherFetch();
      setLocation("");
    }
  };

  const currentWeatherFetch = () => {
    const data = fetch(CurrentApiUrl)
      .then((res) => res.json())
      .then((data) => {
        setCurrentWeather(data);
        setForecast(null);
        console.log(currentWeather);
      })
      .catch((err) => console.log(err));
  };

  const foreCastFetch = () => {
    const data = fetch(forecastApiUrl)
      .then((res) => res.json())
      .then((data) => {
        setForecast(data);
        setCurrentWeather(null);
        console.log(forecast);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <input
        className="border-2 border-black text-4xl"
        type="text"
        onChange={handleChange}
        value={location}
      />
      <div>
        <input
          placeholder="latitude"
          type="text"
          className="border-2 border-black text-4xl"
          onChange={latChange}
          value={latitude}
        />
        <input
          placeholder="longitude"
          type="text"
          className="border-2 border-black text-4xl"
          onChange={longChange}
          value={longitude}
        />
      </div>
      <button onClick={handleClick} className="border-2 border-black text-4xl">
        Search
      </button>
      {currentWeather ? (
        <CurrentWeatherCard
          name={currentWeather.name}
          image={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
          temp={currentWeather.main.temp}
          humid={currentWeather.main.humidity}
          wind={currentWeather.wind.speed}
          visibility={currentWeather.visibility}
          feelsLike={currentWeather.main.feels_like}
        />
      ) : null}
      <div className="flex gap-10">
        {forecast
          ? forecast.daily.map((day: any, i: number) => {
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
      </div>
    </main>
  );
}
