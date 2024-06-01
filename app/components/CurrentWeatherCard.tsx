import Image from "next/image";

type CurrentProps = {
  name: string;
  image: string;
  description: string;
  temp: number;
  humid: number;
  wind: number;
  visibility: number;
  feelsLike: number;
  location?: string;
};

export default function CurrentWeatherCard({
  name,
  image,
  temp,
  humid,
  wind,
  visibility,
  feelsLike,
  description,
}: CurrentProps) {
  return (
    <div>
      <div className="flex p-5 md:p-14">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-4xl font-bold">{name}</h1>
          <p className="text-gray-400 pt-4 text-xl invisible lg:visible">
            {description}
          </p>
          <p className="text-3xl md:text-6xl font-bold mt-0 lg:mt-auto">
            {Math.floor(temp)} °C
          </p>
        </div>
        <Image
          className=" ml-auto"
          src={image}
          alt="weather"
          height={200}
          width={200}
        />
      </div>
      <div className="bg-slate-800 text-xl p-10 rounded-2xl text-gray-400">
        <p className="pb-5">Air conditions</p>
        <div className="flex justify-between">
          <div>
            <>
              <p>Real Feel</p>
              <p className="text-2xl sm:text-4xl font-bold text-white pt-2 pb-10">
                {Math.floor(feelsLike)} °C
              </p>
            </>
            <>
              <p>Humidity</p>
              <p className="text-2xl sm:text-4xl font-bold text-white pt-2 pb-10">
                {humid} %
              </p>
            </>
          </div>
          <div>
            <>
              <p>Wind</p>
              <p className="text-2xl sm:text-4xl font-bold text-white pt-2 pb-10">
                {wind} km/h
              </p>
            </>
            <>
              <p>Visibility</p>
              <p className="text-2xl sm:text-4xl font-bold text-white pt-2 pb-10">
                {visibility / 1000} km
              </p>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
