import { Link } from "react-router-dom";
import Logo from "../../assets/logos";
import Search from "../root/search";
import WorldIcon from "../icons/worldIcon";
import UserProfileMenu from "../root/userPofileMeu";

const RoomsHeader = () => {
  return (
    <header className="flex px-4 lg:px-12 py-4 md:px-8 xl:px-28 justify-between gap-1 items-center">
      <div className="flex">
        <Logo />
        <div className="hidden max-md:hidden max-lg:block ">
          <Search />
        </div>
      </div>
      <div className=" block max-lg:hidden ">
        <Search />
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex">
          <Link to={"host/homes"}>Airbnb your home</Link>
        </div>
        <WorldIcon />
        <UserProfileMenu />
      </div>
    </header>
  );
};

export default RoomsHeader;
