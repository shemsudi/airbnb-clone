import { Link } from "react-router-dom";
import WorldIcon from "../icons/worldIcon";
import UserProfileMenu from "../root/userPofileMeu";

const NavLinksSection = () => {
  return (
    <div className="flex gap-3 items-center">
      <Link to={"host/homes"}>Airbnb your home</Link>
      <WorldIcon />
      <UserProfileMenu />
    </div>
  );
};

export default NavLinksSection;
