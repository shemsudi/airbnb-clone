interface amenityGridProps {
  title: string;
  items: {
    value: string;
    icon: JSX.Element;
  }[];
  selectedItems: string[];
  onToggle: (value: string) => void;
}

const AmenityGrid: React.FC<amenityGridProps> = ({
  title,
  items,
  selectedItems,
  onToggle,
}) => {
  return (
    <div className="mb-2">
      <h2 className="mb-1">{title}</h2>
      <div className=" grid grid-cols-1 min-[390px]:grid-cols-2 min-[720px]:grid-cols-3 gap-2 ">
        {items.map(({ value, icon }) => (
          <button
            aria-label={value}
            key={value}
            className={`flex flex-col active:scale-95 active:duration-100 justify-between items-start border p-2 rounded-lg ${
              selectedItems.includes(value) &&
              "outline outline-2 bg-neutral-100"
            } hover:outline  hover:outline-2`}
            onClick={() => onToggle(value)}
          >
            {icon}
            <p className="text-start text-sm">{value}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AmenityGrid;
