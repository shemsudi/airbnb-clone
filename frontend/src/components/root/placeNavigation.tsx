import { useSearchParams } from "react-router-dom";
import items, { ItmeType } from "../../data/items";
import { RootState, useAppDispatch } from "../../redux/store";
import { setPlaceParams } from "../../redux/PlaceReducer";
import { useSelector } from "react-redux";
import { getAllListings } from "../../redux/placeActions";

const PlacedNavigation = () => {
  const params = useSelector((state: RootState) => state.place.params);
  const dispatch = useAppDispatch();
  let [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (item: ItmeType) => {
    const updatedParams = { ...params, category_tag: item.name };
    dispatch(setPlaceParams(updatedParams));

    setSearchParams(updatedParams);

    dispatch(getAllListings({ params: updatedParams }));
  };
  return (
    <nav className=" ml-10 px-2 no-scrollbar overflow-x-auto shadow-sm">
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
