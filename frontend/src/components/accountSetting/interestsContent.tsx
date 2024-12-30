import React, { useEffect, useState } from "react";
import ModalTitleAndDescription from "./ModalTitleAndDescription";
import { interests, intialProfileDataProps } from "../../data/profileData";
import { useAppDispatch } from "../../redux/store";
import { setProfile } from "../../redux/profileActions";

interface InterestsContentProps {
  description: string;
  question: string;
  setProfileData: React.Dispatch<React.SetStateAction<intialProfileDataProps>>;
  allowedLength: number;
  value: string[];
  onclose: () => void;
  tag: string;
}

const InterestsContent: React.FC<InterestsContentProps> = ({
  description,
  question,
  setProfileData,
  allowedLength,
  value,
  onclose,
  tag,
}) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState(value); // Local state to handle input changes

  useEffect(() => {
    setInputValue(value); // Update local state when `value` changes
  }, [value]);
  const handleSave = () => {
    dispatch(setProfile({ tag, value: inputValue }));

    setProfileData((prev) => ({ ...prev, [tag]: inputValue }));
    onclose();
  };

  return (
    <div className="flex flex-col mt-6">
      <ModalTitleAndDescription question={question} description={description} />
      <div className="flex flex-wrap gap-3 my-3 overflow-y-scroll">
        {interests.map(({ type, icon }, index) => {
          const isSelected = inputValue.includes(type);
          return (
            <div
              key={index}
              onClick={() =>
                setInputValue((prev) =>
                  isSelected
                    ? prev.filter((item) => item !== type)
                    : [...prev, type]
                )
              }
              className={`flex gap-3 active:scale-95 items-center border py-1 px-3 rounded-full cursor-pointer
          ${
            isSelected ? "border-black" : "border-gray-300"
          } hover:border-black`}
            >
              {icon} {type}
            </div>
          );
        })}
      </div>

      <div className="border-t flex justify-between pt-4 items-center">
        <div className="text-lg font-mono">
          {inputValue.length}/{allowedLength} selected
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-3 w-28 bg-slate-950 text-white font-bold text-xl rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default InterestsContent;
