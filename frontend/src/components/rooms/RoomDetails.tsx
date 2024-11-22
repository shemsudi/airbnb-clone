import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface RoomDetailsProps {
  city?: string;
  country?: string;
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
  reviewCount?: number;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({
  city,
  country,
  bedrooms,
  beds,
  bathrooms,
  reviewCount = 0,
}) => (
  <div className="flex flex-col mb-5">
    <h1 className="text-2xl font-bold">
      Room in {city}, {country}
    </h1>
    <p className="font-roboto">
      {bedrooms} bedrooms · {beds} double beds · {bathrooms} bathroom
    </p>
    <div>
      <FontAwesomeIcon icon={faStar} /> {reviewCount} review
      {reviewCount !== 1 ? "s" : ""}
    </div>
  </div>
);

export default RoomDetails;
