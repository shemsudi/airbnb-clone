import { useLoaderData } from "react-router-dom";

interface IHome {
  title?: string;
  uuid: string;
  lastPage?: string;
  isCompleted?: boolean;
  structure?: string;
  privacyType?: string;
  description?: string;
  visibility?: string;
  highlights?: string[];
  instantBook?: string;
  guests?: number;
  beds?: number;
  bedrooms?: number;
  bathrooms?: number;
  location: Location;
  photos?: string[];
  amenities?: string[];
  uniqueAmenities?: string[];
  safetyAmenities?: string[];
  houseRules?: string[];
  availability?: {
    startDate?: Date;
    endDate?: Date;
    minStay?: number;
    maxStay?: number;
  };
  created_at?: Date;
  updated_at?: Date;
}
interface IHostResponse {
  homes: IHome[];
}
const Icons = () => {
  const homes = useLoaderData() as IHostResponse;
  if (homes.homes.length === 0) return <div>No homes found</div>;

  const photos = [
    ...homes.homes[0].photos,
    ...homes.homes[0].photos,
    ...homes.homes[0].photos,
    ...homes.homes[0].photos,
    ...homes.homes[0].photos,
    ...homes.homes[0].photos,
  ];

  console.log(homes);

  return (
    <div className="grid gap-4  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
      {photos &&
        photos!.map((photo) => (
          <div key={photo} className="w-full h-40">
            <img className="w-full h-40 object-fill" src={photo} alt={photo} />
          </div>
        ))}
    </div>
  );
};

export default Icons;
