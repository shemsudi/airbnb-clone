import { useEffect, useRef, useState } from "react";
import GuestType from "../root/guestType";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { getAllHosts } from "../../redux/placeActions";
type ForHowManyGuestProps = {
  isGuestFocused: boolean;
  setIsGuestFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isFocused: boolean;
};

const ForHowManyGuest: React.FC<ForHowManyGuestProps> = ({
  isGuestFocused,
  setIsGuestFocused,
  isFocused,
}) => {
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const state = useSelector((state: RootState) => state.place);
  const dispatch = useAppDispatch();
  const whoModalRef = useRef<HTMLDivElement | null>(null);
  const whoRef = useRef<HTMLDivElement | null>(null);

  const searchHostedPlaces = () => {
    dispatch(getAllHosts({ params: state.params }));
    setIsGuestFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        whoRef.current &&
        !whoRef.current.contains(e.target as Node) &&
        whoModalRef.current &&
        !whoModalRef.current.contains(e.target as Node)
      ) {
        setIsGuestFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [whoRef, whoModalRef]);
  return (
    <>
      <div
        ref={whoRef}
        onClick={() => {
          !isGuestFocused ? setIsGuestFocused(true) : "";
        }}
        className={`flex rounded-full ${
          isGuestFocused ? "bg-white hover:bg-white" : "hover:bg-gray-100 "
        } justify-between group `}
      >
        <div className="flex flex-col pl-6 py-2  ">
          <h1 className="text-sm">Who</h1>
          <input
            className={`search-input ${
              isGuestFocused
                ? "bg-white hover:bg-white"
                : isFocused
                ? "group-hover:bg-gray-100 group/item bg-gray-100 "
                : "group-hover:bg-gray-100 bg-white"
            } `}
            type="text"
            placeholder="Add guests"
            readOnly
            value={`${
              guests.adults + guests.children > 0
                ? guests.adults + guests.children + "guests"
                : "Add guests"
            }   ${
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
    </>
  );
};

export default ForHowManyGuest;
