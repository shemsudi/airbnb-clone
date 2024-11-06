import Search from "./search";
import UserProfileMenu from "../../components/root/userPofileMeu";
import SearchBar from "./searchBar";
import Logo from "../../assets/logos";
import { Link } from "react-router-dom";
import { useState } from "react";
import Options from "./options";
import WorldIcon from "../icons/worldIcon";
import FilterIcon from "../icons/icons/filterIcon";
import SearchIcon from "../icons/searchIcon";

interface HeaderProps {
  atTop: boolean;
}
const Header: React.FC<HeaderProps> = ({ atTop }) => {
  const [selectedOption, setSelectedOption] = useState("stays");

  return (
    <>
      <div className="flex flex-col z-50 max-md:hidden">
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
            <div className="flex">
              <Link to={"host/homes"}>Airbnb your home</Link>
            </div>
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
          <div className=" flex justify-center px-5">
            <SearchBar selectedOption={selectedOption} />
          </div>
        )}

        <div className="mt-3 -z-50">
          <hr />
        </div>
      </div>

      <div className=" hidden max-md:flex mx-10 my-4 p-2 gap-3 ">
        <button className=" border flex-grow rounded-full p-2 flex items-center gap-3">
          <SearchIcon />
          <div className="flex flex-col items-start">
            <h1 className="font-roboto">Where to?</h1>
            <p className="text-gray-500">Anywhere . Any week . Add guests</p>
          </div>
        </button>
        <div className=" w-16 flex justify-center items-center rounded-full  border">
          <FilterIcon />
        </div>
      </div>
    </>
  );
};

export default Header;
