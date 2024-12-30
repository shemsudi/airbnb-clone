import LastFooter from "../components/hosthomes/lastFooter";
import HeaderAndNavigation from "../components/root/headerAndNavigation";
import PlacesContainer from "../components/root/placesContainer";
import { useAppDispatch } from "../redux/store";
import { useEffect } from "react";
import { initializeAuth } from "../utils/authIntializer";
import ModalContainer from "../modal/modalContainer";

const Root = () => {
  const dispatch = useAppDispatch();
  let hasInitialized = false;

  useEffect(() => {
    if (!hasInitialized) {
      hasInitialized = true;
      initializeAuth(dispatch);
    }
  }, [dispatch]);
  return (
    <div className="relative flex flex-col h-full no-scrollbar">
      <HeaderAndNavigation />
      <PlacesContainer />
      <div className="fixed bottom-0 right-0 left-0 px-10 bg-[#F7F7F7] max-md:hidden">
        <LastFooter />
      </div>
      <ModalContainer />
    </div>
  );
};

export default Root;
