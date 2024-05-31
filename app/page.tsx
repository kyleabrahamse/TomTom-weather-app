"use client";

import { useEffect, useState } from "react";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCard from "./components/ForecastCard";
import {
  homePageWeather,
  cityWeatherFetch,
  forecastWeatherFetch,
} from "./Data/FetchWeather";

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await homePageWeather();
        setCurrentWeather(data);
        // console.log(data);
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
    fetchData();
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
      foreCastFetch(parseFloat(latitude), parseFloat(longitude));
      setCurrentWeather(null);
      setLatitude("");
      setLongitude("");
    } else if (location) {
      currentWeatherFetch(location);
      setForecast(null);
      setLocation("");
    }
  };

  const currentWeatherFetch = async (location: any) => {
    try {
      const data = await cityWeatherFetch({ location });
      setCurrentWeather(data);
      console.log(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const foreCastFetch = async (latitude: number, longitude: number) => {
    try {
      const data = await forecastWeatherFetch({ latitude, longitude });
      setForecast(data);
      console.log(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
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
          location={location}
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
