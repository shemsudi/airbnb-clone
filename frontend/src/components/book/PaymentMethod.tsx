import React, { useMemo } from "react";
import CreditCard from "./CreditOrDebitPayment";

interface PaymentMethodProps {
  paymentType: string;
  setPaymentType: (type: string) => void;
  totalFee: number;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentType,
  setPaymentType,
  totalFee,
}) => {
  // Define available payment methods
  const paymentMethods = useMemo(
    () => [
      {
        value: "CreditCard",
        label: "Credit or Debit Card",
        component: <CreditCard totalFee={totalFee} />,
      },
      {
        value: "Cartes",
        label: "Cartes Bancaires",
        component: <div>Cartes Bancaires</div>,
      },
      { value: "PayPal", label: "PayPal", component: <div>PayPal</div> },
      {
        value: "ApplePay",
        label: "Apple Pay",
        component: <div>Apple Pay</div>,
      },
      { value: "iDEAL", label: "iDEAL", component: <div>iDEAL</div> },
      {
        value: "GooglePay",
        label: "Google Pay",
        component: <div>Google Pay</div>,
      },
    ],
    [totalFee]
  );

  // Find the component for the selected payment type
  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.value === paymentType
  )?.component;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
      <div className="border rounded-lg w-full">
        <select
          id="paymentMethod"
          name="paymentMethod"
          className="w-full p-3 bg-white border-none focus:outline-none"
          onChange={(e) => setPaymentType(e.target.value)}
          defaultValue="CreditCard"
        >
          {paymentMethods.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {selectedPaymentMethod && (
        <div className="flex flex-col mt-6">{selectedPaymentMethod}</div>
      )}
    </div>
  );
};

export default PaymentMethod;
