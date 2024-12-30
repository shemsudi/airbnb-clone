import countries, { IntlDirectDialingCode } from "world-countries";

interface Country {
  value: string;
  region: string;
  label: string;
  flag: string;
  latlng: [number, number];
  code: IntlDirectDialingCode;
}

const formattedCountries: Country[] = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
  code: country.idd,
}));
// console.log(formattedCountries);

// const useCountries = () => {
//   const getAll = () => formattedCountries;

//   const getByValue = (value: string) => {
//     return formattedCountries.find((item) => item.value === value);
//   };

//   return {
//     getAll,
//     getByValue,
//   };
// };

interface CountrySelectProps {
  countryCode: string;
  setCountryCode: (code: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  countryCode,
  setCountryCode,
}) => {
  return (
    <div className=" flex flex-col border border-gray-300 rounded-md">
      <label
        htmlFor="countryCode"
        className=" text-sm font-medium text-gray-500 pl-2"
      >
        Country Code
      </label>
      <select
        id="countryCode"
        name="countryCode"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
        className="text-base flex gap-4 w-full font-roboto pl-1 pr-1 bg-white focus:outline-none focus:ring-0"
        required
      >
        {formattedCountries.map((country) => (
          <option
            className=""
            key={country.label}
            value={country.code.root + country.code.suffixes[0]}
          >
            {country.label} {country.code.root + country.code.suffixes[0]}
          </option>
        ))}
      </select>
    </div>
  );
};
export { CountrySelect, formattedCountries };
