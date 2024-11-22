import Reviews from "./Reviews";

interface ReviewListProps {
  reviews: {
    image: string;
    name: string;
    timeOnAirbnb: string;
    rating: number;
    reviewDate: string;
    stayType: string;
    reviewText: string;
  }[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="w-fit md:w-1/2 flex-col flex gap-5">
      {reviews.map((review, reviewIdx) => (
        <Reviews key={reviewIdx} {...review} />
      ))}
    </div>
  );
};

export default ReviewList;
