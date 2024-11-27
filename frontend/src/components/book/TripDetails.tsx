import React from "react";
import { Book } from "../../redux/BookReducer";

interface TripDetailsProps {
  book: Book;
}

const TripDetails: React.FC<TripDetailsProps> = ({ book }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-semibold">Your trip</div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="font-medium">Dates</div>
          <div>Jan 8-13,2025</div>
        </div>
        <div className="underline font-medium">Edit</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="font-medium">Guests</div>
          <div>1 guests</div>
        </div>
        <div className="underline font-medium">Edit</div>
      </div>
    </div>
  );
};

export default TripDetails;
