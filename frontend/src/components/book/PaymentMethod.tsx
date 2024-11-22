import React from "react";

interface PaymentMethodProps {
  paymentType: string;
  setPaymentType: (type: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentType,
  setPaymentType,
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
    <div className="border rounded-lg w-full">
      <select
        id="paymentMethod"
        name="paymentMethod"
        className="w-full p-3 bg-white border-none focus:outline-none"
        onChange={(e) => setPaymentType(e.target.value)}
      >
        <option value="CreditCard" selected>
          Credit or Debit Card
        </option>
        <option value="Cartes">Cartes Bancaires</option>
        <option value="PayPal">PayPal</option>
        <option value="ApplePay">Apple Pay</option>
        <option value="iDEAL">iDEAL</option>
        <option value="GooglePay">Google Pay</option>
      </select>
    </div>
    {paymentType === "CreditCard" && <div>Credit Card</div>}
    {paymentType === "Cartes" && <div>Cartes Bancaires</div>}
    {paymentType === "PayPal" && <div>PayPal</div>}
    {paymentType === "ApplePay" && <div>Apple Pay</div>}
    {paymentType === "iDEAL" && <div>iDEAL</div>}
    {paymentType === "GooglePay" && <div>Google Pay</div>}
  </div>
);

export default PaymentMethod;
