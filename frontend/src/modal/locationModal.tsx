import React, { ForwardedRef, useEffect, useRef } from "react";
import Region from "../components/root/region";
import regionLocation from "../data/region";

interface LocationModalProps {
  setWhere: (value: string) => void;
  setSearchFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationModal: React.FC<LocationModalProps> = React.forwardRef(
  ({ setWhere, setSearchFocused }, ref: ForwardedRef<HTMLDivElement>) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
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
    );
  }
);

export default LocationModal;
