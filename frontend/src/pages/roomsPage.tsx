import { RootState, useAppDispatch } from "../redux/store";
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
import { addDays, isSameDay } from "date-fns";
import { useSelector } from "react-redux";

interface RoomsProps {
  reservations?: Reservation[];
  listing: HostedPlaces;
}

const RoomsPage: React.FC<RoomsProps> = ({ reservations, listing }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [guests, setGuests] = useState(1);
  const [showHeader, setShowHeader] = useState(false);
  const [showReserve, setShowReserve] = useState(false);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    if (!reservations) {
      return [];
    }
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const intialDateRange = useMemo(() => {
    let currentDay = new Date();

    // Loop to find the first day not in the disabledDates
    while (disabledDates.some((date) => isSameDay(date, currentDay))) {
      currentDay = addDays(currentDay, 1); // Move to the next day
    }

    // Return the first available day as both start and end date
    return {
      startDate: currentDay,
      endDate: currentDay,
      key: "selection",
    };
  }, [disabledDates]);

  console.log(disabledDates);
  const [days, setDays] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.pricing.nightlyRate);
  const book = useSelector((state: RootState) => state.book.book);
  const intialDates = {
    startDate: new Date(
      book?.startDate ? new Date(book?.startDate) : new Date()
    ),
    endDate: new Date(book?.endDate ? new Date(book?.endDate) : new Date()),
    key: "selection",
  };

  const [dateRange, setDateRange] = useState(intialDates || intialDateRange);

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
        status: "Pending",
        serviceFee: Number((0.15 * totalPrice!).toFixed(2)),
      })
    ).then(() => {
      setIsLoading(false);
      navigate("/book/stays", { state: { uuid: listing.uuid } });
    });
  }, [
    totalPrice,
    dateRange,
    listing.uuid,
    navigate,
    listing.user._id,
    guests,
    dispatch,
  ]);

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
            city={listing.location.city}
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
