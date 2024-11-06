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
const Icons2 = () => {
  const homes = useLoaderData() as IHostResponse;
  if (homes.homes.length === 0) return <div>No homes found</div>;

  const photos = homes.homes[0].photos;

  console.log(homes);

  return (
    <div className="grid gap-4 grid-cols-5">
      {photos &&
        photos!.map((photo) => (
          <div key={photo} className="grid gap-3">
            <img className="w-full h-full" src={photo} alt={photo} />
          </div>
        ))}
    </div>
  );
};

export default Icons2;
