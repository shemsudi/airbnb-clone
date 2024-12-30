import Options from "../root/options";
import Search from "../root/search";

const OptionsSection = ({
  isAtTop,
  selectedOption,
  setSelectedOption,
}: {
  isAtTop: boolean;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="max-lg:hidden">
      {!isAtTop ? (
        <Search />
      ) : (
        <Options
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      )}
    </div>
  );
};

export default OptionsSection;
