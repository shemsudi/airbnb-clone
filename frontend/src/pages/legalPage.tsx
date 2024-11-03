import { useState } from "react";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateLegalInfo } from "../redux/hostActions";
import { RootState, useAppDispatch } from "../redux/store";
import { Helmet } from "react-helmet";

const LegalPage = () => {
  const host = useSelector((state: RootState) => state.host.host);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [legalInfo, setLegalInfo] = useState({
    securityCameras: host.legalInfo?.securityCameras?.isAvailable || false,
    hostingType: host.legalInfo?.hostingType || "",
    noiseMonitors: host.legalInfo?.noiseMonitors || false,
    weapons: host.legalInfo?.weapons || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLegalInfo((prevInfo) => ({
      ...prevInfo,
      hostingType: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setLegalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: checked,
    }));
  };

  const onBack = () => {
    navigate(`/became-a-host/${host.uuid}/discount`);
  };
  const onNext = async () => {
    const formattedLegalInfo = {
      ...legalInfo,
      securityCameras: {
        isAvailable: legalInfo.securityCameras,
        description: "",
      },
    };
    console.log(legalInfo);
    dispatch(
      updateLegalInfo({ uuid: host.uuid!, legalInfo: formattedLegalInfo })
    );

    navigate(`/became-a-host/${host.uuid}/receipt`);
  };

  return (
    <div className="h-screen flex flex-col">
      <Helmet>
        <title>Answer some final questions- Airbnb</title>
      </Helmet>
      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />
      <div className="grow flex  justify-center items-centerp-2 ">
        <div className="flex flex-col justify-center w-[500px] gap-4 p-2">
          <h1 className="text-2xl font-medium">Just one last Step!</h1>
          <p className=" font-medium">How are you hosting on Airbnb?</p>
          <div className="space-x-2 hover:cursor-pointer">
            <input
              className="accent-black "
              type="radio"
              id="individual"
              name="hosting-type"
              value="individual"
              checked={legalInfo.hostingType === "individual"}
              onChange={handleChange}
            />
            <label className="text-gray-900" htmlFor="individual">
              I'm hosting as a private individual
            </label>
          </div>
          <div className="space-x-2">
            <input
              className="accent-black fill-black"
              type="radio"
              id="business"
              name="hosting-type"
              value="business"
              checked={legalInfo.hostingType === "business"}
              onChange={handleChange}
            />

            <label className="text-gray-900" htmlFor="business">
              I'm hosting as a business
            </label>
          </div>
          <h2 className="font-medium"> Does your place have any of these?</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p>Exterior security cameras</p>
              <input
                type="checkbox"
                className="accent-black"
                name="securityCameras"
                checked={legalInfo.securityCameras}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="flex justify-between">
              <p>Noise decibel monitors</p>
              <input
                type="checkbox"
                className="accent-black"
                name="noiseMonitors"
                checked={legalInfo.noiseMonitors}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="flex justify-between">
              <p>Weapons</p>
              <input
                name="weapons"
                type="checkbox"
                className="accent-black"
                checked={legalInfo.weapons}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
          <hr />
          <div className="pt-6">
            <h1 className=" font-semibold text-neutral-600">
              Important things to know
            </h1>
            <p className="text-neutral-600 text-sm">
              Security cameras that monitor indoor spaces are not allowed even
              if they're turned off. All exterior security cameras must be
              disclosed.
            </p>
            <p className="text-neutral-600 mt-3 text-sm">
              Be sure to comply with your{" "}
              <Link className="underline" to={""}>
                locallaws
              </Link>{" "}
              and review Airbnb's{" "}
              <Link className="underline" to={""}>
                anti-discrimination policy
              </Link>{" "}
              and{" "}
              <Link className="underline" to={""}>
                guest and Host fees.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <FooterNavigation
        itemSelected={!(legalInfo.hostingType === "")}
        onBack={onBack}
        onNext={onNext}
        step={3}
        pos={5}
      />
    </div>
  );
};

export default LegalPage;
