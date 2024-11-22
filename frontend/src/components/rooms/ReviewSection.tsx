import ReviewList from "./ReviewList";
import shemsu from "../../assets/shemsu.jpeg"; // Replace with the actual import path

const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      image: shemsu,
      name: "Danillo",
      timeOnAirbnb: "5 Years",
      rating: 5,
      reviewDate: "October 7",
      stayType: "Stayed a few nights",
      reviewText:
        "Ritinha a love of person, super requests and helpful, concerned with the guests, Chalé clean and organized and very beautiful!! I will come back more often",
    },
  ];

  return (
    <div className="mx-4 box-border md:mx-10 xl:mx-32 pb-5 flex flex-col md:flex-row gap-10 justify-center items-center">
      {Array(2)
        .fill(0)
        .map((_, idx) => (
          <ReviewList key={idx} reviews={reviews} />
        ))}
    </div>
  );
};

export default ReviewsSection;
