// import { useState } from "react";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Region from "./region";
import regionLocation from "../../data/region";
import PlusOrMinus from "../icons/icons/plusOrMinus";
import DatePicker from "./datePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GuestType from "./guestType";
import { RootState, useAppDispatch } from "../../redux/store";
import { setPlaceParams } from "../../redux/PlaceReducer";
import { useSelector } from "react-redux";
import { getAllHosts } from "../../redux/placeActions";
import { SearchParams } from "../../types/types";
interface SearchBarProps {
  selectedOption: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ selectedOption }) => {
  const state = useSelector((state: RootState) => state.place);
  const dispatch = useAppDispatch();
  const [where, setWhere] = useState("");
  const [date, setDate] = useState<string[]>(["", ""]);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [nextMonth, setNextMonth] = useState(0);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isDatesFocused, setIsDatesFocused] = useState(false);
  const [isGuestFocused, setIsGuestFocused] = useState(false);
  const [isCheckInFocused, setIsCheckInFocused] = useState(false);
  const [isCheckOutFocused, setIsCheckOutFocused] = useState(false);
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
  const searchHostedPlaces = async () => {
    await dispatch(
      setPlaceParams({
        ...state.params, // Spreading the current params state instead of using a function
        location_search: where || state.params.location_search,
        monthly_start_date: date[0] || state.params.monthly_start_date,
        monthly_end_date: date[1] || state.params.monthly_end_date,
        category_tag: "Earth homes",
        // guests: {
        //   adults: guests.adults,
        //   children: guests.children,
        //   infants: guests.infants,
        //   pets: guests.pets,
        // },
      })
    );
    dispatch(getAllHosts({ params: state.params }));
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
      className={` flex justify-between relative bg-gray-100 self-center px-5 border rounded-full shadow-md max-w-3xl `}
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
            setIsCheckInFocused(true);
            setIsCheckOutFocused(false);
          }}
          ref={datePickerRef}
          className={`flex group ${
            isCheckInFocused ? "bg-white rounded-full" : "bg-gray-100"
          }`}
        >
          <div className="input-container group hover:bg-white">
            <h1 className="text-sm">Check in</h1>
            <input
              className={`search-input ${
                isCheckInFocused ? "bg-white" : "bg-gray-100"
              } group-hover:bg-white`}
              type="text"
              name="dates"
              value={date[0]}
              placeholder="Add dates"
            />
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
            !isDatesFocused ? setIsDatesFocused(true) : "";
            setIsCheckInFocused(false);
            setIsCheckOutFocused(true);
          }}
          ref={checkOutRef}
          className={`flex group ${
            isCheckOutFocused ? "bg-white rounded-full" : "bg-gray-100"
          }`}
        >
          <div className="input-container group hover:bg-white">
            <h1 className="text-sm">Check out</h1>
            <input
              className={`search-input ${
                isCheckOutFocused ? "bg-white" : "bg-gray-100"
              } group-hover:bg-white`}
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
                isCheckInFocused={isCheckInFocused}
                isCheckOutFocused={isCheckOutFocused}
                setIsCheckOutFocused={setIsCheckOutFocused}
                setIsCheckInFoucused={setIsCheckInFocused}
              />
              <DatePicker
                currentMonth={(currentMonth + nextMonth + 1) % 12}
                currentYear={currentYear}
                setDate={setDate}
                date={date}
                isCheckInFocused={isCheckInFocused}
                isCheckOutFocused={isCheckOutFocused}
                setIsCheckOutFocused={setIsCheckOutFocused}
                setIsCheckInFoucused={setIsCheckInFocused}
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
            value={`${guests.adults + guests.children} guests  ${
              guests.infants > 0 ? "," + guests.infants + " infants" : ""
            }  ${guests.pets > 0 ? "," + guests.pets + " pets" : ""}`}
          />
        </div>
        <div className=" pr-2 self-center">
          <button
            onClick={searchHostedPlaces}
            className="bg-primary rounded-full active:scale-90  p-2 cursor-pointer  flex gap-2  text-white "
          >
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
          className="absolute top-full  mt-1 right-0   w-1/2 z-50 bg-white border  rounded-3xl shadow-lg"
        >
          <div className="px-6  py-8 flex flex-col gap-4 divide-y-2 divide-gray-100">
            <GuestType
              guestType="adults"
              description="Ages 13 or above"
              numberOfGuests={guests.adults}
              setNumberOfGuests={setGuests}
            />
            <GuestType
              guestType="children"
              description="Age 2-12"
              numberOfGuests={guests.children}
              setNumberOfGuests={setGuests}
            />
            <GuestType
              guestType="infants"
              description="Under 2"
              numberOfGuests={guests.infants}
              setNumberOfGuests={setGuests}
            />
            <GuestType
              guestType="pets"
              description="Bringing a service animal?"
              numberOfGuests={guests.pets}
              setNumberOfGuests={setGuests}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
