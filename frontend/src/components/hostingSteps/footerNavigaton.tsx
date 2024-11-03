import React from "react";
import ProgressBar from "./progressBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface FooterNavigationProps {
  step: number;
  pos: number;
  onBack: () => void;
  onNext: () => void;
  itemSelected: boolean;
}
const FooterNavigation: React.FC<FooterNavigationProps> = ({
  step,
  pos,
  onBack,
  onNext,
  itemSelected,
}) => {
  const host = useSelector((state: RootState) => state.host);
  console.log(host.loading);
  console.log(itemSelected);
  return (
    <div className=" self-end w-full sticky bottom-0 left-0 z-100 bg-white ">
      <ProgressBar step={step} pos={pos} />
      <div className="w-full flex justify-between items-center  px-6 py-3">
        <button
          onClick={onBack}
          className="underline transform active:scale-95 opacity-80 hover:opacity-100"
        >
          Back
        </button>
        <button
          disabled={host.loading || !itemSelected}
          onClick={onNext}
          className={`rounded-md transform ${
            itemSelected
              ? "opacity-80 hover:opacity-100  active:scale-95"
              : "opacity-50"
          } bg-black text-white px-6 py-2`}
        >
          {host.loading ? "Loading" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default FooterNavigation;
