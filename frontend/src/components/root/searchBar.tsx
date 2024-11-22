// import { useState } from "react";

import WhereToSearch from "../searchBar/WhereToSearch";
import WhenToSearch from "../searchBar/WhenToSearch";
import ForHowManyGuest from "../searchBar/ForHowManyGuest";
import { useState } from "react";

interface SearchBarProps {
  selectedOption: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ selectedOption }) => {
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isDatesFocused, setIsDateFocused] = useState(false);
  const [isGuestFocused, setIsGuestFocused] = useState(false);
  const isFocused = isSearchFocused || isDatesFocused || isGuestFocused;
  return (
    <div
      className={` flex justify-between relative   ${
        isFocused ? "group/item bg-gray-100" : "bg-white"
      }  self-center border rounded-full shadow-md max-w-3xl `}
    >
      <WhereToSearch
        isSearchFocused={isSearchFocused}
        setSearchFocused={setSearchFocused}
        isFocused={isFocused}
      />
      <WhenToSearch
        selectedOption={selectedOption}
        isDatesFocused={isDatesFocused}
        setIsDatesFocused={setIsDateFocused}
        isFocused={isFocused}
      />
      <ForHowManyGuest
        isGuestFocused={isGuestFocused}
        setIsGuestFocused={setIsGuestFocused}
        isFocused={isFocused}
      />
    </div>
  );
};

export default SearchBar;
