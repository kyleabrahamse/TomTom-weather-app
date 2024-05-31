export async function homePageWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function cityWeatherFetch({ location }: { location: string }) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function forecastWeatherFetch({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minutely&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
