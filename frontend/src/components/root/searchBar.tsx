// import { useState } from "react";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Region from "./region";
import regionLocation from "../../data/region";

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
  const inputRef = useRef<HTMLDivElement | null>(null);
  const dateModalRef = useRef<HTMLDivElement | null>(null);
  const guestRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWhere(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
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
          ref={inputRef}
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

      {selectedOption === "stays" ? (
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
      ) : (
        <div
          onClick={() => {
            !isGuestFocused ? setIsGuestFocused(true) : "";
          }}
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
      )}
      {isSearchFocused && (
        <div
          ref={modalRef}
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

      {selectedOption === "stays" && (
        <div
          onClick={() => {
            !isDatesFocused ? setIsDatesFocused(true) : "";
          }}
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
          className="absolute top-full h-10 mt-1 left-0 w-full z-50 bg-white border border-gray-300 rounded-xl shadow-lg"
        ></div>
      )}
      {isGuestFocused && (
        <div
          ref={dateModalRef}
          className="absolute top-full h-10 mt-1 left-0 w-full z-50 bg-white border border-gray-300 rounded-xl shadow-lg"
        ></div>
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
          <button className="bg-primary rounded-full p-2   text-white ">
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
