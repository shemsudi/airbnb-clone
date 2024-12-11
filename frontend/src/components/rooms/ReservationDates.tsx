import { ReactNode, useEffect, useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalenderProps {
  city: string;
  onChange: (value: Range) => void;
  value: Range;
  disabledDates: Date[];
}

const Calender: React.FC<CalenderProps> = ({
  city,
  value,
  onChange,
  disabledDates,
}) => {
  const [monthsToShow, setMonthsToShow] = useState(2);

  const startDate = value.startDate;
  const endDate = value.endDate;

  // Calculate the difference in milliseconds
  const differenceInTime = endDate!.getTime() - startDate!.getTime();

  // Convert milliseconds to days
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  useEffect(() => {
    const updateMonths = () => {
      const large = 1024;
      setMonthsToShow(window.innerWidth < large ? 1 : 2);
    };

    updateMonths();
    window.addEventListener("resize", updateMonths);

    return () => {
      window.removeEventListener("resize", updateMonths);
    };
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl pt-4  pb-1 font-semibold ">
        {differenceInDays + 1} nights in City of {city}
      </h1>
      <div className="text-gray-500 text-md">
        {value.startDate?.toDateString()}
        {differenceInDays > 0 && " - " + value.endDate?.toDateString()}
      </div>
      <DateRange
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        months={monthsToShow}
        direction="horizontal"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default Calender;
