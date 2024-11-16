import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";
import { getHostById } from "../redux/placeActions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Footer from "../components/hosthomes/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import HomeIcon from "../components/icons/homeIcon";
import HouseIcon from "../components/icons/houseIcon";
import RoomsHeader from "../components/rooms/roomsHeader";
import RoomGallery from "../components/rooms/roomsGallery";
import ReservationBox from "../components/rooms/reservationBox";
import Amenities from "../components/rooms/amenities";

const Rooms = () => {
  const dispatch = useAppDispatch();
  let { uuid } = useParams();
  useEffect(() => {
    if (uuid) {
      dispatch(getHostById({ uuid }));
    }
  }, [uuid, dispatch]);
  const rooms = useSelector((state: RootState) => state.place.rooms);

  const {
    title,
    photos,
    structure,
    location,
    bedrooms,
    beds,
    bathrooms,
    description,
    pricing,
  } = rooms || {};

  return (
    <div className="flex flex-col h-auto ">
      <RoomsHeader />
      <hr />
      <div className="felx flex-col w-full">
        <div className="flex justify-between md:px-8 xl:px-28 pt-6 pb-4 ">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div className="flex gap-5">
            <span>share</span>
            <span>save</span>
          </div>
        </div>

        <RoomGallery photos={photos} structure={structure} />
      </div>
      <div className="flex md:px-8 xl:px-28 gap-5 mt-5">
        <div className="w-3/5  flex flex-col mb-5">
          <div className="flex flex-col mb-5  ">
            <h1 className="text-2xl font-bold">
              Room in {location?.city} , {location?.country}
            </h1>
            <p className="font-roboto">
              {bedrooms} bedrooms . {beds} double beds .{bathrooms} bathroom
            </p>
            <div>
              <FontAwesomeIcon icon={faStar} /> 1 review
            </div>
          </div>
          <hr />
          <div className="flex gap-5 py-4 items-center ">
            <img
              src={rooms?.photos![0]}
              alt="Profile"
              className="h-10 w-10 object-cover rounded-full"
            />
            <div className="flex flex-col gap-0">
              <h2 className="font-semibold">Hosted by susan</h2>
              <p className="text-gray-600">9 years hosting</p>
            </div>
          </div>
          <hr />
          <div className="flex flex-col items-start gap-4 py-4">
            <div className="flex items-center gap-8 p-2">
              <div>
                <HomeIcon />
              </div>
              <div className="flex flex-col">
                <h1 className="font-semibold">Room in a bed and breakfast</h1>
                <p className="text-gray-600">
                  Your own room in a home, plus access to shared spaces.
                </p>
              </div>
            </div>
            <div className="flex  items-center gap-8 p-2">
              <div>
                <HomeIcon />
              </div>
              <div className="flex flex-col">
                <h1 className="font-semibold">
                  50-min drive to Nairobi National Park
                </h1>
                <p className="text-gray-600">
                  This home is near the national park.
                </p>{" "}
              </div>
            </div>
            <div className="flex  items-center gap-8 p-2">
              <div>
                <HomeIcon />
              </div>
              <div className="flex flex-col">
                <h1 className="font-semibold">Dive right in</h1>
                <p className="text-gray-600">
                  This is one of the few places in the area with a pool.
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="py-6 ">
            Some info has been automatically translated.{" "}
            <button className="underline cursor-pointer">Show original</button>
          </div>
          <div className="flex flex-col mb-8">
            <h1 className="text-2xl font-semibold mb-4">About this place</h1>
            <p className="font-roboto">
              {description}We are a B&B with tastefully done ensuite bedrooms &
              luxurious bed linen. All rooms have wifi and cable TV. Our
              lounges, swimming pool, barbeque area and quiet gardens are a
              great place for you to relax. From the dining service you can
              order delicious meals.
            </p>
          </div>
          <hr />
          <div className="flex flex-col my-8  w-full">
            <h1 className="text-2xl font-bold">Where you'll sleep</h1>
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="flex flex-col  p-4 border rounded-lg border-gray-600">
                <HouseIcon />
                <h1 className="text-xl font-semibold">Bedroom 1</h1>
                <h2>1 doubled bed</h2>
              </div>
              <div className="flex flex-col p-4 border rounded-lg border-gray-600">
                <HouseIcon />
                <h1 className="text-xl font-semibold">Bedroom 2</h1>
                <h2>1 doubled bed</h2>
              </div>
              <div className="flex flex-col p-4 border rounded-lg border-gray-600">
                <HouseIcon />
                <h1 className="text-xl font-semibold">Bedroom 3</h1>
                <h2>1 doubled bed</h2>
              </div>
            </div>
          </div>
          <hr />

          <div className="my-8 flex flex-col w-full">
            <h1 className="text-2xl font-semibold">What this place offers</h1>
            <Amenities />
          </div>
          <hr />
        </div>

        <div className="relative w-2/5 px-10 pb-10">
          <div className="flex flex-col h-full">
            <ReservationBox pricing={pricing} />
          </div>
        </div>
      </div>
      <div className=" bg-[#F7F7F7]   ">
        <Footer />
      </div>{" "}
    </div>
  );
};
export default Rooms;
