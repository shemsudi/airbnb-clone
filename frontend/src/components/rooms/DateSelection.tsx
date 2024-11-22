import React from "react";
import DatePicker from "../root/datePicker";

interface DateSelectionProps {
  currentMonth: number;
  currentYear: number;
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
  date: string[];
  minStay: number;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  currentMonth,
  currentYear,
  setDate,
  date,
  minStay,
}) => {
  return (
    <div className="flex flex-col mt-4 gap-3">
      <div>
        <h1 className="font-semibold text-2xl">Select check-in date</h1>
        <p>Minimum stay: {minStay} nights</p>
      </div>
      <div className="flex w-full gap-6">
        <DatePicker
          currentMonth={currentMonth}
          currentYear={currentYear}
          setDate={setDate}
          date={date}
        />
        <DatePicker
          currentMonth={currentMonth + 1}
          currentYear={currentYear}
          setDate={setDate}
          date={date}
        />
      </div>
    </div>
  );
};

export default DateSelection;
