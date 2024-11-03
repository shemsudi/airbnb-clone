import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import HostHeader from "../components/hostingSteps/hostHeader.tsx";
import { types } from "../data/types.js";
import { updateHostStructure } from "../redux/hostActions.tsx";
import { RootState, useAppDispatch } from "../redux/store";
const HomeSturcture = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const host = useSelector((state: RootState) => state.host.host);
  const [typeOfPlace, setTypeOfPlace] = useState<string>(host.structure || "");

  useEffect(() => {
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    if (currentHost?.structure) {
      setTypeOfPlace(currentHost.structure);
    }
  }, []);

  const backToStructurePage = () => {
    navigate(`/became-a-host/${host.uuid}/about-your-place`);
  };

  const onNext = () => {
    dispatch(updateHostStructure({ uuid: host.uuid!, structure: typeOfPlace }));
    navigate(`/became-a-host/${host.uuid}/privacyType`);
  };
  return (
    <div className=" flex flex-col h-screen">
      <Helmet>
        <title>Choose your property type - Airbnb</title>
      </Helmet>
      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />
      <main className="flex-1 flex flex-col min-[720px]:items-center px-4  min-[720px]:px-10  overflow-y-auto">
        <h1 className="text-2xl  font-medium pb-3 pt-4">
          Which of these best describes your places?{" "}
        </h1>
        <div className=" grid grid-cols-1 min-[390px]:grid-cols-2 min-[720px]:grid-cols-3 gap-2 mb-8 ">
          {types.map(({ value, icon }) => (
            <button
              key={value}
              className={`flex flex-col active:scale-95 active:duration-100 min-w-44 justify-start border  p-2 rounded-lg ${
                typeOfPlace === value
                  ? "outline outline-2"
                  : "hover:outline outline-2"
              }`}
              onClick={() => setTypeOfPlace(value)}
            >
              {icon}
              <p className="text-sm">{value}</p>
            </button>
          ))}
        </div>
      </main>
      <FooterNavigation
        itemSelected={typeOfPlace ? true : false}
        step={1}
        pos={1}
        onBack={backToStructurePage}
        onNext={onNext}
      />
    </div>
  );
};

export default HomeSturcture;
