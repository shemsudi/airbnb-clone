import React, { useState } from "react";

interface PhoneNumberInputProps {
  countryCode: string;
  errors: {
    phoneNumber?: string;
  };
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  countryCode,
  errors,
  phoneNumber,
  setPhoneNumber,
}) => {
  const [isVisibile, setIsVisible] = useState<boolean>(false);

  return (
    <div className="flex flex-col  pl-2 border border-t-0 border-gray-300 rounded-md rounded-l-none 	">
      <div className="flex items-center relative">
        {(isVisibile || phoneNumber) && (
          <span className="mr-2 pt-1 transform duration-200 ease-in-out">
            {countryCode}
          </span>
        )}
        <input
          onFocus={() => setIsVisible(true)}
          onBlur={() => setIsVisible(false)}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className=" peer font-light bg-white  rounded-md transition pt-4 pb-2  w-full focus:outline-none focus:ring-0"
        />
        <label
          htmlFor="phoneNumber"
          className={` ${
            phoneNumber && "-translate-y-5 scale-75"
          } absolute text-md duration-150 transform -translate-y-1 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-5 text-gray-500 ${
            errors.phoneNumber ? "text-red-700" : ""
          }`}
        >
          Phone number
        </label>
      </div>
    </div>
  );
};

export default PhoneNumberInput;
