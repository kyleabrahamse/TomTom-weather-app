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
    <div className="flex items-center justify-around">
      <h2 className="">{day}</h2>
      <div className="flex items-center content-center ">
        <Image src={image} alt="weather" height={100} width={100} />
        <p>{weatherText}</p>
      </div>
      <p className="">
        {Math.floor(maxTemp)}/{Math.floor(minTemp)}
      </p>
    </div>
  );
}
