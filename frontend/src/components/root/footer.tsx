import { NavLink } from "react-router-dom";
import { useMemo } from "react";

const Footer = () => {
  const items = useMemo(
    () => [
      "Camping",
      "Mansions",
      "Islands",
      "OMG!",
      "Caves",
      "Amazing Views",
      "Earth homes",
      "Tiny homes",
      "Grand pianos",
      "Luxe",
    ],
    []
  );

  return (
    <footer className="p-4 bg-gray-200">
      <h1 className="font-bold text-2xl font-sans">
        Inspiration for future getaways
      </h1>
      <ul className="pt-2 flex flex-wrap gap-5">
        {items.map((item, index) => (
          <li
            className="pb-2 min-w-max after:opacity-100 after:border-b-2 after:border-black"
            key={index}
          >
            <NavLink
              to={`/${item.toLowerCase().replace(/\s+/g, "-")}`} // Convert spaces to hyphens for URL safety
              className="text-black"
              aria-label={`Explore ${item}`}
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
