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
import HeartIcon from "../icons/icons/heartIcon";
import MessageIcon from "../icons/icons/messageIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

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

      <div className=" hidden max-md:flex mx-10 my-4 p-2 gap-3  border-b-2">
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
      <div className="fixed bottom-0 left-0 right-0 hidden max-md:flex justify-between bg-white px-10 shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
            <SearchIcon />
          </button>
          <p className="text-sm">Explore</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
            <HeartIcon />
          </button>
          <p className="text-sm">Whilsts</p>
        </div>
        <div className="flex flex-colitems-center justify-center ">
          <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-label="Airbnb homepage"
              role="img"
              focusable="false"
              className="w-7 h-7"
            >
              <path d="M16 1c2 0 3.46.96 4.75 3.27l.53 1.02a424.58 424.58 0 0 1 7.1 14.84l.15.35c.67 1.6.9 2.48.96 3.4v.41l.01.23c0 4.06-2.88 6.48-6.36 6.48-2.22 0-4.55-1.26-6.7-3.39l-.26-.26-.17-.17h-.02l-.17.18c-2.05 2.1-4.27 3.42-6.42 3.62l-.28.01-.26.01c-3.48 0-6.36-2.42-6.36-6.48v-.47c.03-.93.23-1.77.83-3.24l.22-.53c.97-2.3 6.08-12.98 7.7-16.03C12.55 1.96 14 1 16 1zm0 2c-1.24 0-2.05.54-2.99 2.21l-.44 1a422.57 422.57 0 0 0-7.03 14.7l-.35.84a6.86 6.86 0 0 0-.6 2.24l-.01.33v.2C4.5 27.4 6.41 29 8.86 29c1.77 0 3.87-1.24 5.83-3.35-2.3-2.94-3.86-6.45-3.86-8.91 0-2.92 1.94-5.39 5.18-5.42 3.22.03 5.16 2.5 5.16 5.42 0 2.45-1.56 5.96-3.86 8.9 1.97 2.13 4.06 3.36 5.83 3.36 2.45 0 4.36-1.6 4.36-4.48v-.4a7.07 7.07 0 0 0-.72-2.63l-.25-.6C25.47 18.41 20.54 8.12 19 5.23 18.05 3.53 17.24 3 16 3zm.01 10.32c-2.01.02-3.18 1.51-3.18 3.42 0 1.8 1.18 4.58 2.96 7.04l.2.29.18-.24c1.73-2.38 2.9-5.06 3-6.87v-.22c0-1.9-1.17-3.4-3.16-3.42z"></path>
            </svg>
          </button>
          <p className="text-sm">Trips</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
            <MessageIcon />
          </button>
          <p className="text-sm">Messages</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
            <FontAwesomeIcon icon={faUserCircle} className="w-6 h-6" />
          </button>
          <p className="text-sm">Profile</p>
        </div>
      </div>
    </>
  );
};

export default Header;
