import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";
import { getListingById, getReservationsByPlace } from "../redux/placeActions";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RoomsPage from "./roomsPage";

const Rooms = () => {
  const { uuid } = useParams();
  const dispatch = useAppDispatch();
  const listing = useSelector((state: RootState) => state.place.rooms);
  const reservations = useSelector(
    (state: RootState) => state.place.reservations
  );
  // console.log(listing);
  // console.log(reservations);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (uuid) {
      setIsLoading(true);
      dispatch(getListingById({ uuid }));
      dispatch(getReservationsByPlace({ uuid }));
    }
  }, [uuid, dispatch]);

  useEffect(() => {
    if (listing) {
      setIsLoading(false);
    }
  }, [listing]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return <RoomsPage listing={listing} reservations={reservations} />;
};

export default Rooms;
