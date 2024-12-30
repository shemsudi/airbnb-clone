import { useEffect, useState } from "react";
import LogoSection from "../NabBar/LogoSection";
import OptionsSection from "../NabBar/SelectedOption";
import NavLinksSection from "../NabBar/NavLinkSection";
import SearchBar from "./searchBar";
import ScrollHandler from "../NabBar/ScrollHandler";

const NavBar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedOption") || "stays"
  );

  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption);
  }, [selectedOption]);

  return (
    <div className="flex flex-col justify-center z-50 max-md:hidden border-b pb-3">
      <header className="flex px-4 lg:px-12 py-4 justify-between gap-1 items-center">
        <LogoSection isAtTop={isAtTop} />
        <OptionsSection
          isAtTop={isAtTop}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <NavLinksSection />
      </header>
      <div className={`justify-center p-2 hidden max-lg:flex`}>
        {isAtTop && (
          <OptionsSection
            isAtTop={isAtTop}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        )}
      </div>

      <div
        className={` ${
          isAtTop
            ? "-translate-y-4 mt-4 z-10  transition-all transform ease-in-out duration-50 flex px-5 justify-center"
            : "transition-all transform ease-in-out  hidden "
        }  `}
      >
        <SearchBar selectedOption={selectedOption} />
      </div>

      <ScrollHandler setIsAtTop={setIsAtTop} />
    </div>
  );
};

export default NavBar;
