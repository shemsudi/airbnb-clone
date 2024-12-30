import { useNavigate } from "react-router-dom";

interface AuthProfileModalProps {
  handleLogout: () => void;
}

const AuthProfileModal: React.FC<AuthProfileModalProps> = ({
  handleLogout,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className="rounded-2xl shadow-lg min-w-max h-auto absolute top-14 right-3 border z-10 bg-white"
      aria-label="Profile menu"
    >
      <ul
        role="menu"
        className="flex flex-col justify-between h-full mt-2 mb-2"
      >
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-200"
          onClick={() => handleNavigation("/release/features")}
        >
          2024 Summer Release Features
        </li>
        <hr />
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-200"
          onClick={() => handleNavigation("/guest/messages")}
        >
          Messages
        </li>
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-200"
          onClick={() => handleNavigation("/trips/v1")}
        >
          Trips
        </li>
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-200"
          onClick={() => handleNavigation("/wishlists")}
        >
          Wishlists
        </li>
        <hr />
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-200"
          onClick={() => handleNavigation("/host/homes")}
        >
          Airbnb Your Home
        </li>
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-200"
          onClick={() => handleNavigation("/account-settings")}
        >
          Account
        </li>
        <hr />
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-200"
          onClick={() => handleNavigation("/giftcards")}
        >
          Gift Cards
        </li>
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-200"
          onClick={() => handleNavigation("/help")}
        >
          Help Center
        </li>
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-slate-50"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default AuthProfileModal;
