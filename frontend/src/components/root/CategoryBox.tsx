import { ItemType } from "../../data/items";

interface CategoryBoxProps {
  item: ItemType;
  selected: boolean;
  handleClick: (item: ItemType) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  item,
  selected,
  handleClick,
}) => {
  return (
    <div
      aria-selected={selected}
      onClick={() => handleClick(item)}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 group  transition cursor-pointer min-w-max  ${
        selected ? "border-b-neutral-800" : "border-b-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"} `}
    >
      <img
        src={item.image}
        className={`w-6 h-6 transition group-hover:opacity-100 ${
          selected ? "grayscale-0 opacity-100" : "grayscale opacity-75"
        }`}
        alt={item.name || "item image"}
      />

      <span className="group-hover:text-neutral-800">{item.name}</span>
    </div>
  );
};

export default CategoryBox;
