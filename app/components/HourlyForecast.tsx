import Image from "next/image";

type hourlyProps = {
  temp: number;
  icon: string;
  unix: number;
};

export default function HourlyForecast({ temp, icon, unix }: hourlyProps) {
  const date = new Date(unix * 1000);
  const hour = date.getHours();

  return (
    <div className="text-center ">
      <p className="text-gray-400 text-xl">{hour}:00</p>
      <Image
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="icon"
        height={140}
        width={140}
      />
      <p className="text-2xl font-bold">{Math.floor(temp)} °C</p>
    </div>
  );
}
