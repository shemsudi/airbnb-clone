import HouseIcon from "../icons/houseIcon";

const Amenities = () => {
  return (
    <div className="flex gap-5 w-full mt-5">
      <div className="w-1/2 gap-3 flex flex-col">
        <div className="flex gap-2 items-center ">
          <HouseIcon />
          <h1>Wifi</h1>
        </div>
        <div className="flex gap-2 items-center ">
          <HouseIcon />
          <h1>Pool</h1>
        </div>
        <div className="flex gap-2 items-center ">
          <HouseIcon />
          <h1>Luggage dropoff allowed</h1>
        </div>
        <div className="flex gap-2 items-center ">
          <HouseIcon />
          <h1>Long term stays allowed</h1>
        </div>
        <div className="flex gap-2 items-center ">
          <HouseIcon />
          <h1>Carbon monoxide alarm</h1>
        </div>
      </div>
      <div className="w-1/2 gap-3 flex flex-col">
        <div className="flex gap-2 items-center ">
          <HouseIcon />
          <h1>Free parking on premises</h1>
        </div>
        <div className="flex gap-2 items-center ">
          <HouseIcon />
          <h1>TV with standard cable</h1>
        </div>
        <div className="flex gap-2 items-center ">
          <HouseIcon />
          <h1>Breakfast</h1>
        </div>
        <div className="flex gap-2 items-center ">
          <HouseIcon />
          <h1>Lock on bedroom door</h1>
        </div>
        <div className="flex gap-2 items-center ">
          <HouseIcon />
          <h1>Smoke alarm</h1>
        </div>
      </div>
    </div>
  );
};

export default Amenities;
