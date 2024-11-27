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
  return (
    <div className="rounded-lg border">
      <label
        className={`border p-3 rounded-t-lg font-medium flex justify-between items-center ${
          selectedPaymentOption === "fullPayment" ? "border-black" : ""
        }`}
      >
        <div>Pay $ {book?.totalAmount! + book?.serviceFee! + 12} now</div>
        <input
          type="radio"
          name="paymentOption"
          className="accent-black h-5 w-5"
          value="fullPayment"
          checked={selectedPaymentOption === "fullPayment"}
          onChange={(e) => setSelectedPaymentOption(e.target.value)}
        />
      </label>
      <label
        className={`border p-3 rounded-b-lg font-medium flex justify-between items-center ${
          selectedPaymentOption === "partialPayment" ? "border-black" : ""
        }`}
      >
        <div className="flex flex-col gap-2">
          <div className="font-medium">Pay part now, part later</div>
          <div className="font-normal text-sm">
            € 1,059.02 due today, € 822.00 on Dec 24, 2024. No extra fees.{" "}
            <span className="underline font-medium cursor-pointer">
              More info
            </span>
          </div>
        </div>
        <input
          type="radio"
          name="paymentOption"
          className="accent-black h-5 w-5"
          value="partialPayment"
          checked={selectedPaymentOption === "partialPayment"}
          onChange={(e) => setSelectedPaymentOption(e.target.value)}
        />
      </label>
    </div>
  );
};

export default PaymentOption;
