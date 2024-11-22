type RatingItemProps = {
  title: string;
  rating: string;
  icon: JSX.Element;
};

const RatingItem: React.FC<RatingItemProps> = ({ title, rating, icon }) => {
  return (
    <div className="flex flex-col  px-4 mt-4 justify-between">
      <div className="flex flex-col">
        <h1 className="font-medium">{title}</h1>
        <div className="font-bold">{rating}</div>
      </div>
      <div className="mb-4">
        <div className="mt-10">{icon}</div>
      </div>
    </div>
  );
};

export default RatingItem;
