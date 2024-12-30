import { useState } from "react";
import ModalSaveButton from "./ModalSaveButton";
import ModalTitleAndDescription from "./ModalTitleAndDescription";
import ReactSwitch from "react-switch";
import { intialProfileDataProps } from "../../data/profileData";
import { RootState, useAppDispatch } from "../../redux/store";
import { setProfile } from "../../redux/profileActions";
import { useSelector } from "react-redux";

interface DecadeIwasBornModalProps {
  title: string;
  description: string;
  question: string;
  setProfileData: React.Dispatch<React.SetStateAction<intialProfileDataProps>>;
  allowedLength: number;
  value: boolean;
  onclose: () => void;
  tag: string;
}

const DecadeIWasBornModal: React.FC<DecadeIwasBornModalProps> = ({
  question,
  description,
  title,
  tag,
  onclose,
  setProfileData,
  value,
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.profile.loading);
  const [isCheked, setIsChecked] = useState(value); // Local state to handle input changes
  console.log(isCheked, value);
  const handleSave = () => {
    dispatch(setProfile({ tag, value: isCheked }));
    setProfileData((prev: intialProfileDataProps) => ({
      ...prev,
      [tag]: isCheked,
    }));
    onclose();
  };
  return (
    <div className=" flex flex-col mt-6">
      <ModalTitleAndDescription question={question} description={description} />
      <div className="flex items-center justify-between my-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-normal">Show the {title}</h2>
          <p className="text-gray-500">Born in the 00s</p>
        </div>
        <div>
          <ReactSwitch
            checked={isCheked}
            onChange={(checked) => setIsChecked(checked)}
            id="switch"
          />
        </div>
      </div>

      <ModalSaveButton isLoading={isLoading} handleSave={handleSave} />
    </div>
  );
};

export default DecadeIWasBornModal;
