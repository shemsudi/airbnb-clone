type DateProps = {
  day: number;
  currentMonth: number;
  currentYear: number;
  handleDate: (day: number, month: number, year: number) => void;
};

const OneDate: React.FC<DateProps> = ({
  handleDate,
  day,
  currentMonth,
  currentYear,
}) => {
  return (
    <td className="  p-2  text-center   rounded-full">
      <button
        className={`w-full h-full rounded-full active:bg-gray-500 focus:bg-gray-500 hover:bg-gray-500`}
        onClick={() => handleDate(day, currentMonth, currentYear)}
      >
        {day ? day : ""}
      </button>
    </td>
  );
};

export default OneDate;
