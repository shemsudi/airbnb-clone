import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import api from "../../configs/api";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CreditCard = ({ totalFee }: { totalFee: number }) => {
  const isLoading = useSelector((state: RootState) => state.place.loading);
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublishableKey = async () => {
      try {
        const response = await api.get("/config");
        setStripePromise(loadStripe(response.data.publishableKey));
      } catch (error) {
        console.error("Error fetching publishable key:", error);
      }
    };

    fetchPublishableKey();
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const amount = Math.ceil(Number(totalFee.toFixed(2)));
        console.log(amount, totalFee); // Ensure two decimals and round up
        const response = await api.post("/create-payment-intent", {
          amount: amount * 100,
          currency: "usd",
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [isLoading, totalFee]);

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
