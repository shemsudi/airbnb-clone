import { differenceInBusinessDays } from "date-fns";
import { useCallback, useMemo } from "react";

type DatePickerProps = {
  currentMonth: number;
  currentYear: number;
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
  date: string[];
  isCheckInFocused?: boolean;
  isCheckOutFocused?: boolean;
  setIsCheckOutFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCheckInFocused?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DatePicker: React.FC<DatePickerProps> = ({
  currentMonth,
  currentYear,
  setDate,
  date,
  isCheckInFocused,
  isCheckOutFocused,
  setIsCheckOutFocused,
  setIsCheckInFocused,
}) => {
  const getDaysInMonth = useCallback(
    (month: number, year: number) => new Date(year, month + 1, 0).getDate(),
    []
  );

  const getStartDayOfMonth = useCallback(
    (month: number, year: number) => new Date(year, month, 1).getDay(),
    []
  );

  const daysInMonth = useMemo(
    () => getDaysInMonth(currentMonth, currentYear),
    [currentMonth, currentYear, getDaysInMonth]
  );

  const startDay = useMemo(
    () => getStartDayOfMonth(currentMonth, currentYear),
    [currentMonth, currentYear, getStartDayOfMonth]
  );

  const handleDate = useCallback(
    (day: number, month: number, year: number) => {
      const selectedDate = `${year}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      // Helper function for business days comparison
      const isBefore = (start: string, end: string) =>
        differenceInBusinessDays(new Date(start), new Date(end)) > 0;

      const isAfter = (start: string, end: string) =>
        differenceInBusinessDays(new Date(start), new Date(end)) < 0;

      // Handle conditions
      if (date[0] && date[1]) {
        if (isCheckOutFocused && isBefore(date[0], selectedDate)) {
          setDate([selectedDate, date[1]]);
        } else if (isCheckInFocused && isBefore(selectedDate, date[1])) {
          setDate([selectedDate, date[1]]);
        } else {
          setDate([selectedDate, ""]);
        }
      } else if (date[0]) {
        if (isCheckOutFocused && isAfter(date[0], selectedDate)) {
          setDate([date[0], selectedDate]);
        } else if (isCheckInFocused) {
          setDate([selectedDate, date[1]]);
          setIsCheckInFocused?.(false);
          setIsCheckOutFocused?.(true);
        } else {
          setDate([selectedDate, ""]);
        }
      } else if (date[1]) {
        if (isCheckInFocused && isBefore(selectedDate, date[1])) {
          setDate([selectedDate, date[1]]);
        } else if (isCheckOutFocused) {
          setDate([date[0], selectedDate]);
        } else {
          setDate([selectedDate, ""]);
        }
      } else {
        setDate([selectedDate, ""]);
        setIsCheckInFocused?.(false);
        setIsCheckOutFocused?.(true);
      }
    },
    [
      date,
      isCheckInFocused,
      isCheckOutFocused,
      setDate,
      setIsCheckInFocused,
      setIsCheckOutFocused,
    ]
  );

  const isCurrentDayLessThanSelected = useCallback(
    (day: number, year: number, month: number) => {
      const today = new Date();
      const selectedDate = new Date(year, month, day);

      // Compare full date including year, month, and day
      return selectedDate < today;
    },
    []
  );

  const renderCalendar = useMemo(() => {
    const weeks = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = Array(7).fill(null);
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDay) {
          week[j] = null;
        } else if (day > daysInMonth) {
          week[j] = null;
        } else {
          week[j] = day++;
        }
      }
      weeks.push(week);
    }
    return weeks;
  }, [daysInMonth, startDay]);
  const getButtonClasses = useCallback(
    (day: number | null, month: number, year: number) => {
      if (day === null) return ""; // Skip rendering the button if day is null

      const baseClass = "w-full h-full rounded-full";

      // Format the selected date as 'YYYY-MM-DD' for consistent comparison
      const selectedDate = `${year}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      // Check if the selected date matches either the check-in or check-out date
      const isSelected = date.some((d) => d === selectedDate);

      // Disable past dates by comparing against today's date
      const isDisabled = isCurrentDayLessThanSelected(day, year, month);

      return [
        baseClass,
        isDisabled ? "text-gray-300 hover:bg-inherit" : "", // Apply disabled style
        isSelected ? "bg-gray-500" : "", // Apply selected style
        "hover:bg-gray-500", // Hover effect
      ].join(" ");
    },
    [date, isCurrentDayLessThanSelected]
  );

  return (
    <div className="flex flex-col w-full">
      <h1 className="self-center font-bold">
        {new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "long",
        })}{" "}
        {currentYear}
      </h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <th key={day} className="text-gray-500 p-2 border-collapse">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderCalendar.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td key={j} className="p-2 text-center rounded-full">
                  <button
                    className={getButtonClasses(day, currentMonth, currentYear)}
                    onClick={() => handleDate(day, currentMonth, currentYear)}
                    style={{ width: "30px", height: "30px" }}
                    disabled={isCurrentDayLessThanSelected(
                      day,
                      currentYear,
                      currentMonth
                    )}
                  >
                    {day || ""}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatePicker;
