import { useEffect } from "react";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { updateAmenities } from "../redux/hostActions";
import { RootState, useAppDispatch } from "../redux/store.js";

import {
  amenitiesItems,
  uniqueAmenitiesItems,
  safetyAmenitiesItems,
} from "../data/types";
import HeaderSection from "../components/hostingSteps/headerSection.js";
import AmenityGrid from "../components/hostingSteps/amenityGrid.js";
import { Helmet } from "react-helmet";
const AmenitiesPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const host = useSelector((state: RootState) => state.host.host);
  const [amenities, setAmenities] = useState({
    general: host.amenities || [],
    unique: host.uniqueAmenities || [],
    safety: host.safetyAmenities || [],
  });
  const itemSelected =
    amenities.general.length > 0 ||
    amenities.unique.length > 0 ||
    amenities.safety.length > 0;
  useEffect(() => {
    const currentHost = JSON.parse(localStorage.getItem("currentHost") || "{}");
    if (currentHost) {
      setAmenities({
        general: currentHost.amenities || [],
        unique: currentHost.uniqueAmenities || [],
        safety: currentHost.safetyAmenities || [],
      });
    }
  }, []);

  const onNext = async () => {
    dispatch(
      updateAmenities({
        uuid: host.uuid!,
        amenities: amenities.general,
        uniqueAmenities: amenities.unique,
        safetyAmenities: amenities.safety,
      })
    );

    navigate(`/became-a-host/${host.uuid}/photos`);
  };
  const onBack = () => {
    navigate(`/became-a-host/${host.uuid}/stand-out`);
  };

  const toggleAmenity = (
    type: "general" | "unique" | "safety",
    value: string
  ) => {
    setAmenities((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <Helmet>
        <title>Choose your amenities - Airbnb</title>
      </Helmet>
      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />
      <div className="flex-1 mx-4 md:mx-10 flex  justify-center ">
        <div className="flex flex-col gap-6   mt-2 md:max-w-[500px]">
          <HeaderSection />
          <AmenityGrid
            title="what about these guest favorites?"
            items={amenitiesItems}
            selectedItems={amenities.general}
            onToggle={(value) => toggleAmenity("general", value)}
          />
          <AmenityGrid
            title="Do you have any standout amenities?"
            items={uniqueAmenitiesItems}
            selectedItems={amenities.unique}
            onToggle={(value) => toggleAmenity("unique", value)}
          />
          <AmenityGrid
            title="Do you have any of these safety items?"
            items={safetyAmenitiesItems}
            selectedItems={amenities.safety}
            onToggle={(value) => toggleAmenity("safety", value)}
          />
        </div>
      </div>
      <FooterNavigation
        itemSelected={itemSelected}
        step={2}
        pos={1}
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  );
};
export default AmenitiesPage;
