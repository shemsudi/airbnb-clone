import { Link } from "react-router-dom";
import Logo from "../../assets/logos";
import WorldIcon from "../icons/worldIcon";
import UserProfileMenu from "../root/userPofileMeu";

const AccountHeader = () => {
  return (
    <header className="flex z-20 px-4 lg:px-12 py-4 md:px-8 xl:px-28 justify-between gap-1 items-center border border-b">
      <div className="flex">
        <Logo />
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

export default AccountHeader;
