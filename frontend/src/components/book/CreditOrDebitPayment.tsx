import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState, useMemo } from "react";
import api from "../../configs/api";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CreditCard = ({ totalFee }: { totalFee: number }) => {
  const isLoading = useSelector((state: RootState) => state.place.loading);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Memoize the stripe promise to avoid unnecessary re-renders
  const stripePromise = useMemo(
    () => loadStripe(import.meta.env.VITE_PUBLISH_KEY || ""),
    []
  );

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!totalFee) return;

      try {
        const amount = Math.ceil(Number(totalFee.toFixed(2)) * 100);
        const response = await api.post("/create-payment-intent", {
          amount,
          currency: "usd",
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setError("Error fetching payment details. Please try again.");
        console.error("Error fetching client secret:", error);
      }
    };

    if (!isLoading) {
      fetchClientSecret();
    }
  }, [totalFee, isLoading]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!stripePromise || !clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default CreditCard;
