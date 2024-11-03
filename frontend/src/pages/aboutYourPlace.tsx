import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import HostHeader from "../components/hostingSteps/hostHeader";
const AboutYourPlace = () => {
  const { uuid } = useSelector((state: RootState) => state.host.host);
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/became-a-host/overview");
  };
  const navigateToStructurePage = () => {
    navigate(`/became-a-host/${uuid}/structure`);
  };

  return (
    <div className="h-screen flex flex-col">
      <Helmet>
        <title>Step 1: Tell us about your place - Airbnb</title>
      </Helmet>
      <HostHeader title="Exit & save" questions="Questions" />
      <main className=" flex-1 mx-6 md:mx-16 my-5 md:my-10 flex items-center justify-start md:justify-center ">
        <div className="flex flex-col-reverse md:flex-row items-center justify-start md:justify-center ">
          <div className="w-full md:max-w-lg md:max-h-3/5 flex flex-col">
            <h1>Step 1</h1>
            <h1 className="font-semibold text-3xl pt-2">
              Tell us about your place
            </h1>
            <p className="text-sm text-gray-600 pt-6">
              In this step, we'll ask you which type of property you have and if
              guests will book the entire place or just a room. Then let us know
              the location and how many guests can stay.
            </p>
          </div>
          <div className="w-full md:max-w-md   ">
            <video
              className="md:max-w-md "
              poster="video-poster.jpg"
              autoPlay
              muted
              preload="auto"
            >
              <source
                type="video/mp4"
                src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"
              />
            </video>
          </div>
        </div>
      </main>
      <FooterNavigation
        itemSelected={true}
        step={0}
        pos={0}
        onBack={backToHome}
        onNext={navigateToStructurePage}
      />
    </div>
  );
};

export default AboutYourPlace;
