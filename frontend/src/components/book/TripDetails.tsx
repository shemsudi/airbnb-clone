import React from "react";

interface TripDetailsProps {
  dates: Date[];
}

const TripDetails: React.FC<TripDetailsProps> = ({ dates }) => {
  console.log(dates);
  const formatDateRange = (startDate: Date, endDate: Date) => {
    // Get the month and year in abbreviated format
    const options: Intl.DateTimeFormatOptions = {
      month: "short", // Abbreviated month (e.g., "Jan")
      day: "numeric", // Day of the month (e.g., 8)
      year: "numeric", // Full year (e.g., 2025)
    };

    const startMonth = startDate.toLocaleDateString("en-US", options);
    const endMonth = endDate.toLocaleDateString("en-US", options);

    // Check if the start and end dates are in the same month
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${startMonth} - ${endDate.getDate()}, ${endDate.getFullYear()}`;
    } else {
      return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}, ${endDate.getFullYear()}`;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-semibold">Your trip</div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="font-medium">Dates</div>
          <div>{formatDateRange(dates[0], dates[1])}</div>
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
