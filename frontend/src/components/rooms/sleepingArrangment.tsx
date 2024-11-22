import React from "react";
import HouseIcon from "../icons/houseIcon";

interface SleepingArrangementProps {
  bedrooms: number;
  bedType: string;
}

const SleepingArrangement: React.FC<SleepingArrangementProps> = ({
  bedrooms,
  bedType,
}) => {
  return (
    <div className="flex flex-col my-8 w-full">
      <h1 className="text-2xl font-bold">Where you'll sleep</h1>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {[...Array(bedrooms)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col p-4 border rounded-lg border-gray-600"
          >
            <HouseIcon />
            <h1 className="text-xl font-semibold">Bedroom {index + 1}</h1>
            <h2>{bedType}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SleepingArrangement;
