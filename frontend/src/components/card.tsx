import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { HostedPlaces } from "../types/types";
import ImageSlider from "./imageSlider";
import React, { Suspense, useCallback } from "react";
import Skeleton from "react-loading-skeleton";

type CardProps = {
  host: HostedPlaces;
};

const Card: React.FC<CardProps> = React.memo(({ host }) => {
  const renderSkeletons = useCallback(
    () => (
      <div className="rounded-md flex flex-col bg-white shadow-sm p-1">
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
    ),
    []
  );
  return (
    <Suspense fallback={renderSkeletons()}>
      <div
        key={host.uuid}
        className="rounded-md cursor-pointer flex flex-col bg-white shadow-sm p-1"
      >
        <div className="relative h-60 w-full flex-shrink-0 flex-grow-0">
          <div className="flex h-60 w-full overflow-x-scroll no-scrollbar scroll-smooth">
            <ImageSlider host={host} />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">
              {host.location.city} , {host.location.country}
            </span>
            <div className="flex gap-1">
              <span className="text-sm font-bold text-gray-900">
                <FontAwesomeIcon icon={faStar} className="text-gray-700" />
              </span>
              <span className="text-sm font-bold text-gray-900">4.96</span>
            </div>
          </div>
          <span className="text-gray-500">8453 kilometers away</span>
          <span className="text-sm text-gray-500">Dec 27 - Jan 10</span>
          <span className="text-sm cursor-default font-bold text-gray-600">
            ${host.pricing?.nightlyRate} night
          </span>
        </div>
      </div>
    </Suspense>
  );
});

export default Card;
