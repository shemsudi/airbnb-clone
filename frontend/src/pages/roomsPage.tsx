import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";

import Footer from "../components/hosthomes/footer";
import NavigationHeader from "../components/rooms/NavigateHeader";
import RoomsHeader from "../components/rooms/roomsHeader";
import ReservationBox from "../components/rooms/reservationBox";
import Amenities from "../components/rooms/amenities";
import Rating from "../components/rooms/Rating";
import LocationOfPlace from "../components/rooms/LocationOfPlace";
import MeetYourHost from "../components/rooms/MeetYourHost";
import ThingsToKnow from "../components/rooms/ThingsToKnow";

import GallerySection from "../components/rooms/GallerySection";
import RoomDetails from "../components/rooms/RoomDetails";
import HostInfo from "../components/rooms/HostInfo";
import KeyFeatures from "../components/rooms/keyFeatures";
import SleepingArrangement from "../components/rooms/sleepingArrangment";
// import DateSelection from "../components/rooms/DateSelection";
import ReviewsSection from "../components/rooms/ReviewSection";
import { BookPlace } from "../redux/BookActions";
import { HostedPlaces, Reservation } from "../types/types";
import { features } from "../data/types";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import Calender from "../components/rooms/ReservationDates";

const intialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface RoomsProps {
  reservations?: Reservation[];
  listing: HostedPlaces;
}

const RoomsPage: React.FC<RoomsProps> = ({ reservations = [], listing }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [guests, setGuests] = useState(1);
  const [showHeader, setShowHeader] = useState(false);
  const [showReserve, setShowReserve] = useState(false);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);
  const [days, setDays] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.pricing.nightlyRate);
  const [dateRange, setDateRange] = useState(intialDateRange);

  const onCreateReservation = useCallback(() => {
    setIsLoading(true);
    dispatch(
      BookPlace({
        userId: listing?.user._id,
        reservationId: listing.uuid,
        guests: guests,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalAmount: totalPrice,
        serviceFee: 0.15 * totalPrice!,
      })
    ).then(() => {
      setIsLoading(false);
      navigate("/book/stays");
    });
  }, [totalPrice, dateRange, listing.uuid, navigate, listing.user._id]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      setDays(dayCount);
      if (dayCount && listing.pricing.nightlyRate) {
        setTotalPrice((dayCount + 1) * listing.pricing.nightlyRate);
      } else {
        setTotalPrice(listing.pricing.nightlyRate);
      }
    }
  }, [dateRange, listing.pricing.nightlyRate]);
  return (
    <div className="flex flex-col h-auto">
      {showHeader && (
        <NavigationHeader
          nightlyRate={listing.pricing.nightlyRate}
          showReserve={showReserve}
          GoToBookingPage={onCreateReservation}
        />
      )}
      <RoomsHeader />
      <hr />

      <GallerySection
        photos={listing.photos}
        setShowHeader={setShowHeader}
        title={listing.title}
        structure={listing.structure}
      />

      <div className="flex mx-4 md:mx-8 xl:mx-28 gap-5 mt-5">
        <div className="w-3/5 flex flex-col mb-5">
          <RoomDetails
            country={listing.location.country}
            bedrooms={listing.bedrooms}
            beds={listing.beds}
            bathrooms={listing.bathrooms}
            reviewCount={1} // Replace with a dynamic value if available
          />
          <hr />
          <HostInfo
            photoUrl={listing.photos[0]}
            hostName={listing.user.firstName!}
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
            <p className="font-roboto">{listing.description}</p>
          </div>
          <hr />
          <SleepingArrangement bedrooms={3} bedType="1 double bed" />
          <hr />
          <Amenities />
          <hr />
          <Calender
            disabledDates={disabledDates}
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />
        </div>

        <div className="relative w-2/5 mx-4 xl:mx-10 pb-10">
          <ReservationBox
            totalPrice={totalPrice!}
            days={days + 1}
            dateRange={dateRange}
            GoToBookingPage={onCreateReservation}
            setShowReserve={setShowReserve}
            pricing={listing.pricing}
          />
        </div>
      </div>

      <hr className="mx-32" />
      <Rating />
      <hr id="reviews" className="mx-32" />
      <ReviewsSection />

      <hr className="mx-32" />
      <div id="location">
        <LocationOfPlace location={listing.location!} />
      </div>

      <hr className="mx-32" />
      <MeetYourHost hoster={listing.user.firstName!} />
      <hr />
      <ThingsToKnow />
      <Footer />
    </div>
  );
};

export default RoomsPage;
