import Image from "next/image";

type CurrentProps = {
  name: string;
  image: string;
  temp: number;
  humid: number;
  wind: number;
  visibility: number;
  feelsLike: number;
};

export default function CurrentWeatherCard({
  name,
  image,
  temp,
  humid,
  wind,
  visibility,
  feelsLike,
}: CurrentProps) {
  return (
    <div>
      <div>
        <h1>Current Weather</h1>
        <h1>{name}</h1>
        <Image src={image} alt="weather" height={100} width={100} />
        <p>{Math.floor(temp)} °C</p>
        <p>Humidity: {humid} %</p>
        <p>Wind: {wind} kph</p>
        <p>Visibility: {visibility} m</p>
        <p>Feels like: {Math.floor(feelsLike)} °C</p>
      </div>
    </div>
  );
}
