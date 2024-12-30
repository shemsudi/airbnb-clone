import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NavigationHeaderProps = {
  nightlyRate: number | undefined;
  showReserve: boolean;
  GoToBookingPage: () => void;
};

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  nightlyRate,
  showReserve,
  GoToBookingPage,
}) => {
  return (
    <div className="fixed top-0 left-0 z-10 flex right-0 bg-white shadow-md  ">
      <div className="flex px-4 md:px-8 xl:px-24 justify-between w-full items-center">
        <div className="flex  gap-2">
          <span
            onClick={() =>
              document
                .getElementById("photos")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="cursor-pointer p-4 hover:border-b-2 hover:border-b-black border-border"
          >
            Photos
          </span>
          <span
            onClick={() =>
              document
                .getElementById("amenities")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="cursor-pointer p-4 hover:border-b-2 hover:border-b-black border-border"
          >
            Amenities
          </span>
          <span
            onClick={() =>
              document
                .getElementById("reviews")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="cursor-pointer p-4 hover:border-b-2 hover:border-b-black border-border"
          >
            Reviews
          </span>
          <span
            onClick={() =>
              document
                .getElementById("location")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="cursor-pointer  p-4 hover:border-b-2 hover:border-b-black border-border"
          >
            Location
          </span>
        </div>
        {showReserve && (
          <div className="hidden md:flex gap-3   p-3">
            <div className="flex flex-col gap-2 items-start justify-center">
              <div className="flex gap-2 items-center">
                <span className="font-bold">$ {nightlyRate}</span>
                night
              </div>
              <div className="flex gap-1 items-center">
                <FontAwesomeIcon icon={faStar} className="w-2.5 h-2.5" />
                <span className="font-bold text-sm">4.95</span>
                <small className="text-gray-600">162 reviews</small>
              </div>
            </div>

            <button
              onClick={GoToBookingPage}
              className="rounded-lg p-3 text-white font-bold bg-primary w-40"
            >
              Reserve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationHeader;
