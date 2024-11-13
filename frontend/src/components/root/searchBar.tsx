// import { useState } from "react";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Region from "./region";
import regionLocation from "../../data/region";
import PlusOrMinus from "../icons/icons/plusOrMinus";
import DatePicker from "./datePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
interface SearchBarProps {
  selectedOption: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ selectedOption }) => {
  const [where, setWhere] = useState("");
  const [date, setDate] = useState<string[]>([]);
  const [guests, setGuests] = useState("");
  const [nextMonth, setNextMonth] = useState(0);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isDatesFocused, setIsDatesFocused] = useState(false);
  const [isGuestFocused, setIsGuestFocused] = useState(false);
  const whereModalRef = useRef<HTMLDivElement | null>(null);
  const datePickerRef = useRef<HTMLDivElement | null>(null);
  const whoModalRef = useRef<HTMLDivElement | null>(null);

  const whereRef = useRef<HTMLDivElement | null>(null);
  const checkInRef = useRef<HTMLDivElement | null>(null);
  const checkOutRef = useRef<HTMLDivElement | null>(null);
  const whoRef = useRef<HTMLDivElement | null>(null);
  console.log(date);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWhere(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        whereRef.current &&
        !whereRef.current.contains(event.target as Node) &&
        whereModalRef.current &&
        !whereModalRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
      if (
        checkInRef.current &&
        !checkInRef.current.contains(event.target as Node) &&
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node) &&
        checkOutRef.current &&
        !checkOutRef.current.contains(event.target as Node)
      ) {
        setIsDatesFocused(false);
      }
      if (
        whoRef.current &&
        !whoRef.current.contains(event.target as Node) &&
        whoModalRef.current &&
        !whoModalRef.current.contains(event.target as Node)
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
          ref={whereModalRef}
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
          ref={whereRef}
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
          ref={datePickerRef}
          className="flex group"
        >
          <div className="input-container group hover:bg-gray-100">
            <h1 className="text-sm">Check in</h1>
            <input
              className="search-input group-hover:bg-gray-100"
              type="text"
              name="dates"
              value={date[0]}
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
          ref={checkOutRef}
          className="flex group"
        >
          <div className="input-container group hover:bg-gray-100">
            <h1 className="text-sm">Check out</h1>
            <input
              className="search-input group-hover:bg-gray-100"
              type="text"
              name="dates"
              value={date[1]}
              placeholder="Add dates"
            />
          </div>
          <div className="border-r-2 my-3 group-hover:border-none"></div>
        </div>
      )}
      {isDatesFocused && (
        <div
          ref={checkInRef}
          className="absolute top-full  mt-1 left-0    w-full z-50 bg-white border border-gray-300 rounded-xl shadow-lg"
        >
          <div className="p-6 w-full flex flex-col  overflow-y-scroll ">
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
            <div className="grid relative grid-cols-2 grid-rows-2 gap-8 w-full h-80 mt-6">
              <DatePicker
                currentMonth={(currentMonth + nextMonth) % 12}
                currentYear={currentYear}
                setDate={setDate}
                date={date}
              />
              <DatePicker
                currentMonth={(currentMonth + nextMonth + 1) % 12}
                currentYear={currentYear}
                setDate={setDate}
                date={date}
              />
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

      <div
        ref={whoRef}
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
          ref={whoModalRef}
          className="absolute top-full  mt-1 left-0 overflow-y-scroll w-full z-50 bg-white border border-gray-300 rounded-3xl shadow-lg"
        ></div>
      )}
    </div>
  );
};

export default SearchBar;
