import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface ReviewsProps {
  image: string;
  name: string;
  timeOnAirbnb: string;
  rating: number;
  reviewDate: string;
  stayType: string;
  reviewText: string;
}

const Reviews: FC<ReviewsProps> = ({
  image,
  name,
  timeOnAirbnb,
  reviewDate,
  stayType,
  reviewText,
}) => {
  return (
    <div className="p-2 flex flex-col mt-6 ">
      <div className="flex gap-4 items-center">
        <img
          className="rounded-full w-10 h-10"
          src={image}
          alt={`${name}'s profile`}
        />
        <div className="flex flex-col">
          <h1 className="font-semibold">{name}</h1>
          <div>{timeOnAirbnb} on Airbnb</div>
        </div>
      </div>

      <div className="flex mt-2 items-center gap-2 text-sm ">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className={`w-2.5 h-2.5`} />
          ))}
        </div>
        <span>•</span>
        <div className="font-medium">{reviewDate}</div>
        <span>•</span>
        <div>{stayType}</div>
      </div>

      <div className="mt-2 font-normal ">{reviewText}</div>
    </div>
  );
};

export default Reviews;
