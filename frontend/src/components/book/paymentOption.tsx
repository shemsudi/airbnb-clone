import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface PaymentOptionProps {
  selectedPaymentOption: string;
  setSelectedPaymentOption: (option: string) => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  selectedPaymentOption,
  setSelectedPaymentOption,
}) => {
  const book = useSelector((state: RootState) => state.book.book);

  // Safe destructuring with fallback values
  const totalAmount = book?.totalAmount ?? 0;
  const serviceFee = book?.serviceFee ?? 0;

  // Calculate the total amount for the full payment option
  const fullPaymentAmount = totalAmount + serviceFee + 12;

  const paymentOptions = [
    {
      value: "fullPayment",
      label: `Pay $${fullPaymentAmount} now`,
      description: "",
    },
    {
      value: "partialPayment",
      label: "Pay part now, part later",
      description:
        "€ 1,059.02 due today, € 822.00 on Dec 24, 2024. No extra fees. ",
      extraInfo: "More info",
    },
  ];

  // Reusable label component rendering
  const renderLabel = (option: (typeof paymentOptions)[0]) => (
    <label
      className={`border p-3 rounded-lg font-medium flex justify-between items-center ${
        selectedPaymentOption === option.value ? "border-black" : ""
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="font-medium">{option.label}</div>
        {option.description && (
          <div className="font-normal text-sm">
            {option.description}{" "}
            {option.extraInfo && (
              <span className="underline font-medium cursor-pointer">
                {option.extraInfo}
              </span>
            )}
          </div>
        )}
      </div>
      <input
        type="radio"
        name="paymentOption"
        className="accent-black h-5 w-5"
        value={option.value}
        checked={selectedPaymentOption === option.value}
        onChange={(e) => setSelectedPaymentOption(e.target.value)}
      />
    </label>
  );

  return (
    <div className="rounded-lg border">
      {paymentOptions.map((option) => renderLabel(option))}
    </div>
  );
};

export default PaymentOption;
