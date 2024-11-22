import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";
import { getHostById } from "../redux/placeActions";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Footer from "../components/hosthomes/footer";
import NavigationHeader from "../components/rooms/NavigateHeader";
import RoomsHeader from "../components/rooms/roomsHeader";
import ReservationBox from "../components/rooms/reservationBox";
import Amenities from "../components/rooms/amenities";
import Rating from "../components/rooms/Rating";
import LocationOfPlace from "../components/rooms/LocationOfPlace";
import MeetYourHost from "../components/rooms/MeetYourHost";
import ThingsToKnow from "../components/rooms/ThingsToKnow";
import HomeIcon from "../components/icons/homeIcon";

import GallerySection from "../components/rooms/GallerySection";
import RoomDetails from "../components/rooms/RoomDetails";
import HostInfo from "../components/rooms/HostInfo";
import KeyFeatures from "../components/rooms/keyFeatures";
import SleepingArrangement from "../components/rooms/sleepingArrangment";
import DateSelection from "../components/rooms/DateSelection";
import ReviewsSection from "../components/rooms/ReviewSection";

const Rooms = () => {
  const dispatch = useAppDispatch();
  const { uuid } = useParams();
  const [date, setDate] = useState(["", ""]);
  const [showHeader, setShowHeader] = useState(false);
  const [showReserve, setShowReserve] = useState(false);

  const rooms = useSelector((state: RootState) => state.place.rooms);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const features = [
    {
      icon: <HomeIcon />,
      title: "Room in a bed and breakfast",
      description: "Your own room in a home, plus access to shared spaces.",
    },
    {
      icon: <HomeIcon />,
      title: "50-min drive to Nairobi National Park",
      description: "This home is near the national park.",
    },
    {
      icon: <HomeIcon />,
      title: "Dive right in",
      description: "This is one of the few places in the area with a pool.",
    },
  ];
  const navigate = useNavigate();
  const GoToBookingPage = () => {
    navigate("/book/stays", { state: uuid });
  };

  useEffect(() => {
    if (uuid) {
      dispatch(getHostById({ uuid }));
    }
  }, [uuid, dispatch]);

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
    <div className="flex flex-col h-auto">
      {showHeader && (
        <NavigationHeader
          nightlyRate={pricing?.nightlyRate}
          showReserve={showReserve}
          GoToBookingPage={GoToBookingPage}
        />
      )}
      <RoomsHeader />
      <hr />

      <GallerySection
        photos={photos!}
        setShowHeader={setShowHeader}
        title={title!}
        structure={structure!}
      />

      <div className="flex mx-4 md:mx-8 xl:mx-28 gap-5 mt-5">
        <div className="w-3/5 flex flex-col mb-5">
          <RoomDetails
            city={location?.city}
            country={location?.country}
            bedrooms={bedrooms}
            beds={beds}
            bathrooms={bathrooms}
            reviewCount={1} // Replace with a dynamic value if available
          />
          <hr />
          <HostInfo
            photoUrl={rooms?.photos?.[0]}
            hostName={rooms?.user.firstName!}
            hostingDuration="9 years hosting"
          />
          <hr />
          <KeyFeatures features={features} />
          <hr />
          <div className="py-6">
            Some info has been automatically translated.{" "}
            <button className="underline cursor-pointer">Show original</button>
          </div>
          <div className="flex flex-col mb-8">
            <h1 className="text-2xl font-semibold mb-4">About this place</h1>
            <p className="font-roboto">{description}</p>
          </div>
          <hr />
          <SleepingArrangement bedrooms={3} bedType="1 double bed" />

          <hr />
          <Amenities />
          <hr />
          <DateSelection
            currentMonth={currentMonth}
            currentYear={currentYear}
            setDate={setDate}
            date={date}
            minStay={2}
          />
        </div>

        <div className="relative w-2/5 mx-4 xl:mx-10 pb-10">
          <ReservationBox
            GoToBookingPage={GoToBookingPage}
            setShowReserve={setShowReserve}
            pricing={pricing}
          />
        </div>
      </div>

      <hr className="mx-32" />
      <Rating />
      <hr id="reviews" className="mx-32" />
      <ReviewsSection />

      <hr className="mx-32" />
      <div id="location">
        <LocationOfPlace location={rooms?.location!} />
      </div>

      <hr className="mx-32" />
      <MeetYourHost hoster={rooms?.user.firstName!} />
      <hr />
      <ThingsToKnow />
      <Footer />
    </div>
  );
};

export default Rooms;
