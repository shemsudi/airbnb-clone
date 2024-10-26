import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import HostHeader from "../components/hostingSteps/hostHeader.tsx";
import { types } from "../data/types.js";
import { updateHostStructure } from "../redux/hostActions.tsx";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/store";

const HomeSturcture = () => {
  const host = useSelector((state: RootState) => state.host.host);
  const previouslyChoosed = host.structure ? host.structure : "";
  const [typeOfPlace, setTypeOfPlace] = useState(previouslyChoosed);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    if (currentHost && currentHost.structure) {
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
      <HostHeader />
      <div className="flex-1 flex flex-col min-[720px]:items-center px-4  min-[720px]:px-10  overflow-y-auto">
        {" "}
        <h1 className="text-2xl  font-medium pb-3 pt-4">
          Which of these best describes your places?{" "}
        </h1>
        <div className=" grid grid-cols-1 min-[390px]:grid-cols-2 min-[720px]:grid-cols-3 gap-2 mb-8 ">
          {types.map(({ type, icon }) => (
            <button
              key={type}
              className={`flex flex-col active:scale-95 active:duration-100 min-w-44 justify-start border  p-2 rounded-lg ${
                typeOfPlace === type
                  ? "outline outline-2"
                  : "hover:outline outline-2"
              }`}
              onClick={() => setTypeOfPlace(type)}
            >
              {icon}
              <p className="text-sm">{type}</p>
            </button>
          ))}
        </div>
      </div>
      <FooterNavigation
        step={1}
        pos={1}
        onBack={backToStructurePage}
        onNext={onNext}
      />
    </div>
  );
};

export default HomeSturcture;
