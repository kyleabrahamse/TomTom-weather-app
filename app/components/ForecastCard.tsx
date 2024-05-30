import React from "react";

type ForecastProps = {
  minTemp: number;
  maxTemp: number;
  unix: number;
};

export default function ForecastCard({
  minTemp,
  maxTemp,
  unix,
}: ForecastProps) {
  let date = new Date(unix * 1000);
  let day: string | number = date.getDay();
 
  switch (day) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
  }

  return (
    <div>
      <h2>{day}</h2>
      <p>Min: {minTemp}</p>
      <p>max: {maxTemp}</p>
    </div>
  );
}
