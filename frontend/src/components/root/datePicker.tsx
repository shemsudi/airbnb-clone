type DatePickerProps = {
  currentMonth: number;
  currentYear: number;
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
  date: string[];
};

const DatePicker: React.FC<DatePickerProps> = ({
  currentMonth,
  currentYear,
  setDate,
  date,
}) => {
  const handleDate = (day: number, year: number, month: number) => {
    const newDate = new Date(year, month, day);
    const formattedDate = newDate
      .toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      })
      .replace(" ", "-");
    if (date.length < 2) {
      setDate([...date, formattedDate]);
    } else {
      setDate([date[0], formattedDate]);
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
                    className="w-full h-full rounded-full focus:bg-gray-500 hover:bg-gray-500 "
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
