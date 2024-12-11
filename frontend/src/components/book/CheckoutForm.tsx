import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { ConfirmPayment } from "../../redux/BookActions";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const Book = useSelector((state: RootState) => state.book.book);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe or Elements not loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null); // Clear previous error messages
    console.log("i'm here");
    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173",
        },
        redirect: "if_required",
      })
      .then(async (result) => {
        if (result.error) {
          setErrorMessage(
            result.error.message || "Payment failed. Please try again."
          );
          return;
        }
        console.log("Payment succeeded");
        await dispatch(ConfirmPayment({ uuid: Book?.reservationId! }));
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.message || "Payment failed. Please try again.");
      });
    console.log("i'm here again");

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
      <PaymentElement />
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      <button
        type="submit"
        className="absolute top-full mt-4 px-4 py-3 bg-primary w-56 rounded-lg text-white text-xl font-bold"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing ..." : "Confirm and Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
