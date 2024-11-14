import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";
import { getHostById } from "../redux/placeActions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import Footer from "../components/hosthomes/footer";
import LastFooter from "../components/hosthomes/lastFooter";
import Logo from "../assets/logos";
import Search from "../components/root/search";
import { Link } from "react-router-dom";
import WorldIcon from "../components/icons/worldIcon";
import UserProfileMenu from "../components/root/userPofileMeu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import HomeIcon from "../components/icons/homeIcon";
import HouseIcon from "../components/icons/houseIcon";

const Rooms = () => {
  const dispatch = useAppDispatch();
  let { uuid } = useParams();
  useEffect(() => {
    if (uuid) {
      dispatch(getHostById({ uuid }));
    }
  }, [uuid, dispatch]);
  const rooms = useSelector((state: RootState) => state.place.rooms);

  return (
    <div className="flex flex-col h-auto ">
      <header className="flex px-4 lg:px-12 py-4 md:px-8 xl:px-28 justify-between gap-1 items-center">
        <div className="flex">
          <Logo />
          <div className="hidden max-lg:block ">
            <Search />
          </div>
        </div>
        <div className=" max-lg:hidden ">
          <Search />
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex">
            <Link to={"host/homes"}>Airbnb your home</Link>
          </div>
          <WorldIcon />
          <UserProfileMenu />
        </div>
      </header>
      <hr />
      <div className="felx flex-col w-full">
        <div className="flex justify-between md:px-8 xl:px-28 pt-6 pb-4 ">
          <h1 className="text-3xl font-semibold">{rooms?.title}</h1>
          <div className="flex gap-5">
            <span>share</span>
            <span>save</span>
          </div>
        </div>

        <div className="grid md:px-8 xl:px-28 h-80 w-full gap-2 rounded-xl mb-5  grid-cols-4 grid-rows-2">
          <div className="w-full h-full col-span-2 row-span-2 rounded-t-full">
            <img
              src={rooms?.photos![0]}
              alt={rooms?.structure}
              className="w-full h-full object-cover rounded-s-lg"
            />
          </div>
          <div className="w-full h-full">
            <img
              src={rooms?.photos![1]}
              alt={rooms?.structure}
              className="w-full h-full object-cover "
            />
          </div>
          <div className="w-full h-full">
            <img
              src={rooms?.photos![2]}
              alt={rooms?.structure}
              className="w-full h-full object-cover rounded-tr-lg"
            />
          </div>
          <div className="w-full h-full">
            <img
              src={rooms?.photos![3]}
              alt={rooms?.structure}
              className="w-full h-full object-cover "
            />
          </div>
          <div className="w-full h-full">
            <img
              src={rooms?.photos![4]}
              alt={rooms?.structure}
              className="w-full h-full object-cover rounded-br-lg"
            />
          </div>
        </div>
      </div>
      <div className="flex md:px-8 xl:px-28 gap-5 mt-5">
        <div className="w-3/5  flex flex-col mb-5">
          <div className="flex flex-col mb-5  ">
            <h1 className="text-2xl font-bold">
              Room in {rooms?.location.city} , {rooms?.location.country}
            </h1>
            <p className="font-roboto">
              {rooms?.bedrooms} bedrooms . {rooms?.beds} double beds .
              {rooms?.bathrooms} bathroom
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
              {rooms?.description}We are a B&B with tastefully done ensuite
              bedrooms & luxurious bed linen. All rooms have wifi and cable TV.
              Our lounges, swimming pool, barbeque area and quiet gardens are a
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
            <div className="flex gap-5 w-full mt-5">
              <div className="w-1/2 gap-3 flex flex-col">
                <div className="flex gap-2 items-center ">
                  <HouseIcon />
                  <h1
                    className={`${
                      rooms?.amenities![0] === "Wifi" ? "line-through" : ""
                    }`}
                  >
                    Wifi
                  </h1>
                </div>
                <div className="flex gap-2 items-center ">
                  <HouseIcon />
                  <h1>Pool</h1>
                </div>
                <div className="flex gap-2 items-center ">
                  <HouseIcon />
                  <h1>Luggage dropoff allowed</h1>
                </div>
                <div className="flex gap-2 items-center ">
                  <HouseIcon />
                  <h1>Long term stays allowed</h1>
                </div>
                <div className="flex gap-2 items-center ">
                  <HouseIcon />
                  <h1>Carbon monoxide alarm</h1>
                </div>
              </div>
              <div className="w-1/2 gap-3 flex flex-col">
                <div className="flex gap-2 items-center ">
                  <HouseIcon />
                  <h1
                    className={`${
                      rooms?.amenities![0] === "Wifi" ? "line-through" : ""
                    }`}
                  >
                    Free parking on premises
                  </h1>
                </div>
                <div className="flex gap-2 items-center ">
                  <HouseIcon />
                  <h1>TV with standard cable</h1>
                </div>
                <div className="flex gap-2 items-center ">
                  <HouseIcon />
                  <h1>Breakfast</h1>
                </div>
                <div className="flex gap-2 items-center ">
                  <HouseIcon />
                  <h1>Lock on bedroom door</h1>
                </div>
                <div className="flex gap-2 items-center ">
                  <HouseIcon />
                  <h1>Smoke alarm</h1>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className="w-2/5 "></div>
      </div>
      <div className=" bg-[#F7F7F7]   ">
        <Footer />
      </div>{" "}
    </div>
  );
};
export default Rooms;
