import { ChangeEvent, useEffect, useRef, useState } from "react";
import RegionModal from "../../modal/RegionModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

type PlacesToSearchProps = {
  isSearchFocused: boolean;
  setSearchFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isFocused: boolean;
  setWhere: React.Dispatch<React.SetStateAction<string>>;
  where: string;
};

const PlacesToSearch: React.FC<PlacesToSearchProps> = ({
  isSearchFocused,
  setSearchFocused,
  isFocused,
  where,
  setWhere,
}) => {
  const [result, setResult] = useState<any[]>([]);

  const whereRef = useRef<HTMLDivElement>(null);
  const whereModalRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!isSearchFocused) {
      setSearchFocused(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWhere(e.target.value);
  };

  // Fetch suggestions from Nominatim API
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (where.trim() === "") {
        setResult([]);
        return;
      }
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            where
          )}&format=json&addressdetails=1&limit=5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from Nominatim");
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setResult([]);
      }
    };
    fetchSuggestions();
  }, [where]);

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
  }, [setSearchFocused]);

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
            placeholder="Search destination"
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
          {result.length > 0 ? (
            <ul>
              {result.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setWhere(item.display_name);
                    setSearchFocused(false);
                  }}
                  className="cursor-pointer px-4 py-2 flex items-center gap-4 hover:bg-gray-100"
                >
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="p-4 rounded-lg size-7 bg-neutral-200 text-neutral-600"
                  />
                  <div>{item.display_name}</div>
                </li>
              ))}
            </ul>
          ) : (
            <RegionModal
              setWhere={setWhere}
              setSearchFocused={setSearchFocused}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PlacesToSearch;
