const option = [
  { key: "stays", label: "Stays" },
  { key: "experiences", label: "Experiences" },
];

interface optionsProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const Options: React.FC<optionsProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <div className="flex gap-5  ">
      {option.map((option) => (
        <h1
          key={option.key}
          className={`cursor-pointer px-3 py-1 rounded-full transition-colors duration-300 ${
            selectedOption === option.key
              ? "text-black"
              : "text-gray-500 hover:bg-gray-100"
          }`}
          onClick={() => setSelectedOption(option.key)}
        >
          {option.label}
        </h1>
      ))}
    </div>
  );
};

export default Options;
