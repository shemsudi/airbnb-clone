import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { HostedPlaces } from "../types/types";
import { lazy, useEffect, Suspense, useCallback, useState } from "react";
import { getAllListings } from "../redux/placeActions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Card = lazy(() => import("./card"));

const Places = () => {
  const dispatch = useAppDispatch();
  const params = useSelector((state: RootState) => state.place.params);
  const Listing = useSelector(
    (state: RootState) => state.place.place as HostedPlaces[]
  );
  const [isLoading, setIsLoading] = useState(true);
  console.log("i have been rerendered");
  useEffect(() => {
    if (params) {
      dispatch(getAllListings({ params }));
      setIsLoading(false);
    }
  }, [params, dispatch]);

  const renderSkeletons = useCallback(
    () => (
      <div className="h-full no-scrollbar grid gap-4 mb-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
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
      </div>
    ),
    []
  );
  console.log(isLoading);
  if (isLoading) {
    return renderSkeletons();
  }

  return (
    <Suspense fallback={renderSkeletons()}>
      <div className="h-full no-scrollbar grid gap-4 mb-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Listing.length > 0 &&
          Listing.map((host: HostedPlaces) => (
            <Card host={host} key={host.uuid} />
          ))}
        {!isLoading && Listing.length === 0 && <div>No Hosts Found</div>}
      </div>
    </Suspense>
  );
};

export default Places;
