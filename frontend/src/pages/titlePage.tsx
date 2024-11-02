import { useEffect, useState } from "react";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { updateTitle } from "../redux/hostActions";
import { RootState, useAppDispatch } from "../redux/store";
import TitleInput from "../components/hostingSteps/titleInput";
import { Helmet } from "react-helmet";

const TitlePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const host = useSelector((state: RootState) => state.host.host);
  const [title, setTitle] = useState(host.title || "");

  useEffect(() => {
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    if (currentHost && currentHost.title) {
      setTitle(currentHost.title);
    }
  }, []);
  const onBack = () => {
    navigate(`/became-a-host/${host.uuid}/photos`);
  };
  const onNext = async () => {
    dispatch(updateTitle({ uuid: host.uuid!, title }));
    navigate(`/became-a-host/${host.uuid}/description`);
  };
  return (
    <div className="h-screen flex flex-col">
      <Helmet>
        <title>Give your place a title - Airbnb</title>
      </Helmet>
      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />
      <div className="flex-1 px-10 flex justify-center">
        <TitleInput title={title} onTitleChange={setTitle} />
      </div>
      <FooterNavigation onBack={onBack} onNext={onNext} step={2} pos={3} />
    </div>
  );
};

export default TitlePage;
