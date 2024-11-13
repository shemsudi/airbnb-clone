// import { useState } from "react";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Region from "./region";
import regionLocation from "../../data/region";
import PlusOrMinus from "../icons/icons/plusOrMinus";

interface SearchBarProps {
  selectedOption: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ selectedOption }) => {
  const [where, setWhere] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isDatesFocused, setIsDatesFocused] = useState(false);
  const [isGuestFocused, setIsGuestFocused] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalRef2 = useRef<HTMLDivElement | null>(null);
  const modalRef3 = useRef<HTMLDivElement | null>(null);

  const inputRef = useRef<HTMLDivElement | null>(null);
  const dateModalRef = useRef<HTMLDivElement | null>(null);
  const guestRef = useRef<HTMLDivElement | null>(null);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

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

    for (let i = 0; i < 5; i++) {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWhere(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
      if (
        dateModalRef.current &&
        !dateModalRef.current.contains(event.target as Node) &&
        modalRef2.current &&
        !modalRef2.current.contains(event.target as Node)
      ) {
        setIsDatesFocused(false);
      }
      if (
        guestRef.current &&
        !guestRef.current.contains(event.target as Node) &&
        modalRef3.current &&
        !modalRef3.current.contains(event.target as Node)
      ) {
        setIsGuestFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={` flex justify-between relative self-center px-5 border rounded-full shadow-md max-w-3xl `}
    >
      <div className="flex group">
        <div
          ref={modalRef}
          onClick={() => {
            !isSearchFocused ? setSearchFocused(true) : "";
          }}
          className="input-container  group  hover:bg-gray-100"
        >
          <h1 className="text-sm">Where</h1>
          <input
            className="search-input group-hover:bg-gray-100"
            type="text"
            placeholder="serach destination"
            value={where}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="border-r-2 my-3 group-hover:border-none"></div>
      </div>
      {isSearchFocused && (
        <div
          ref={inputRef}
          className="absolute top-full mt-1 left-0 w-3/5 z-50 bg-white border border-gray-300 rounded-xl shadow-lg"
        >
          <div className="p-8 w-full">
            <h1 className="font-semibold mb-3">Search by region</h1>

            <div className="grid grid-cols-3 gap-3">
              {regionLocation.map((location, index) => (
                <Region
                  value={location.value}
                  setWhere={setWhere}
                  key={index}
                  region={location.region}
                  imageUrl={location.imageUrl}
                  setSearchFocused={setSearchFocused}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedOption === "stays" ? (
        <div
          onClick={() => {
            !isDatesFocused ? setIsDatesFocused(true) : "";
          }}
          ref={modalRef2}
          className="flex group"
        >
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
            !isDatesFocused ? setIsDatesFocused(true) : "";
          }}
          ref={modalRef2}
          className="flex group"
        >
          <div className="input-container group hover:bg-gray-100">
            <h1 className="text-sm">Check out</h1>
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
      {isDatesFocused && (
        <div
          ref={dateModalRef}
          // className="absolute top-full  mt-1 left-0 overflow-y-scroll w-full z-50 bg-white border border-gray-300 rounded-3xl shadow-lg"
          className="absolute top-full  mt-1 left-0 overflow-y-scroll  w-full z-50 bg-white border border-gray-300 rounded-xl shadow-lg"
        >
          <div className="p-6 w-full flex flex-col ">
            <div className="self-center flex justify-between gap-4 bg-gray-300 border px-2 py-1  rounded-full">
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
            <div className="grid grid-cols-2 grid-rows-1 gap-8 w-full h-80 mt-6">
              <div className="flex flex-col w-full">
                <h1 className="self-center font-bold">
                  {new Date(currentYear, currentMonth).toLocaleString(
                    "default",
                    { month: "long" }
                  )}{" "}
                  {currentYear}
                </h1>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      {daysOfWeek.map((day) => (
                        <th
                          key={day}
                          className=" text-gray-500 h-10 px-2 py-1 border-collapse"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {renderCalendar().map((week, i) => (
                      <tr key={i}>
                        {week.map((day, j) => (
                          <td
                            key={j}
                            className="w-auto h-12 px-2 py-1 text-center hover:border rounded-full  hover:border-black "
                          >
                            {day ? day : ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col w-full">
                <h1 className="self-center font-bold">
                  {new Date(currentYear, currentMonth).toLocaleString(
                    "default",
                    { month: "long" }
                  )}{" "}
                  {currentYear}
                </h1>
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      {daysOfWeek.map((day) => (
                        <th
                          key={day}
                          className="text-gray-500 h-10 px-2 py-1 text-center"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {renderCalendar().map((week, i) => (
                      <tr key={i}>
                        {week.map((day, j) => (
                          <td
                            key={j}
                            className=" w-auto h-12 px-2 py-1 text-center hover:border rounded-full  hover:border-black"
                          >
                            {day ? day : ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-3">
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
          </div>{" "}
        </div>
      )}

      <div
        ref={guestRef}
        onClick={() => {
          !isGuestFocused ? setIsGuestFocused(true) : "";
        }}
        className="flex rounded-full justify-between group hover:bg-gray-100 "
      >
        <div className="flex flex-col pl-6 py-2  ">
          <h1 className="text-sm">Who</h1>
          <input
            className="search-input group-hover:bg-gray-100"
            type="text"
            placeholder="Add guests"
          />
        </div>
        <div className=" pr-2 self-center">
          <button className="bg-primary rounded-full p-2  flex gap-2  text-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            {isGuestFocused && "Search"}
          </button>
        </div>
      </div>
      {isGuestFocused && (
        <div
          ref={modalRef3}
          className="absolute top-full  mt-1 left-0 overflow-y-scroll w-full z-50 bg-white border border-gray-300 rounded-3xl shadow-lg"
        ></div>
      )}
    </div>
  );
};

export default SearchBar;
