import { useNavigate, Link } from "react-router-dom";
import items, { ItmeType } from "../../data/items";

const PlacedNavigation = () => {
  const navigate = useNavigate();
  const handleClick = (item: ItmeType) => {
    const queryParams = new URLSearchParams({
      tab_id: "home_tab",
      refinement_paths: "/homes",
      search_mode: "flex_destinations_search",
      flexible_trip_lengths: "one_week",
      location_search: "MIN_MAP_BOUNDS",
      monthly_start_date: "2024-12-01",
      monthly_length: "3",
      monthly_end_date: "2025-03-01",
      price_filter_input_type: "0",
      channel: "EXPLORE",
      date_picker_type: "calendar",
      search_type: "category_change",
      price_filter_num_nights: "5",
      category_tag: `Tag:${item.tag}`, // Assume `item.tag` holds a unique identifier like "5635" for each category.
    });

    // Construct the URL with the query parameters
    navigate(`/?${queryParams.toString()}`);
  };
  return (
    <nav className="w-full px-12 no-scrollbar overflow-x-auto shadow-sm">
      <ul className="pt-2 flex gap-8">
        {items.map((item, index: number) => (
          <li
            className="min-w-max box-border focus:opacity-100 opacity-70  hover:opacity-100   "
            key={index}
          >
            <button
              onClick={() => handleClick(item)}
              className={` flex flex-col  focus:border-black items-center pb-1 border-b-2 border-transparent  hover:border-gray-300`}
            >
              <div>
                <img
                  src={item.image}
                  className="w-6 h-6 "
                  alt={item.name || "item image"}
                />
              </div>

              <span className="text-black">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PlacedNavigation;
