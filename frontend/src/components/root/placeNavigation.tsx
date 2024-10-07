import { NavLink } from "react-router-dom";
import items from "../../data/items";

const PlacedNavigation = () => {
  return (
    <nav className="w-full px-12 no-scrollbar overflow-x-auto shadow-sm">
      <ul className="pt-2 flex gap-8">
        {items.map((item, index: number) => (
          <li
            className="min-w-max box-border opacity-70 hover:opacity-100   "
            key={index}
          >
            <NavLink
              to={item.name}
              className={` flex flex-col focus:border-black items-center pb-1 border-b-2 border-transparent  hover:border-gray-300`}
            >
              <div>
                <img
                  src={item.image}
                  className="w-6 h-6 "
                  alt={item.name || "item image"}
                />
              </div>

              <span className="text-black">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PlacedNavigation;
