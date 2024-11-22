import { useEffect, useState } from "react";
import LastFooter from "../components/hosthomes/lastFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import BookingHeader from "../components/book/BookHeader";
import PaymentOption from "../components/book/paymentOption";
import PaymentMethod from "../components/book/PaymentMethod";
import TripDetails from "../components/book/TripDetails";
import PriceDetails from "../components/book/PriceDetails";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getHostById } from "../redux/placeActions";

const BookingPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const uuid = location.state;
  const rooms = useSelector((state: RootState) => state.place.rooms);
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState("fullPayment");

  const [paymentType, setPaymentType] = useState("CreditCard");

  const totalFee = rooms?.pricing.nightlyRate! * 1.15 + 12;

  useEffect(() => {
    dispatch(getHostById({ uuid: uuid }));
  }, [uuid]);

  return (
    <div className="flex flex-col h-screen">
      <BookingHeader />
      <div className="flex-grow flex flex-col py-20 px-20">
        <div className="flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            strokeWidth={3}
            className="w-5 h-5 stroke-black fill-black"
          >
            <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
          </svg>
          <div className="font-semibold text-3xl">Confirm and pay</div>
        </div>
        <div className="flex md:flex-row flex-col gap-10 mt-10 ml-4 ">
          <div className="w-full md:w-2/4 flex gap-5 flex-col ">
            <div className=" flex rounded-lg p-4 border justify-between items-center">
              <div className="flex flex-col">
                <div className="font-medium text-lg">This is a rare find.</div>
                <div className="font-sans">
                  {rooms?.user.firstName}'s place is usually booked.
                </div>
              </div>
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                className="fill-red-500 h-8 w-8"
              >
                <g stroke="none">
                  <path
                    d="m32.62 6 9.526 11.114-18.146 23.921-18.147-23.921 9.526-11.114z"
                    fillOpacity=".2"
                  ></path>
                  <path d="m34.4599349 2 12.8243129 14.9616983-23.2842478 30.6928721-23.28424779-30.6928721 12.82431289-14.9616983zm-17.9171827 16h-12.52799999l18.25899999 24.069zm27.441 0h-12.528l-5.73 24.069zm-14.583 0h-10.802l5.4012478 22.684zm-15.92-12.86-9.30799999 10.86h11.89399999zm19.253-1.141h-17.468l2.857 12.001h11.754zm1.784 1.141-2.586 10.86h11.894z"></path>
                </g>
              </svg>
            </div>

            <TripDetails />
            <hr />
            <div className=" text-2xl font-medium ">Choose How to pay</div>

            <PaymentOption
              setSelectedPaymentOption={setSelectedPaymentOption}
              selectedPaymentOption={selectedPaymentOption}
            />
            <hr />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center gap-4">
                <div className="font-bold">Pay with </div>
                <div className="flex gap-2">
                  <img
                    src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg"
                    alt="Visa Card"
                    className="h-3"
                  ></img>
                  <img
                    src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg"
                    alt="Mastercard"
                    className="h-3"
                  ></img>
                  <img
                    src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_amex.84088b520ca1b3384cb71398095627da.svg"
                    alt="American Express Card"
                    className="h-3"
                  ></img>
                  <img
                    src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_paypal.faa3042fa2daf6b4a9822cc4b43e8609.svg"
                    alt="PayPal"
                    className="h-3"
                  ></img>
                  <img
                    src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_ideal.e05f58e3623503d7632b6f849761400a.svg"
                    alt="iDEAL"
                    className="h-3"
                  ></img>
                  <img
                    src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_googlepay.3f786bc031b59575d24f504dfb859da0.svg"
                    alt="Google Pay"
                    className="h-3"
                  ></img>
                </div>
              </div>
              <PaymentMethod
                totalFee={totalFee}
                setPaymentType={setPaymentType}
                paymentType={paymentType}
              />
            </div>
          </div>
          <div className="w-full md:w-2/4 h-full p-2 md:p-10 ">
            <div className="sticky top-10  self-center flex flex-col gap-4  p-5 bg-white rounded-lg border">
              <div className="flex gap-3 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1499814375754-a481db8ab6c5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="wildlife"
                  className="w-28 rounded-lg"
                />
                <div className="flex flex-col justify-center">
                  <div className="font-medium text-neutral-800 text-lg">
                    {rooms?.title}
                  </div>
                  <div>{rooms?.privacyType}</div>
                  <div className="flex items-center gap-2">
                    {" "}
                    <FontAwesomeIcon
                      icon={faStar}
                      className="h-2.5 w-2.5"
                    />{" "}
                    <span className="font-medium">4.95 </span>(162 reviews) •
                    Superhost
                  </div>
                </div>
              </div>
              <hr />
              <PriceDetails price={rooms?.pricing} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-20">
        <LastFooter />
      </div>
    </div>
  );
};

export default BookingPage;
