import React, { useEffect, useState } from "react";
import ProfileInputField from "./ProfileInputField";
import ModalTitleAndDescription from "./ModalTitleAndDescription";
import ModalSaveButton from "./ModalSaveButton";
import { intialProfileDataProps } from "../../data/profileData";
import { RootState, useAppDispatch } from "../../redux/store";
import { setProfile } from "../../redux/profileActions";
import { useSelector } from "react-redux";

interface ModalContentProps {
  title: string;
  description: string;
  question: string;
  setProfileData: React.Dispatch<React.SetStateAction<intialProfileDataProps>>;
  allowedLength: number;
  value: string;
  onclose: () => void;
  tag: string;
}

const ModalContent: React.FC<ModalContentProps> = ({
  title,
  description,
  question,
  setProfileData,
  allowedLength,
  value,
  onclose,
  tag,
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.profile.loading);
  console.log(isLoading);
  const [inputValue, setInputValue] = useState(value); // Local state to handle input changes
  useEffect(() => {
    setInputValue(value); // Update local state when `value` changes
  }, [value]);
  const handleSave = () => {
    dispatch(setProfile({ tag, value: inputValue }));
    setProfileData((prev) => ({ ...prev, [tag]: inputValue }));
    onclose();
  };

  const charLeft = allowedLength - inputValue.length;
  return (
    <div className="flex flex-col mt-6">
      <ModalTitleAndDescription question={question} description={description} />
      <ProfileInputField
        title={title}
        inputValue={inputValue}
        setInputValue={setInputValue}
        allowedLength={allowedLength}
      />
      <div className="text-end top-full mb-6 p-2 text-lg text-gray-500">
        {charLeft} characters available
      </div>
      <ModalSaveButton isLoading={isLoading} handleSave={handleSave} />
    </div>
  );
};

export default ModalContent;
