import CleanIcon from "../icons/cleanIcon";
import RatingItem from "./RatingItem";

const Rating = () => {
  return (
    <div className="mx-4 md:mx-10 xl:mx-32 py-5 flex flex-col justify-center items-center">
      <div className="flex">
        <img
          decoding="async"
          aria-hidden="true"
          className="w-20 h-20"
          src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/059619e1-1751-42dd-84e4-50881483571a.png"
          alt="rating"
          data-original-uri="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/059619e1-1751-42dd-84e4-50881483571a.png"
        />
        <div className="text-6xl font-bold">5.0</div>
        <img
          decoding="async"
          aria-hidden="true"
          className="w-20 h-20"
          src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/33b80859-e87e-4c86-841c-645c786ba4c1.png"
          alt="rating"
          data-original-uri="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/33b80859-e87e-4c86-841c-645c786ba4c1.png"
        />
      </div>
      <div className="w-80 flex items-center flex-col">
        <h1 className="font-semibold text-2xl">Guest favoirte</h1>
        <p className="text-md text-gray-600">
          This home is in the{" "}
          <span className="font-semibold text-black">top 5%</span> of eligible
          listings based on ratings, reviews, and reliability
        </p>
      </div>
      <div className="w-full flex divide-x justify-between mt-4">
        <div className="flex flex-col p-4">
          <h1 className="font-medium">Overall rating</h1>
          <div>5</div>
          <div>4</div>
          <div>3</div>
          <div>2</div>
          <div>1</div>
        </div>
        <RatingItem title="Cleanliness" rating="5.0" icon={CleanIcon()} />
        <RatingItem title="Accuracy" rating="5.0" icon={CleanIcon()} />
        <RatingItem title="Check-in" rating="5.0" icon={CleanIcon()} />
        <RatingItem title="Communication" rating="5.0" icon={CleanIcon()} />
        <RatingItem title="Location" rating="4.8" icon={CleanIcon()} />
        <RatingItem title="Value" rating="5.0" icon={CleanIcon()} />
      </div>
    </div>
  );
};
export default Rating;
