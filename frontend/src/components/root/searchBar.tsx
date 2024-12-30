import { useState, useEffect } from "react";
import WhereToSearch from "../searchBar/WhereToSearch";
import WhenToSearch from "../searchBar/WhenToSearch";
import ForHowManyGuest from "../searchBar/ForHowManyGuest";

interface SearchBarProps {
  selectedOption: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ selectedOption }) => {
  const [isSearchFocused, setSearchFocused] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isSearchFocused") || "false")
  );
  const [isDatesFocused, setIsDateFocused] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isDatesFocused") || "false")
  );
  const [isGuestFocused, setIsGuestFocused] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isGuestFocused") || "false")
  );
  const [where, setWhere] = useState("");
  const [dates, setDates] = useState(["", ""]);

  const isFocused = isSearchFocused || isDatesFocused || isGuestFocused;

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem("isSearchFocused", JSON.stringify(isSearchFocused));
  }, [isSearchFocused]);

  useEffect(() => {
    localStorage.setItem("isDatesFocused", JSON.stringify(isDatesFocused));
  }, [isDatesFocused]);

  useEffect(() => {
    localStorage.setItem("isGuestFocused", JSON.stringify(isGuestFocused));
  }, [isGuestFocused]);

  return (
    <div
      className={`flex justify-between relative ${
        isFocused ? "group/item bg-gray-100" : "bg-white"
      } self-center border rounded-full shadow-md max-w-3xl`}
    >
      <WhereToSearch
        isSearchFocused={isSearchFocused}
        setSearchFocused={setSearchFocused}
        isFocused={isFocused}
        where={where}
        setWhere={setWhere}
      />
      <WhenToSearch
        date={dates}
        setDate={setDates}
        selectedOption={selectedOption}
        isDatesFocused={isDatesFocused}
        setIsDatesFocused={setIsDateFocused}
        isFocused={isFocused}
      />
      <ForHowManyGuest
        isGuestFocused={isGuestFocused}
        setIsGuestFocused={setIsGuestFocused}
        isFocused={isFocused}
        dates={dates}
        where={where}
      />
    </div>
  );
};

export default SearchBar;
