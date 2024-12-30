import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import PlusOrMinus from "../icons/icons/plusOrMinus";
import DatePicker from "../root/datePicker";

type DatesToSearchProps = {
  selectedOption: string;
  isDatesFocused: boolean;
  setIsDatesFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isFocused: boolean;
  date: string[];
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
};

const DatesToSearch: React.FC<DatesToSearchProps> = ({
  selectedOption,
  isDatesFocused,
  setIsDatesFocused,
  isFocused,
  date,
  setDate,
}) => {
  const [nextMonth, setNextMonth] = useState(0);
  const [isCheckInFocused, setIsCheckInFocused] = useState(false);
  const [isCheckOutFocused, setIsCheckOutFocused] = useState(false);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const checkInRef = useRef<HTMLDivElement | null>(null);
  const checkOutRef = useRef<HTMLDivElement | null>(null);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(e.target as Node) &&
        checkInRef.current &&
        !checkInRef.current.contains(e.target as Node) &&
        checkOutRef.current &&
        !checkOutRef.current.contains(e.target as Node)
      ) {
        setIsDatesFocused(false);
        setIsCheckInFocused(false);
        setIsCheckOutFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDatesFocused]);

  return (
    <>
      {selectedOption === "stays" ? (
        <div
          onClick={() => {
            if (!isDatesFocused) {
              setIsDatesFocused(true);
            }
            setIsCheckInFocused(true);
            setIsCheckOutFocused(false);
          }}
          ref={datePickerRef}
          className={`flex group ${
            isCheckInFocused
              ? "bg-white hover:bg-white rounded-full"
              : "hover:bg-gray-100 rounded-full"
          }`}
        >
          <div className="input-container rounded-full group ">
            <h1 className="text-sm">Check in</h1>
            <div className="flex gap-2 items-center mr-2">
              <input
                className={`search-input ${
                  isCheckInFocused
                    ? "group bg-white hover:bg-white"
                    : isFocused
                    ? "group-hover:bg-gray-100 group/item bg-gray-100 "
                    : "group-hover:bg-gray-100 bg-white"
                } `}
                type="text"
                name="dates"
                value={date[0]}
                placeholder="Add dates"
                onChange={(e) =>
                  setDate({
                    ...date,
                    [1]: e.target.value,
                  })
                }
              />
              {isCheckInFocused && date[0] && (
                <FontAwesomeIcon
                  onClick={() => setDate(["", date[1]])}
                  className="hover:cursor-pointer"
                  icon={faClose}
                />
              )}
            </div>
          </div>
          <div
            className={`border-r-2 my-3 ${
              isCheckInFocused ? "border-none" : ""
            } group-hover:border-none`}
          ></div>
        </div>
      ) : (
        <div className="flex group">
          <div className="input-container group hover:bg-gray-100">
            <h1 className="text-sm">Check in</h1>
            <input
              className="search-input group-hover:bg-gray-100"
              type="text"
              name="dates"
              placeholder="Add dates"
            />
          </div>
          <div className="border-r-2 my-3 group-hover:border-none"></div>
        </div>
      )}

      {selectedOption === "stays" && (
        <div
          onClick={() => {
            if (!isDatesFocused) {
              setIsDatesFocused(true);
            }
            setIsCheckInFocused(false);
            setIsCheckOutFocused(true);
          }}
          ref={checkOutRef}
          className={`flex group ${
            isCheckOutFocused
              ? "bg-white hover:bg-white rounded-full"
              : "hover:bg-gray-100 rounded-full"
          }`}
        >
          <div className="input-container box-content group rounded-full">
            <h1 className="text-sm">Check out</h1>
            <div className="flex gap-2 items-center mr-2">
              <input
                className={`search-input ${
                  isCheckOutFocused
                    ? "bg-white hover:bg-white rounded-full"
                    : isFocused
                    ? "group-hover:bg-gray-100 group/item bg-gray-100 "
                    : "group-hover:bg-gray-100 bg-white"
                } `}
                type="text"
                name="dates"
                value={date[1]}
                placeholder="Add dates"
                onChange={(e) =>
                  setDate((prevDate) => {
                    const newDate = [...prevDate];
                    newDate[0] = e.target.value;
                    return newDate;
                  })
                }
              />
              {isCheckOutFocused && date[1] && (
                <FontAwesomeIcon
                  onClick={() => setDate([date[0], ""])}
                  className="hover:cursor-pointer"
                  icon={faClose}
                />
              )}
            </div>
          </div>
          <div className="border-r-2 my-3 group-hover:border-none"></div>
        </div>
      )}
      {isDatesFocused && (
        <div
          ref={checkInRef}
          className="absolute top-full mt-1 left-0 w-full z-50 bg-white border border-gray-300 rounded-xl shadow-lg"
        >
          <div className="p-6 w-full flex flex-col overflow-y-scroll">
            <div className="self-center flex justify-between gap-4 bg-gray-300 border px-2 py-1 rounded-full">
              <button className="rounded-full focus:bg-white px-3">
                Dates
              </button>
              <button className="rounded-full focus:bg-white px-3">
                Months
              </button>
              <button className="rounded-full focus:bg-white px-3">
                Flexible
              </button>
            </div>
            <div className="grid relative grid-cols-2 grid-rows-2 gap-8 w-full h-80 mt-6">
              {/** Add this calculation here */}
              {(() => {
                const yearOffset = Math.floor((currentMonth + nextMonth) / 12);
                const displayedYear = currentYear + yearOffset;
                const displayedMonth = (currentMonth + nextMonth) % 12;
                return (
                  <>
                    <DatePicker
                      currentMonth={displayedMonth}
                      currentYear={displayedYear}
                      setDate={setDate}
                      date={date}
                      isCheckInFocused={isCheckInFocused}
                      isCheckOutFocused={isCheckOutFocused}
                      setIsCheckOutFocused={setIsCheckOutFocused}
                      setIsCheckInFocused={setIsCheckInFocused}
                    />
                    <DatePicker
                      currentMonth={(displayedMonth + 1) % 12}
                      currentYear={
                        displayedMonth === 11
                          ? displayedYear + 1
                          : displayedYear
                      }
                      setDate={setDate}
                      date={date}
                      isCheckInFocused={isCheckInFocused}
                      isCheckOutFocused={isCheckOutFocused}
                      setIsCheckOutFocused={setIsCheckOutFocused}
                      setIsCheckInFocused={setIsCheckInFocused}
                    />
                  </>
                );
              })()}
              {nextMonth !== 11 && (
                <button
                  onClick={() => setNextMonth((prev) => prev + 1)}
                  className="absolute top-1 right-2"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
              {nextMonth !== 0 && (
                <button
                  onClick={() => setNextMonth((prev) => prev - 1)}
                  className="absolute top-1 left-2"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
              )}
            </div>
            <div className="flex gap-3 mt-10">
              <button className="px-4 py-2 rounded-full text-sm  border border-gray-300 ">
                Exact dates
              </button>
              <button className="px-4 py-2 rounded-full  text-sm border flex items-center border-gray-300 ">
                <PlusOrMinus />1 day
              </button>
              <button className="px-4 py-2 rounded-full text-sm  border flex items-center border-gray-300 ">
                <PlusOrMinus />2 days
              </button>
              <button className="px-4 py-2 rounded-full text-sm  border flex items-center border-gray-300 ">
                <PlusOrMinus />3 days
              </button>
              <button className="px-4 py-2 rounded-full text-sm  border flex items-center border-gray-300 ">
                <PlusOrMinus />7 days
              </button>
              <button className="px-4 py-2 rounded-full text-sm  border flex items-center border-gray-300 ">
                <PlusOrMinus />
                14 days
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DatesToSearch;
