import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { HostedPlaces } from "../types/types";


const Icons = () => {
  const hosts = useSelector((state:RootState) => state.place.place as HostedPlaces[])

  if (hosts.length === 0) return <div>No homes found</div>;

  


  return (
    <div className=" h-full grid gap-4 mb-16  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
      {/* {photos &&
        photos!.map((photo) => (
          <div key={photo} className="w-full h-40">
            <img className="w-full h-40 object-fill" src={photo} alt={photo} />
          </div>
        ))} */}
      {
        hosts.map((host,index) => (
          <div key={index} className="">
          <img src={host.photos![Math.floor(5 * Math.random())]} alt={host.title} />
          </div>
        )) }
      
    </div>
  );
};

export default Icons;

