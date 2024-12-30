import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openDropDown,
  closeDropDown,
  selectModals,
} from "../../redux/ModalReducer.js";
import UserProfileModal from "../../modal/userProfileModal.js";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../redux/store.js";
const UserProfileMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.auth.user?.name);
  const { isDropDownOpen } = useSelector(selectModals);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dispatch(closeDropDown());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const toggleDropdown = () => {
    if (isDropDownOpen) {
      dispatch(closeDropDown());
    } else {
      dispatch(openDropDown());
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className=" border flex gap-3 rounded-3xl p-1 items-center shadow-md"
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        {userName ? (
          <div className="text-white rounded-full flex justify-center items-center p-3 size-8 text-lg bg-black">
            {userName[0]}
          </div>
        ) : (
          <FontAwesomeIcon icon={faUserCircle} className="w-6 h-6" />
        )}
      </button>
      {isDropDownOpen && <UserProfileModal />}
    </div>
  );
};

export default UserProfileMenu;
