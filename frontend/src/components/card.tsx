import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { HostedPlaces } from "../types/types";
import ImageSlider from "./imageSlider";

type CardProps = {
  host: HostedPlaces;
  loading: boolean;
  index: number;
};
const Card: React.FC<CardProps> = ({ host, loading, index }) => {
  return (
    <div
      key={index}
      className="rounded-md cursor-pointer flex flex-col bg-white shadow-sm p-1"
    >
      <div className="relative h-60 w-full flex-shrink-0 flex-grow-0">
        {loading ? (
          <Skeleton className="rounded-md h-60 w-full" />
        ) : (
          <div className="flex h-60 w-full   overflow-x-scroll no-scrollbar  scroll-smooth ">
            <ImageSlider index={index} host={host} />
          </div>
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
  );
};

export default Card;
