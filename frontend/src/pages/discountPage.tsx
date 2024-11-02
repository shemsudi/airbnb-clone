import { useState, useEffect } from "react";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateDiscounts } from "../redux/hostActions";
import { RootState, useAppDispatch } from "../redux/store";
import { Helmet } from "react-helmet";

const DiscountPage = () => {
  const host = useSelector((state: RootState) => state.host.host);

  interface DiscountState {
    newLPDiscount: number;
    weeklyDiscount?: number | undefined;
    monthlyDiscount?: number | undefined;
    isNewLPDiscountEnabled: boolean;
    isWeeklyDiscountEnabled: boolean;
    isMonthlyDiscountEnabled: boolean;
  }

  const [discountState, setDiscountState] = useState<DiscountState>({
    newLPDiscount: 20,
    weeklyDiscount: host.discount?.weeklyDiscount || 8,
    monthlyDiscount: host.discount?.monthlyDiscount || 10,
    isNewLPDiscountEnabled: host.discount?.isNewLPDiscountEnabled || true,
    isWeeklyDiscountEnabled: host.discount?.isWeeklyDiscountEnabled || true,
    isMonthlyDiscountEnabled: host.discount?.isMonthlyDiscountEnabled || true,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    if (currentHost && currentHost.discount) {
      setDiscountState((prev) => ({
        ...prev,
        monthlyDiscount: currentHost.discount.monthlyDiscount,
        weeklyDiscount: currentHost.discount.weeklyDiscount,
        isNewLPDiscountEnabled: currentHost.discount.isNewLPDiscountEnabled,
        isWeeklyDiscountEnabled: currentHost.discount.isWeeklyDiscountEnabled,
        isMonthlyDiscountEnabled: currentHost.discount.isMonthlyDiscountEnabled,
      }));
    }
  }, []);

  const onBack = () => {
    navigate(`/became-a-host/${host.uuid}/price`);
  };

  const onNext = async () => {
    dispatch(updateDiscounts({ uuid: host.uuid!, discount: discountState }));
    navigate(`/became-a-host/${host.uuid}/legal`);
  };

  const handleDiscountChange = (field: keyof DiscountState, value: any) => {
    setDiscountState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="h-screen flex flex-col">
      <Helmet>
        <title>Set your discount - Airbnb</title>
      </Helmet>
      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />
      <div className="grow flex justify-center items-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-roboto">Add discounts</h1>
          <small className="text-gray-600 text-sm">
            Help your place stand out to get booked faster and earn your first
            reviews.
          </small>

          <div className="flex p-4 bg-neutral-100 border rounded-lg mt-4 justify-between">
            <div className="flex gap-2 items-center">
              <span className="px-1">20%</span>
              <div className="flex flex-col pl-2">
                <h1>New listing promotion</h1>
                <small className="text-gray-600 text-xs">
                  Offer 20% off your first 3 bookings{" "}
                </small>
              </div>
            </div>
            <input
              checked={discountState.isNewLPDiscountEnabled}
              onChange={(e) =>
                handleDiscountChange("isNewLPDiscountEnabled", e.target.checked)
              }
              className="accent-black"
              type="checkbox"
            />
          </div>
          <div className="flex p-4 bg-neutral-100 border rounded-lg mt-4 justify-between">
            <div className="flex gap-2 items-center">
              <div className="border px-1 rounded-md bg-neutral-100 flex">
                <input
                  className="w-5 focus:outline-none"
                  max={100}
                  min={0}
                  type="number"
                  onChange={(e) => {
                    e.preventDefault();
                    const numberValue = e.target.value;
                    if (
                      numberValue === "" ||
                      (parseInt(numberValue) >= 0 &&
                        parseInt(numberValue) <= 100)
                    ) {
                      handleDiscountChange(
                        "weeklyDiscount",
                        numberValue === "" ? undefined : parseInt(numberValue)
                      );
                    }
                  }}
                  value={discountState.weeklyDiscount}
                />
                <span>%</span>
              </div>
              <div className="flex flex-col pl-2">
                <h1>Weekly discount</h1>
                <small className="text-gray-600 text-xs">
                  For stays of 7 nights or more
                </small>
              </div>
            </div>
            <input
              className="accent-black"
              onChange={(e) =>
                handleDiscountChange(
                  "isWeeklyDiscountEnabled",
                  e.target.checked
                )
              }
              checked={discountState.isWeeklyDiscountEnabled}
              type="checkbox"
            />
          </div>
          <div className="flex p-4 bg-neutral-100 border rounded-lg mt-4 justify-between">
            <div className="flex gap-2 items-center">
              <div className="border px-1 rounded-md bg-neutral-100 flex">
                <input
                  className="w-5 focus:outline-none"
                  type="number"
                  onChange={(e) => {
                    e.preventDefault();
                    const numberValue = e.target.value;
                    if (
                      numberValue === "" ||
                      (parseInt(numberValue) >= 0 &&
                        parseInt(numberValue) <= 100)
                    ) {
                      handleDiscountChange(
                        "monthlyDiscount",
                        numberValue === "" ? undefined : parseInt(numberValue)
                      );
                    }
                  }}
                  value={discountState.monthlyDiscount || ""}
                  min={0}
                  max={100}
                />
                <span>%</span>
              </div>
              <div className="flex flex-col pl-2">
                <h1>Monthly discount</h1>
                <small className="text-gray-600 text-xs">
                  For stays of 28 nights or more
                </small>
              </div>
            </div>
            <input
              onChange={(e) =>
                handleDiscountChange(
                  "isMonthlyDiscountEnabled",
                  e.target.checked
                )
              }
              checked={discountState.isMonthlyDiscountEnabled}
              className="accent-black"
              type="checkbox"
            />
          </div>
        </div>
      </div>
      <FooterNavigation onNext={onNext} onBack={onBack} step={3} pos={4} />
    </div>
  );
};

export default DiscountPage;
