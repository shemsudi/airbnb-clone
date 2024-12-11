import { useEffect, useState } from "react";
import Logo from "../../assets/logos";
import Options from "./options";
import Search from "./search";
import SearchBar from "./searchBar";
import { Link } from "react-router-dom";
import WorldIcon from "../icons/worldIcon";
import UserProfileMenu from "./userPofileMeu";
import debounce from "lodash/debounce";

const NavBar = () => {
  const [atTop, setAtTop] = useState(true);
  const [selectedOption, setSelectedOption] = useState("stays");

  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollY = window.scrollY;
      setAtTop(currentScrollY === 0);
    }, 40); // Throttle every 200ms

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col z-50 max-md:hidden ">
      <header className="flex px-4 lg:px-12 py-4 justify-between gap-1 items-center">
        <div className="flex">
          <Logo />
          <div className="hidden max-lg:block ">{!atTop && <Search />}</div>
        </div>
        <div className=" max-lg:hidden ">
          {!atTop ? (
            <Search />
          ) : (
            <Options
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          )}
        </div>

        <div className="flex gap-3 items-center">
          <Link to={"host/homes"}>Airbnb your home</Link>
          <WorldIcon />
          <UserProfileMenu />
        </div>
      </header>
      <div className="justify-center p-2 hidden max-lg:flex">
        {atTop && (
          <Options
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        )}
      </div>

      {atTop && (
        <div className="  flex justify-center px-5">
          <SearchBar selectedOption={selectedOption} />
        </div>
      )}

      <div className="mt-3 -z-50">
        <hr />
      </div>
    </div>
  );
};

export default NavBar;
