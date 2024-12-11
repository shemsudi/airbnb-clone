import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageIcon from "../icons/icons/messageIcon";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import HeartIcon from "../icons/icons/heartIcon";
import SearchIcon from "../icons/searchIcon";
import HomeIcon from "../icons/homeIcon";
import FooterItem from "./FooterItem"; // Import the new component

const MdScreenFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 hidden max-md:flex justify-between bg-white px-10 py-2 shadow-lg">
      <FooterItem icon={<SearchIcon />} label="Explore" />
      <FooterItem icon={<HeartIcon />} label="Wishlists" />
      <FooterItem icon={<HomeIcon />} label="Trips" />
      <FooterItem icon={<MessageIcon />} label="Messages" />
      <FooterItem
        icon={<FontAwesomeIcon icon={faUserCircle} className="w-6 h-6" />}
        label="Profile"
      />
    </div>
  );
};

export default MdScreenFooter;
