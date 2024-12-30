import React, { useEffect, useState } from "react";
import ModalTitleAndDescription from "./ModalTitleAndDescription";
import ModalSaveButton from "./ModalSaveButton";
import { intialProfileDataProps } from "../../data/profileData";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { setProfile } from "../../redux/profileActions";

interface AboutYouContentProps {
  description: string;
  question: string;
  setProfileData: React.Dispatch<React.SetStateAction<intialProfileDataProps>>;
  allowedLength: number;
  value: string;
  onclose: () => void;
  tag: string;
}

const AboutYouContent: React.FC<AboutYouContentProps> = ({
  description,
  question,
  setProfileData,
  allowedLength,
  value,
  onclose,
  tag,
}) => {
  const isLoading = useSelector((state: RootState) => state.profile.loading);

  const [inputValue, setInputValue] = useState(value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  const handleSave = () => {
    dispatch(setProfile({ tag, value: inputValue }))
      .then(() => {
        setProfileData((prev: intialProfileDataProps) => ({
          ...prev,
          [tag]: inputValue,
        }));
        onclose();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const charLeft = allowedLength - inputValue.length;
  return (
    <div className=" flex flex-col mt-6">
      <ModalTitleAndDescription question={question} description={description} />
      <textarea
        className="border mt-6 h-32  p-2 font-mono  text-lg rounded-lg"
        onChange={(e) => setInputValue(e.target.value)}
        name="aboutYou"
        id="aboutYou"
        value={inputValue}
      ></textarea>
      <div className="text-end top-full mb-6 p-2 text-lg text-gray-500">
        {charLeft} characters available
      </div>
      <ModalSaveButton isLoading={isLoading} handleSave={handleSave} />
    </div>
  );
};

export default AboutYouContent;
