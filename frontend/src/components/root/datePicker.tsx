import { useCallback, useMemo } from "react";

type DatePickerProps = {
  currentMonth: number;
  currentYear: number;
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
  date: string[];
  isCheckInFocused?: boolean;
  isCheckOutFocused?: boolean;
  setIsCheckOutFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCheckInFoucused?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DatePicker: React.FC<DatePickerProps> = ({
  currentMonth,
  currentYear,
  setDate,
  date,
  isCheckInFocused,
  isCheckOutFocused,
  setIsCheckOutFocused,
  setIsCheckInFoucused,
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
      const selectedDate = `${year}-${month}-${day}`;
      if (date[0] && date[1] && isCheckOutFocused) {
        setDate([date[0], selectedDate]);
      } else if (isCheckInFocused) {
        setDate([selectedDate, date[1]]);
        setIsCheckInFoucused?.(false);
        setIsCheckOutFocused?.(true);
      } else if (isCheckOutFocused) {
        setDate([date[0], selectedDate]);
        setIsCheckInFoucused?.(false);
        setIsCheckOutFocused?.(false);
      }
    },
    [
      date,
      isCheckInFocused,
      isCheckOutFocused,
      setDate,
      setIsCheckInFoucused,
      setIsCheckOutFocused,
    ]
  );

  const isCurrentDayLessThanSelected = useCallback(
    (day: number, year: number, month: number) => {
      const today = new Date();
      return (
        month === today.getMonth() &&
        year === today.getFullYear() &&
        day < today.getDate()
      );
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
    (day: number) => {
      const baseClass = "w-full h-full rounded-full";
      const isDisabled = isCurrentDayLessThanSelected(
        day,
        currentYear,
        currentMonth
      );
      const isSelected =
        `${currentYear}-${currentMonth}-${day}` === date[0] ||
        `${currentYear}-${currentMonth}-${day}` === date[1];

      return [
        baseClass,
        isDisabled ? "text-gray-300 hover:bg-inherit" : "",
        isSelected ? "bg-gray-500" : "",
        "hover:bg-gray-500",
      ].join(" ");
    },
    [currentYear, currentMonth, date, isCurrentDayLessThanSelected]
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
                    className={getButtonClasses(day)}
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
