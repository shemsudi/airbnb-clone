import React from "react";
import HostPageHeader from "../components/hosthomes/hostHomeHeader";
import EstimateEarnings from "../components/hosthomes/estimateEarnings";
import AirbnbSetupInfo from "../components/hosthomes/airbnbSetupInfo";
import HostPromotionSection from "../components/hosthomes/hostPromotionSection";

import AirbnbProtectionComparison from "../components/hosthomes/airbnbProtectionComparision";
import FrequentlyAskedQuestion from "../components/hosthomes/frequentlyAskedQuestion";
import Footer from "../components/hosthomes/footer";
const HostHomes = () => {
  const [nights, setNights] = React.useState(7);
  const [pricePerNight, setPricePerNight] = React.useState(43);
  const handleSliderChange = (event: any) => {
    console.log(event.target.value);
    const value = event.target.value;
    setNights(value); // Adjust the price based on the slider's position
  };
  setPricePerNight(43);

  return (
    <div className="flex flex-col   ">
      <HostPageHeader />
      <EstimateEarnings
        nights={nights}
        pricePerNight={pricePerNight}
        handleSliderChange={handleSliderChange}
      />
      <AirbnbSetupInfo />
      <HostPromotionSection />
      <AirbnbProtectionComparison />
      <div className=" bg-[#F7F7F7]   ">
        <FrequentlyAskedQuestion />
        <Footer />
      </div>
    </div>
  );
};
export default HostHomes;
