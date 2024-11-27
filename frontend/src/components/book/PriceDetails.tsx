import React from "react";
import { Pricing } from "../../types/types";
import { Book } from "../../redux/BookReducer";

type PriceDetailsProps = {
  book: Book;
  price: Pricing;
  days: number;
};

const PriceDetails: React.FC<PriceDetailsProps> = ({ price, days, book }) => {
  const cleaningFee = 12;
  const costFee = book?.totalAmount;
  const serviceFee = 0.15 * book?.totalAmount!;
  const TotalFee = cleaningFee + costFee! + serviceFee;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-medium text-2xl">Price details</h1>
      <div className="flex justify-between items-center">
        <div className="font-medium">
          $ {price?.nightlyRate} * {days + 1} nights{" "}
        </div>
        <div>$ {costFee}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="underline font-meidum">Cleaning fee</div>
        <div>${cleaningFee}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="underline font-meidum">Airbnb service fee</div>
        <div>${serviceFee}</div>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div className="font-medium text-xl ">Total(EUR)</div>
        <div className="font-medium">$ {TotalFee}</div>
      </div>
    </div>
  );
};

export default PriceDetails;
