// import { useSearchParams } from "react-router-dom";
import items, { ItemType } from "../../data/items";
import { RootState, useAppDispatch } from "../../redux/store";
import { setPlaceParams } from "../../redux/PlaceReducer";
import { useSelector } from "react-redux";
import { getAllListings } from "../../redux/placeActions";
import CategoryBox from "./CategoryBox";

const PlacedNavigation = () => {
  const params = useSelector((state: RootState) => state.place.params);
  const dispatch = useAppDispatch();
  // const [searchParams, setSearchParams] = useSearchParams();
  const previousCategory = params.category_tag;

  const handleClick = (item: ItemType) => {
    if (previousCategory === item.name) return;
    const updatedParams = {
      ...params,
      category_tag: item.category,
      item_tag: item.tag,
    };
    dispatch(setPlaceParams(updatedParams));

    // setSearchParams(updatedParams);

    dispatch(getAllListings({ params: updatedParams }));
  };
  return (
    <nav className=" flex ml-10 px-2 no-scrollbar overflow-x-auto shadow-sm">
      {items.map((item, index: number) => (
        <CategoryBox
          key={index}
          item={item}
          selected={params.item_tag === item.tag}
          handleClick={() => handleClick(item)}
        />
      ))}
    </nav>
  );
};

export default PlacedNavigation;
