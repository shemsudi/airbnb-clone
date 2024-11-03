import { useEffect, useState } from "react";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateDescription } from "../redux/hostActions";
import { RootState, useAppDispatch } from "../redux/store";
import HighlightSelection from "../components/hostingSteps/highlightSelection";
import DescriptionInput from "../components/hostingSteps/descriptionInput";
import { Helmet } from "react-helmet";

const DescriptionPage = () => {
  const host = useSelector((state: RootState) => state.host.host);
  const [step1, setStep1] = useState(true);
  const [description, setDescription] = useState<string>(
    host.description ||
      "Make some memories at this unique and family-friendly place."
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    host.highlights || []
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    if (currentHost?.description) {
      setDescription(currentHost.description);
      setSelectedTypes(currentHost.highlights);
    }
  }, []);

  const onBack = () => {
    if (!step1) {
      setStep1(true);
    } else {
      navigate(`/became-a-host/${host.uuid}/title`);
    }
  };
  const onNext = async () => {
    if (step1) {
      setStep1(false);
    } else {
      dispatch(
        updateDescription({
          uuid: host.uuid!,
          description: description,
          highlights: selectedTypes,
        })
      );
      navigate(`/became-a-host/${host.uuid}/finish-setup`);
    }
  };
  const handleHighlightToggle = (value: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((type) => type !== value);
      } else if (prev.length === 2) {
        return [prev[1], value];
      } else {
        return [...prev, value];
      }
    });
  };
  return (
    <div className="h-screen flex flex-col">
      <Helmet>
        <title>Describe your place - Airbnb</title>
      </Helmet>
      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />
      <div className="flex-1 flex items-start justify-center md:items-center mt-4">
        {step1 ? (
          <HighlightSelection
            selectedTypes={selectedTypes}
            onToggle={handleHighlightToggle}
          />
        ) : (
          <DescriptionInput
            description={description}
            onChange={setDescription}
          />
        )}
      </div>
      <FooterNavigation
        itemSelected={selectedTypes.length === 2}
        onBack={onBack}
        onNext={onNext}
        step={2}
        pos={4}
      />
    </div>
  );
};
export default DescriptionPage;
