import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
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
        return_url: "http://localhost:5173/",
      },
    });

    if (result.error) {
      console.error("Payment failed:", result.error.message);
    } else {
      console.log("Payment succeeded:", result);
    }
    setIsPorcessing(false);
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      <PaymentElement />
      <hr />
      <div className="flex flex-col gap-4">
        <div className=" text-2xl font-medium ">Required for your trip</div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="font-semibold">Profile photo</div>
            <div>Hosts want to know who’s staying at their place.</div>
          </div>
          <div className="px-3  py-1 border border-black  rounded-lg font-medium">
            Add
          </div>
        </div>{" "}
      </div>
      <hr />
      <div className="flex flex-col gap-5">
        <div className=" text-2xl font-medium ">Cancellation policy</div>
        <div>
          <span className="font-bold">Free cancellation before Dec 9.</span>{" "}
          Cancel before Jan 1 for a partial refund. <br />
          <span className="underline cursor-pointer ">Learn more</span>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-5">
        <div className=" text-2xl font-medium ">Ground rules</div>
        <p className="font-roboto">
          We ask every guest to remember a few simple things about what makes a
          great guest.
        </p>
        <ul className="list-disc pl-5 font-roboto ">
          <li>Follow the house rules</li>
          <li>Treat your Host’s home like your own</li>
        </ul>
      </div>
      <hr />
      <div className="flex flex-col gap-6 ">
        <div className="text-sm">
          By selecting the button below, I agree to the{" "}
          <span className="underline font-medium">Host's House Rules,</span>
          <span className="underline font-medium">Ground rules for guests</span>
          ,
          <span className="underline font-medium">
            Airbnb's Rebooking and Refund Policy
          </span>
          , and that Airbnb can{" "}
          <span className="underline font-medium">
            charge my payment method
          </span>{" "}
          if I’m responsible for damage.
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="px-4 py-3 bg-primary w-56 rounded-lg text-white text-xl font-bold"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing ..." : " Confirm and pay"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
