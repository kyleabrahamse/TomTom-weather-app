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

// Firebase
import { collection, addDoc } from "firebase/firestore";
import db from "./Firebase/firebase-config";

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [searchedLocation, setSearchedLocation] = useState("");
  const [bool, setBool] = useState(false);

  // Add data to Firebase
  const colRef = collection(db, "weather-data");

  const addDocument = async (colRef: any, forecast: any) => {
    try {
      await addDoc(colRef, forecast);
      console.log("Document added succesfully");
    } catch (err) {
      console.log("Error adding document: ", err);
    }
  };

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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  const latChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(event.target.value);
  };
  const longChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  // fucntion handler for search button
  const handleClick = () => {
    if (latitude && longitude) {
      foreCastFetch(parseFloat(latitude), parseFloat(longitude));
      setCurrentWeather(null);
      setLatitude("");
      setLongitude("");
      setBool(false);
    } else if (location) {
      currentWeatherFetch(location);
      setForecast(null);
      setLocation("");
      setBool(false);
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
        addDocument(colRef, cityData);
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
      setCurrentWeather(data.current);
      setBool(true);
      setSearchedLocation(`Lat: ${latitude}, Long: ${longitude}`);
      addDocument(colRef, data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

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
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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
                  name={bool ? searchedLocation : currentWeather.name}
                  image={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                  description={currentWeather.weather[0].description}
                  temp={bool ? currentWeather.temp : currentWeather.main.temp}
                  humid={
                    bool
                      ? currentWeather.humidity
                      : currentWeather.main.humidity
                  }
                  wind={
                    bool ? currentWeather.wind_speed : currentWeather.wind.speed
                  }
                  visibility={currentWeather.visibility}
                  feelsLike={
                    bool
                      ? currentWeather.feels_like
                      : currentWeather.main.feels_like
                  }
                  location={location}
                />
                <div className="flex flex-wrap justify-around mt-6 rounded-2xl bg-slate-800 p-10">
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
          <div className="flex w-1/3 flex-col justify-between bg-slate-800 text-xl rounded-2xl px-2 py-4">
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
