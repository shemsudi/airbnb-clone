type RegionProps = {
  imageUrl: string;
  region: string;
  value: string;
  setWhere: (value: string) => void;
  setSearchFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

const Region: React.FC<RegionProps> = ({
  imageUrl,
  region,
  value,
  setWhere,
  setSearchFocused,
}) => {
  const HandleRegionChange = (value: string) => {
    setWhere(value);
    setSearchFocused(false);
  };
  return (
    <div className="flex flex-col gap-2 min-w-fit">
      <button
        className="h-full w-full"
        onClick={() => HandleRegionChange(value)}
      >
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full border border-gray-300 rounded-md"
        />
      </button>
      <span>{region}</span>
    </div>
  );
};
export default Region;
