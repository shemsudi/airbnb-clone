import { useState } from "react";

interface ProfileInputFieldProps {
  title: string;
  allowedLength: number;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
}

const ProfileInputField: React.FC<ProfileInputFieldProps> = ({
  title,
  allowedLength,
  setInputValue,
  inputValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Enforce character limit
    if (newValue.length <= allowedLength) {
      setInputValue(newValue);
    }
  };
  return (
    <div
      className={`flex  ${
        isFocused ? "ring-black ring-2" : ""
      } items-center relative border mt-8 rounded-lg px-4 py-2`}
    >
      <input
        type="text"
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={inputValue}
        name={title}
        id={title}
        maxLength={allowedLength}
        aria-label={title}
        aria-describedby={`${title}-description`}
        className={` peer font-mono bg-white  text-xl rounded-md transition pt-4 pb-2  w-full focus:outline-none`}
      />
      <label
        htmlFor={title}
        className={` ${
          inputValue && "-translate-y-5 scale-75"
        } absolute text-md duration-150 transform -translate-y-1 text-lg top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-5 text-gray-500 
        `}
      >
        {title}:
      </label>
    </div>
  );
};

export default ProfileInputField;
