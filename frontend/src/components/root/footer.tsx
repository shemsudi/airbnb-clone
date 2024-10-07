import { NavLink } from "react-router-dom";

const Footer = () => {
  const items = [
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
  ];

  return (
    <div className="p-4 bg-gray-200">
      <h1 className="font-bold font text-2xl font-sans">
        Inspiration for future getways
      </h1>
      <ul className=" pt-2 flex gap-5">
        {items.map((item, index) => (
          <li
            className={` pb-2 box-border min-w-max after:opacity-100 after:border-b-2 after:border-black `}
            key={index}
          >
            <NavLink to={`/${item}`} className="">
              <span className="text-black">{item}</span>
            </NavLink>
          </li>
        ))}
      </ul>{" "}
    </div>
  );
};

export default Footer;
