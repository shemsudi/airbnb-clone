import Header from "./header";
import PlacedNavigation from "./placeNavigation";

const HeaderAndNavigation = () => {
  return (
    <div className="sticky top-0 z-20   bg-white">
      <Header />
      <PlacedNavigation />
    </div>
  );
};

export default HeaderAndNavigation;
