type DatePickerProps = {
  currentMonth: number;
  currentYear: number;
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
  date: string[];
  isCheckInFocused: boolean;
  isCheckOutFocused: boolean;
  setIsCheckOutFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCheckInFoucused: React.Dispatch<React.SetStateAction<boolean>>;
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
  const handleDate = (day: number, month: number, year: number) => {
    const selectedDate = `${year}-${month}-${day}`;
    if (isCheckInFocused) {
      setDate([selectedDate, date[1]]);
      setIsCheckInFoucused(false);
      setIsCheckOutFocused(true);
    } else if (isCheckOutFocused) {
      setDate([date[0], selectedDate]);
      setIsCheckInFoucused(false);
      setIsCheckOutFocused(false);
    }
  };

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const startDay = getStartDayOfMonth(currentMonth, currentYear);
  const renderCalendar = () => {
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
  };
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
            {daysOfWeek.map((day) => (
              <th key={day} className=" text-gray-500 p-2 border-collapse">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderCalendar().map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td key={j} className="  p-2  text-center   rounded-full">
                  <button
                    className={`w-full h-full rounded-full active:bg-gray-500 focus:bg-gray-500 hover:bg-gray-500`}
                    onClick={() => handleDate(day, currentMonth, currentYear)}
                    style={{ width: "30px", height: "30px" }}
                  >
                    {day ? day : ""}
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
