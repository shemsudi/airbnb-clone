import { useEffect, useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalenderProps {
  onChange: (value: Range) => void;
  value: Range;
  disabledDates: Date[];
}

const Calender: React.FC<CalenderProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  const [monthsToShow, setMonthsToShow] = useState(2);

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
    <div>
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
