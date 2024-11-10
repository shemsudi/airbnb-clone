import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { HostedPlaces } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { getAllHosts } from "../redux/placeActions";
import { Link } from "react-router-dom";

const Icons = () => {
  const dispatch = useAppDispatch();
  const params = useSelector((state: RootState) => state.place.params);
  const hosts = useSelector(
    (state: RootState) => state.place.place as HostedPlaces[]
  );
  const loading = useSelector((state: RootState) => state.place.loading);

  useEffect(() => {
    if (params) {
      dispatch(getAllHosts({ params }));
    }
  }, [dispatch, params]);

  return (
    <div className=" h-full grid gap-4 mb-16    md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {/* {photos &&
        photos!.map((photo) => (
          <div key={photo} className="w-full h-40">
            <img className="w-full h-40 object-fill" src={photo} alt={photo} />
          </div>
        ))} */}

      {hosts.length === 0 && loading && <div>Loading...</div>}
      {hosts.map((host, index) => (
        <div
          key={index}
          className="rounded-md cursor-pointer flex flex-col bg-white shadow-sm p-1"
        >
          <Link className="cursor-pointer" to={"/rooms"}>
            <img
              className="rounded-md h-60 object-cover w-full"
              src={
                host.photos![Math.floor(Math.random() * host.photos!.length)]
              }
              alt={host.title}
            />
            <div className="flex flex-col mt-4 ">
              <div className="flex justify-between items-center">
                <span className="text-sm  font-bold text-gray-900">
                  {host.location.city} ,{host.location.country}
                </span>
                <div className="flex gap-1">
                  <span className="text-sm  font-bold text-gray-900">
                    <FontAwesomeIcon icon={faStar} className="text-gray-700" />
                  </span>
                  <span className="text-sm  font-bold text-gray-900">
                    {4.96}
                  </span>
                </div>
              </div>
              <span className="text-gray-500">
                {Math.floor(10000 * Math.random())} kilometeres away
              </span>
              <span className=" text-sm text-gray-500">Dec 27 - Jan 10</span>

              <span className="text-sm cursor-default font-bold text-gray-600">
                $ {host.pricing?.nightlyRate} night
              </span>
            </div>
          </Link>
        </div>
      ))}
      {hosts.length === 0 && !loading && <div>No hosts found</div>}
    </div>
  );
};

export default Icons;
