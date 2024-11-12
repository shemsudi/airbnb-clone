import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { HostedPlaces } from "../types/types";
import { useEffect } from "react";
import { getAllHosts } from "../redux/placeActions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Card from "./card";

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
    <div className="h-full no-scrollbar  grid gap-4 mb-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      {hosts.map((host: HostedPlaces, index: number) => (
        <Card host={host} key={index} loading={loading} index={index} />
      ))}

      {hosts.length === 0 && !loading && <div>No hosts found</div>}
    </div>
  );
};

export default Icons;
