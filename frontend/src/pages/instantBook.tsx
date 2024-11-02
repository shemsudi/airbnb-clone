import { useState } from "react";
import { useSelector } from "react-redux";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import InstantIcon from "../components/icons/instantIcon";
import ChatIcon from "../components/icons/chatIcon";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { updateInstantBook } from "../redux/hostActions";
import { useAppDispatch, RootState } from "../redux/store";
import { Helmet } from "react-helmet";
const InstantBookPage = () => {
  const host = useSelector((state: RootState) => state.host.host);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log(host.instantBook);
  const [instantBooking, setInstantBooking] = useState(
    host.instantBook || "instant"
  );

  useEffect(() => {
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    if (currentHost && currentHost.instantBook) {
      console.log(currentHost.instantBook);
      setInstantBooking(currentHost.instantBook);
    }
  }, []);
  const onBack = () => {
    navigate(`/became-a-host/${host.uuid}/finish-setup`);
  };
  const onNext = async () => {
    dispatch(
      updateInstantBook({ uuid: host.uuid!, instantBook: instantBooking })
    );
    navigate(`/became-a-host/${host.uuid}/visibility`);
  };

  return (
    <div className=" h-screen flex flex-col">
      <Helmet>
        <title>Decide how you’ll confirm reservations - Airbnb</title>
      </Helmet>
      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />
      <div className="flex-1 flex items-start justify-center md:items-center m-4">
        <div className="flex flex-col min-w-[500-px] justify-center items-center gap-2">
          <h1 className="text-2xl mb-4">
            Decide how you’ll confirm reservations
          </h1>
          <button
            onClick={() => setInstantBooking("instant")}
            className={`flex justify-between ${
              instantBooking === "instant" && "outline outline-1 bg-neutral-100"
            }  items-center p-3 border rounded-lg w-full`}
          >
            <div className="flex flex-col">
              <h1 className="text-sm text-start">Use Instant Book</h1>
              <small className="text-gray-600">
                Guests can book automatically
              </small>
            </div>
            <InstantIcon />
          </button>
          <button
            onClick={() => setInstantBooking("by-request")}
            className={`flex justify-between ${
              instantBooking === "by-request" &&
              "outline outline-1 bg-neutral-100"
            }  items-center p-3 border rounded-lg w-full`}
          >
            <div className="flex flex-col ">
              <h1 className="text-sm text-start">
                Approve or decline requests
              </h1>
              <small className="text-gray-600">
                Guests must ask if they can book.
              </small>
            </div>
            <ChatIcon />
          </button>
        </div>
      </div>{" "}
      <FooterNavigation onBack={onBack} onNext={onNext} step={3} pos={1} />
    </div>
  );
};
export default InstantBookPage;
