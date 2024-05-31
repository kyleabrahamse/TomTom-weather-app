"use client";

import { useEffect, useState } from "react";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCard from "./components/ForecastCard";
import HourlyForecast from "./components/HourlyForecast";
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

  // Weather data for home page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeData = await homePageWeather();
        setCurrentWeather(homeData);
        if (homeData.coord) {
          const forecastData = await forecastWeatherFetch({
            latitude: homeData.coord.lat,
            longitude: homeData.coord.lon,
          });
          setForecast(forecastData);
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
    fetchData();
  }, []);

  // onchange for inputs
  const handleChange = (event: any) => {
    setLocation(event.target.value);
  };
  const latChange = (event: any) => {
    setLatitude(event.target.value);
  };
  const longChange = (event: any) => {
    setLongitude(event.target.value);
  };

  // fucntion handler for search button
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

  // Fetch weather for current city
  const currentWeatherFetch = async (location: any) => {
    try {
      const cityData = await cityWeatherFetch({ location });
      setCurrentWeather(cityData);
      if (cityData.coord) {
        const forecastData = await forecastWeatherFetch({
          latitude: cityData.coord.lat,
          longitude: cityData.coord.lon,
        });
        setForecast(forecastData);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // fetch weather for forecast by lat and long
  const foreCastFetch = async (latitude: number, longitude: number) => {
    try {
      const data = await forecastWeatherFetch({ latitude, longitude });
      setForecast(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  console.log(forecast);

  return (
    <main className="bg-slate-900 text-white py-20 h-screen">
      <div className="w-8/12 mx-auto">
        <div className="flex gap-2 pb-10">
          <input
            className="bg-slate-800 text-xl rounded-xl p-2"
            type="text"
            onChange={handleChange}
            value={location}
            placeholder="Search by city"
          />
          <p className="my-auto px-2">or</p>
          <input
            placeholder="latitude"
            type="text"
            className="bg-slate-800 text-xl rounded-xl p-2"
            onChange={latChange}
            value={latitude}
          />
          <input
            placeholder="longitude"
            type="text"
            className="bg-slate-800 text-xl rounded-xl p-2"
            onChange={longChange}
            value={longitude}
          />
          <button
            onClick={handleClick}
            className="bg-blue-600 text-xl rounded-xl p-2 hover:bg-blue-800 ml-4"
          >
            Search
          </button>
        </div>
        <div className="flex gap-10 ">
          <div className="w-2/3">
            {currentWeather && forecast ? (
              <div>
                <CurrentWeatherCard
                  name={currentWeather.name}
                  image={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                  description={currentWeather.weather[0].description}
                  temp={currentWeather.main.temp}
                  humid={currentWeather.main.humidity}
                  wind={currentWeather.wind.speed}
                  visibility={currentWeather.visibility}
                  feelsLike={currentWeather.main.feels_like}
                  location={location}
                />
                <div className="flex flex-wrap justify-around mt-4 rounded-2xl bg-slate-800 p-10">
                  {forecast.hourly
                    .slice(0, 6)
                    .map((hour: any, index: number) => (
                      <HourlyForecast
                        key={index}
                        temp={hour.temp}
                        icon={hour.weather[0].icon}
                        unix={hour.dt}
                      />
                    ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex w-1/3 flex-col justify-between bg-slate-800 text-xl rounded-2xl px-2 py-10">
            {forecast
              ? forecast.daily.map((day: any, i: number) => {
                  return (
                    <ForecastCard
                      minTemp={day.temp.min}
                      maxTemp={day.temp.max}
                      weatherText={day.weather[0].description}
                      unix={day.dt}
                      key={i}
                      image={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </main>
  );
}
