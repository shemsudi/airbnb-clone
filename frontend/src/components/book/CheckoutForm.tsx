import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { ConfirmPayment } from "../../redux/BookActions";

const CheckoutForm = () => {
  const Book = useSelector((state: RootState) => state.book.book);
  console.log(Book);
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsPorcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded yet");
      return;
    }

    setIsPorcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/book/trips",
      },
    });

    if (result.error) {
      console.error("Payment failed:", result.error.message);
    } else {
      dispatch(ConfirmPayment({ uuid: Book?.reservationId! }));
    }
    setIsPorcessing(false);
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      <PaymentElement />
      <button
        onClick={handleSubmit}
        type="submit"
        className="absolute top-full mt-4 px-4 py-3 bg-primary w-56 rounded-lg text-white text-xl font-bold"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing ..." : " Confirm and pay"}
      </button>
    </div>
  );
};

export default CheckoutForm;
