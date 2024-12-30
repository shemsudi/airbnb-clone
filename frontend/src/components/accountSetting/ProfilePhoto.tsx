import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { intialProfileDataProps } from "../../data/profileData";

interface ProfilePhotoProps {
  firstLetter: string;
  profile: intialProfileDataProps;
  handleFileChange: React.ChangeEventHandler<intialProfileDataProps>;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  firstLetter,
  // handleFileChange,
  // profile,
}) => {
  return (
    <div className=" relative w-full md:w-2/6">
      <div className="sticky top-40 p-4 xl:p-8 flex flex-col items-center">
        <div className=" rounded-full size-48 lg:size-60 font-bold  text-9xl   bg-black flex justify-center text-white items-center">
          <div> {firstLetter}</div>{" "}
        </div>
        <div className="-translate-y-4 z-10 flex gap-2 items-center px-3 py-1 rounded-lg bg-white shadow-lg">
          <FontAwesomeIcon icon={faCamera} />
          Add
        </div>
        {/* <input
          type="file"
          onChange={(e) => handleFileChange((e)=> { ...profile, file: e.target.value })}
        /> */}
      </div>
    </div>
  );
};

export default ProfilePhoto;
