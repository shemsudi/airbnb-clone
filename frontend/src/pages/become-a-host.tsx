import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addHost, clearHost } from "../redux/HostReducer";
import { openLoginPage } from "../redux/ModalReducer";
import Signup from "../modal/signup";
import { RootState, useAppDispatch } from "../redux/store";
import api from "../configs/api.ts";
import HostingSteps from "../components/hostingSteps/hostingSteps.tsx";
import HostHeader from "../components/hostingSteps/hostHeader.tsx";
import { Helmet } from "react-helmet";

const BecameAhost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoginPage, isSignupPage, isVerifyPage } = useSelector(
    (state: RootState) => state.modal
  );
  const handleClick = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      dispatch(openLoginPage());
      return;
    }
    try {
      dispatch(clearHost());
      localStorage.removeItem("currentHost");

      const response = await api.get("/host/generate-uuid");
      const data = response.data;

      dispatch(addHost(data));
      localStorage.setItem("currentHost", JSON.stringify(data));
      navigate(`/became-a-host/${data.uuid}/about-your-place`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex flex-col">
      <Helmet>
        <title>Create your listing - Airbnb</title>
      </Helmet>
      <HostHeader title="Exit" questions={false} />
      <main className="flex flex-1 flex-col w-full md:flex-row px-5 md:px-32 gap-4 md:gap-2 overflow-y-scroll  ">
        <div className="flex items-center w-full box-border md:w-1/2 text-2xl  md:text-5xl md:pl-4  md:pr-32 font-semibold">
          {" "}
          It's easy to get started on Airbnb{" "}
        </div>

        <div className="flex flex-col box-border w-full md:w-1/2 pl-0 md:pl-10 h-full divide-y-2">
          <HostingSteps
            stepNumber={1}
            description="Share some basic info, like where it is and how many guests can
                stay."
            title="Tell us about your place"
            imageUrl="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
          />
          <HostingSteps
            stepNumber={2}
            description=" Add 5 or more photos plus a title and description—we’ll help you
                out."
            title="Make it stand out"
            imageUrl="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
          />
          <HostingSteps
            stepNumber={3}
            description="Choose a starting price, verify a few details, then publish your
                listing."
            title="Finish up and publish"
            imageUrl="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
          />
        </div>
      </main>

      <footer className="border-t-4  w-full  sticky bottom-0 left-0 z-100 bg-white px-6  py-3 border-gray-200">
        <div className=" w-full flex justify-end items-center ">
          <button
            aria-label="Get started with hosting"
            onClick={handleClick}
            className="  rounded-md hover:transform hover:scale-95  bg-primary text-white px-6 py-2 max-md:w-full"
          >
            {" "}
            Get started
          </button>
        </div>
      </footer>
      {(isLoginPage || isSignupPage || isVerifyPage) && <Signup />}
    </div>
  );
};
export default BecameAhost;
