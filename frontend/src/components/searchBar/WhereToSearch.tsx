import { ChangeEvent, useEffect, useRef, useState } from "react";
import RegionModal from "../../modal/RegionModal";

type PlacesToSearchProps = {
  isSearchFocused: boolean;
  setSearchFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isFocused: boolean;
};

const PlacesToSearch: React.FC<PlacesToSearchProps> = ({
  isSearchFocused,
  setSearchFocused,
  isFocused,
}) => {
  const [where, setWhere] = useState("");
  const whereRef = useRef<HTMLDivElement>(null);
  const whereModalRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    !isSearchFocused ? setSearchFocused(true) : "";
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWhere(e.target.value);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        whereRef.current &&
        !whereRef.current.contains(e.target as Node) &&
        whereModalRef.current &&
        !whereModalRef.current.contains(e.target as Node)
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
    <>
      <div className="flex group">
        <div
          ref={whereModalRef}
          onClick={handleClick}
          className={`input-container ${
            isSearchFocused
              ? "bg-white hover:bg-white"
              : "group-hover:bg-gray-100"
          }  `}
        >
          <h1 className="text-sm">Where</h1>
          <input
            className={`search-input ${
              isSearchFocused
                ? "group bg-white hover:bg-white"
                : isFocused
                ? "group-hover:bg-gray-100 group/item bg-gray-100 "
                : "group-hover:bg-gray-100 bg-white"
            }`}
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
          <RegionModal
            setWhere={setWhere}
            setSearchFocused={setSearchFocused}
          />
        </div>
      )}
    </>
  );
};

export default PlacesToSearch;
