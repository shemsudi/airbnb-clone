interface Country {
  code: string;
  country: string;
}

const countryCodes: Country[] = [
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+251", country: "Ethiopia" },
];

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
        className="text-md font-roboto pl-1 pr-1 bg-white focus:outline-none focus:ring-0"
        required
      >
        {countryCodes.map((country) => (
          <option className="" key={country.code} value={country.code}>
            {country.country} ({country.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;
