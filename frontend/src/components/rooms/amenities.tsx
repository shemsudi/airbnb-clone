import HouseIcon from "../icons/houseIcon";

const Amenities = () => {
  return (
    <div id="amenities" className="my-8 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">What this place offers</h1>
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
      <button className="p-3 border text-lg w-fit rounded-lg border-gray-700 mt-4">
        Show all 60 amenities
      </button>
    </div>
  );
};

export default Amenities;
