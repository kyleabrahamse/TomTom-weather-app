import debounce from "lodash/debounce";

type SearchComponentProps = {
  location: string;
  longitude: string;
  latitude: string;
  cities: any;
  handleSearch: () => void;
  locationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  latChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  longChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKey: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function SearchComponent({
  location,
  longitude,
  latitude,
  cities,
  locationChange,
  handleSearch,
  latChange,
  longChange,
  handleKey,
}: SearchComponentProps) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleSearch();
    event.currentTarget.reset();
  };

  return (
    <div>
      <form className="lg:flex gap-2 pb-10" onSubmit={handleSubmit}>
        <input
          className="bg-slate-800 text-xl rounded-xl p-2 w-full"
          type="text"
          onChange={debounce(locationChange, 600)}
          placeholder="Search by city"
          onKeyDown={handleKey}
          list="cities"
        />
        <datalist id="cities">
          {cities && cities.data && cities.data.length > 0
            ? cities.data.map((city: any) => (
                <option value={city.city} key={city.id}>
                  {city.city}
                </option>
              ))
            : null}
        </datalist>
        <p className="my-auto px-2">or</p>
        <input
          placeholder="latitude"
          type="text"
          className="bg-slate-800 text-xl rounded-xl p-2 mb-4 lg:mb-0 w-full"
          onChange={latChange}
        />
        <input
          placeholder="longitude"
          type="text"
          className="bg-slate-800 text-xl rounded-xl p-2 w-full"
          onChange={longChange}
          onKeyDown={handleKey}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-xl rounded-xl p-2 hover:bg-blue-800 mt-4 lg:mt-0 ml:0 lg:ml-4 w-full"
        >
          Search
        </button>
      </form>
    </div>
  );
}
