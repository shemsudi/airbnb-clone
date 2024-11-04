interface LocationInputProps {
  title: string;
  id: string;
  value?: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  value,
  title,
  id,
  onchange,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="pl-2">
        {" "}
        <small className=" text-gray-500"> {title} </small>{" "}
      </label>
      <input
        type="text"
        className="bg-inherit mt-0 focus:outline-none px-2  rounded-lg"
        id={id}
        value={value}
        onChange={onchange}
      />
    </div>
  );
};
export default LocationInput;
