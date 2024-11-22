import Region from "../components/root/region";
import regionLocation from "../data/region";

type RegionModalProps = {
  setWhere: React.Dispatch<React.SetStateAction<string>>;
  setSearchFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegionModal: React.FC<RegionModalProps> = ({
  setWhere,
  setSearchFocused,
}) => {
  return (
    <div className="p-8 w-full">
      <h1 className="font-semibold mb-3">Search by region</h1>

      <div className="grid grid-cols-3 gap-3">
        {regionLocation.map((location, index) => (
          <Region
            value={location.value}
            setWhere={setWhere}
            key={index}
            region={location.region}
            imageUrl={location.imageUrl}
            setSearchFocused={setSearchFocused}
          />
        ))}
      </div>
    </div>
  );
};

export default RegionModal;
