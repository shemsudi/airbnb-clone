import { useEffect, useState } from "react";

//components
// import Footer from "../components/root/footer";
import Header from "../components/root/header";
import PlaceNavigation from "../components/root/placeNavigation";
import LastFooter from "../components/hosthomes/lastFooter";
import Places from "../components/Places";

const Root = () => {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setAtTop(true);
      } else {
        setAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col h-full no-scrollbar">
      <div className="sticky top-0 z-10 bg-white">
        <Header atTop={atTop} />
        <PlaceNavigation />
      </div>
      <div className="flex-grow overflow-y-auto px-10 py-4 ">
        <Places />
      </div>
      <div className="fixed bottom-0 right-0 left-0 px-10 bg-[#F7F7F7] max-md:hidden">
        <LastFooter />
      </div>
    </div>
  );
};

export default Root;
