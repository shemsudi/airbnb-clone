import { descriptionTypes } from "../../data/types";

interface HighlightSelectionProps {
  selectedTypes: string[];
  onToggle: (value: string) => void;
}

const HighlightSelection: React.FC<HighlightSelectionProps> = ({
  selectedTypes,
  onToggle,
}) => (
  <div className="max-w-[500px] flex flex-col justify-center mx-6">
    <h1 className="text-2xl">Next, let's describe your house</h1>
    <small className="text-gray-600">
      Choose up to 2 highlights. We'll use these to get your description
      started.
    </small>
    <div className="flex gap-2 flex-wrap my-4 mt-5">
      {descriptionTypes.map(({ value, icon }, index) => (
        <div
          key={index}
          onClick={() => onToggle(value)}
          className={`flex items-center p-2 border rounded-2xl cursor-pointer 
              ${
                selectedTypes.includes(value)
                  ? "bg-neutral-100 outline outline-1"
                  : "border-gray-300"
              }`}
        >
          {icon}
          <small>{value}</small>
        </div>
      ))}
    </div>
  </div>
);
export default HighlightSelection;
