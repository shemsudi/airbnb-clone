import { Link } from "react-router-dom";
interface AuthProfileModalProps {
  handleLogout: () => void;
}

const AuthProfileModal: React.FC<AuthProfileModalProps> = ({
  handleLogout,
}) => {
  return (
    <div
      className={`  rounded-2xl shadow-lg min-w-max h-auto absolute top-14 right-3 border z-10 bg-white`}
    >
      <ul
        role="menu"
        className="flex flex-col justify-between  h-full mt-2 mb-2"
      >
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-500"
        >
          <Link to={"/release/features"}>2024 Summer Realese Features </Link>
        </li>
        <hr />

        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-500"
        >
          <Link to={"/guest/messages"}>messages</Link>
        </li>
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-500"
        >
          <Link to={"/trips/v1"}>trips</Link>
        </li>
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-500"
        >
          <Link to={"/whilsts"}>whilsts</Link>
        </li>
        <hr />
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-500"
        >
          <Link to={"/host/homes"}>Airpnb your home</Link>
        </li>

        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-500"
        >
          <Link to={""}>account</Link>
        </li>

        <li role="menuitem" className="w-full p-3 c">
          {" "}
          <hr />
        </li>
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-500"
        >
          <Link to={"/giftcards"}>Gift Cards</Link>
        </li>

        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-gray-500"
        >
          <Link to={"/help"}> Help Center</Link>
        </li>
        <li
          role="menuitem"
          className="w-full p-3 cursor-pointer hover:bg-slate-50"
          onClick={handleLogout}
        >
          logout
        </li>
      </ul>
    </div>
  );
};

export default AuthProfileModal;
