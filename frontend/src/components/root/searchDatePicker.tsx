import React from "react";
import DatePicker from "./datePicker"; // Adjust the import path as necessary
interface SearchDatePickerProps {
  currentMonth: number;
  currentYear: number;
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
  date: string[];
  isCheckInFocused: boolean;
  isCheckOutFocused: boolean;
  setIsCheckOutFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCheckInFoucused: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchDatePicker: React.FC<SearchDatePickerProps> = ({
  currentMonth,
  currentYear,
  setDate,
  date,
  isCheckInFocused,
  isCheckOutFocused,
  setIsCheckOutFocused,
  setIsCheckInFoucused,
}) => {
  return (
    <DatePicker
      currentMonth={currentMonth}
      currentYear={currentYear}
      setDate={setDate}
      date={date}
      isCheckInFocused={isCheckInFocused}
      isCheckOutFocused={isCheckOutFocused}
      setIsCheckOutFocused={setIsCheckOutFocused}
      setIsCheckInFoucused={setIsCheckInFoucused}
    />
  );
};

export default SearchDatePicker;
