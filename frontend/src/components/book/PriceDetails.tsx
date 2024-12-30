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
  const costFee = book?.totalAmount ?? 0; // Fallback to 0 if `totalAmount` is not available
  const serviceFee = 0.15 * (costFee || 0); // Ensure we don't multiply `null` or `undefined`

  // Calculate TotalFee
  const totalFee = cleaningFee + costFee + serviceFee;

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-medium text-2xl">Price details</h1>
      <div className="flex justify-between items-center">
        <div className="font-medium">
          {formatCurrency(price?.nightlyRate || 0)} * {days + 1} nights
        </div>
        <div>{formatCurrency(costFee)}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="underline font-medium">Cleaning fee</div>
        <div>{formatCurrency(cleaningFee)}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="underline font-medium">Airbnb service fee</div>
        <div>{formatCurrency(serviceFee)}</div>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div className="font-medium text-xl">Total (EUR)</div>
        <div className="font-medium">{formatCurrency(totalFee)}</div>
      </div>
    </div>
  );
};

export default PriceDetails;
