"use client";

import { useEffect, useState } from "react";
import SearchComponent from "./components/SearchComponent";
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
  const [cities, setCities] = useState("");

  // Add data to Firebase
  const colRef = collection(db, "weather-data");

  const addDocument = async (colRef: any, forecast: any) => {
    try {
      await addDoc(colRef, forecast);
      console.log("Document added succesfully, Am I hired?");
    } catch (err) {
      console.log("Error adding document", err);
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

  // city suggestions apiKey
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b926f37c76msh9ed01bf9b1e8aa3p10f188jsn3f5041e0b37b",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  // onchange for inputs
  const locationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);

    // Fetch city suggestions
    const city = event.target.value;
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?&namePrefix=${city}`;
    fetch(url, options)
      .then((res) => res.json())
      .then((data: any) => {
        setCities(data);
      })
      .catch((err) => console.error(err));
  };
  const latChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(event.target.value);
  };
  const longChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(event.target.value);
  };
  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // function handler for search button
  const handleSearch = () => {
    if (latitude && longitude) {
      foreCastFetch(parseFloat(latitude), parseFloat(longitude));
    } else if (location) {
      currentWeatherFetch(location);
    }

    setLatitude("");
    setLongitude("");
    setLocation("");
    setCurrentWeather(null);
    setForecast(null);
    setBool(false);
  };

  // Fetch weather for current city
  const currentWeatherFetch = async (location: string) => {
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

  // fetch weather for forecast
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
  console.log();

  return (
    <main className="bg-slate-900 text-white py-20">
      <div className="w-11/12 lg:w-8/12 mx-auto">
        <SearchComponent
          location={location}
          longitude={longitude}
          latitude={latitude}
          handleSearch={handleSearch}
          locationChange={locationChange}
          latChange={latChange}
          longChange={longChange}
          handleKey={handleKey}
          cities={cities}
        />
        <div className="xl:flex gap-10">
          <div className="xl:w-2/3 ">
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
                <div className="flex mt-6 gap-12 rounded-2xl bg-slate-800 p-10  overflow-x-scroll whitespace-nowrap">
                  {forecast.hourly.map((hour: any, index: number) => (
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
          <div className="flex xl:w-1/3 mt-6 flex-col justify-between bg-slate-800 text-xl rounded-2xl px-2 py-4">
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
