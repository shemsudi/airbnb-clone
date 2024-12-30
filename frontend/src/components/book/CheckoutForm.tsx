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

  const RETURN_URL = "http://localhost:5173"; // Define constants for easy configuration

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe or Elements not loaded yet. Please try again.");
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage(null);

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: RETURN_URL,
        },
        redirect: "if_required",
      });

      if (result.error) {
        throw new Error(
          result.error.message || "Payment failed. Please try again."
        );
      }

      if (Book?.reservationId) {
        await dispatch(ConfirmPayment({ uuid: Book.reservationId }));
        navigate("/");
      } else {
        throw new Error("No reservation ID found. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
      <PaymentElement />
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      <button
        type="submit"
        className={`mt-4 px-4 py-3 bg-primary w-56 rounded-lg text-white text-xl font-bold ${
          isProcessing ? "cursor-not-allowed opacity-75" : ""
        }`}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing ..." : "Confirm and Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
