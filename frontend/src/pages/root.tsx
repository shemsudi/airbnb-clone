import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

//components
// import Footer from "../components/root/footer";
import Header from "../components/root/header";
import PlaceNavigation from "../components/root/placeNavigation";

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
    <div className="relative h-full ">
      <div className="sticky top-0 z-50  bg-white">
        <Header atTop={atTop} />
        <PlaceNavigation />
      </div>
      <div className="overflow-y-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
