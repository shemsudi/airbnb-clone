import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { HostedPlaces } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getAllHosts } from "../redux/placeActions";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Icons = () => {
  const dispatch = useAppDispatch();
  const params = useSelector((state: RootState) => state.place.params);
  const hosts = useSelector(
    (state: RootState) => state.place.place as HostedPlaces[]
  );
  const loading = useSelector((state: RootState) => state.place.loading);
  const [isHovered, SetIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placeIndex, setPlaceIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  console.log(currentIndex);

  useEffect(() => {
    if (params) {
      dispatch(getAllHosts({ params }));
    }
  }, [dispatch, params]);

  const nextImage = (index: number) => {
    setPlaceIndex(index);
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % hosts[index].photos!.length
    );
  };

  const prevImage = (index: number) => {
    setPlaceIndex(index);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + hosts[index].photos!.length) %
        hosts[index].photos!.length
    );
  };
  const handleMouseOver = (index: number) => {
    SetIsHovered(true);
    setHoveredIndex(index);
  };
  const handleMouseLeave = (index: number) => {
    SetIsHovered(false);
    setHoveredIndex(index);
  };
  return (
    <div className="h-full grid gap-4 mb-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading &&
        hosts.length === 0 &&
        // Skeleton placeholders when loading and no hosts available
        Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-md flex flex-col bg-white shadow-sm p-1"
          >
            <Skeleton className="rounded-md h-60 w-full" />
            <div className="flex flex-col mt-4">
              <Skeleton width={120} height={20} />
              <div className="flex justify-between items-center mt-2">
                <Skeleton width={80} height={20} />
                <Skeleton circle={true} width={20} height={20} />
              </div>
              <Skeleton width={180} height={16} />
              <Skeleton width={100} height={16} />
              <Skeleton width={60} height={20} />
            </div>
          </div>
        ))}

      {hosts.map((host, index) => (
        <div
          key={host.uuid}
          className="rounded-md cursor-pointer flex flex-col w-full bg-white shadow-sm p-1"
        >
          <div className="relative w-full">
            {loading ? (
              <Skeleton className="rounded-md h-60 w-full" />
            ) : (
              <>
                {" "}
                <Link className="cursor-pointer" to={"/rooms"}>
                  <div className="flex h-60 w-full overflow-hidden">
                    {host.photos!.map((url) => (
                      <img
                        key={url}
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                        className={`rounded-md  object-cover w-full h-full flex-shrink-0 flex-grow-0 ${
                          index === placeIndex &&
                          "transition-transform translate duration-300 ease-in-out"
                        }`}
                        src={url}
                        style={{
                          translate:
                            index === placeIndex
                              ? `${-100 * currentIndex}%`
                              : "",
                        }}
                        alt={host.title}
                      />
                    ))}
                  </div>
                </Link>
                {index === hoveredIndex && isHovered && (
                  <button
                    onMouseOver={() => SetIsHovered(true)}
                    onClick={(event) => {
                      event.stopPropagation(); // Prevents click from reaching the Link
                      nextImage(index);
                    }}
                    className="absolute hover:transform hover:scale-90 top-1/2 z-10 rounded-full bg-white w-8 h-8 flex items-center justify-center transform -translate-y-1/2  m-2"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                )}
                {index === hoveredIndex && isHovered && (
                  <button
                    onMouseOver={() => SetIsHovered(true)}
                    onClick={(event) => {
                      event.stopPropagation(); // Prevents click from reaching the Link
                      prevImage(index);
                    }}
                    className="absolute top-1/2 z-10 hover:transform hover:scale-90 rounded-full bg-white w-8 h-8 flex items-center justify-center transform  -translate-y-1/2  right-0 m-2"
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-900">
                {loading ? (
                  <Skeleton width={120} />
                ) : (
                  `${host.location.city}, ${host.location.country}`
                )}
              </span>
              <div className="flex gap-1">
                <span className="text-sm font-bold text-gray-900">
                  {loading ? (
                    <Skeleton circle={true} width={20} height={20} />
                  ) : (
                    <FontAwesomeIcon icon={faStar} className="text-gray-700" />
                  )}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {loading ? <Skeleton width={20} /> : 4.96}
                </span>
              </div>
            </div>
            <span className="text-gray-500">
              {loading ? <Skeleton width={180} /> : `8453 kilometers away`}
            </span>
            <span className="text-sm text-gray-500">
              {loading ? <Skeleton width={100} /> : "Dec 27 - Jan 10"}
            </span>
            <span className="text-sm cursor-default font-bold text-gray-600">
              {loading ? (
                <Skeleton width={50} />
              ) : (
                `$${host.pricing?.nightlyRate} night`
              )}
            </span>
          </div>
        </div>
      ))}
      {hosts.length === 0 && !loading && <div>No hosts found</div>}
    </div>
  );
};

export default Icons;
