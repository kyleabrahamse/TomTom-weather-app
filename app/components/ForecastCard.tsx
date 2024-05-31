import Image from "next/image";

type ForecastProps = {
  minTemp: number;
  maxTemp: number;
  image: string;
  weatherText: string;
  unix: number;
};

export default function ForecastCard({
  minTemp,
  maxTemp,
  image,
  weatherText,
  unix,
}: ForecastProps) {
  let date = new Date(unix * 1000);
  let day: string | number = date.getDay();

  switch (day) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
  }

  return (
    <div className="flex items-center">
      <h2 className="w-1/3 pl-10 text-gray-400">{day}</h2>
      <div className="flex w-1/3 items-center content-center ">
        <Image src={image} alt="weather" height={100} width={100} />
        <p>{weatherText}</p>
      </div>
      <p className="w-1/3 pl-20">
        {Math.floor(maxTemp)}/{Math.floor(minTemp)}
      </p>
    </div>
  );
}
