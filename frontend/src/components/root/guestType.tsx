import MinusIcon from "../icons/icons/minusIcon";
import PlusIcon from "../icons/plusIcon";

type GuestTypeProps = {
  guestType: "adults" | "children" | "infants" | "pets"; // Specify guest type options
  description: string;
  numberOfGuests: number;
  setNumberOfGuests: React.Dispatch<
    React.SetStateAction<{
      adults: number;
      children: number;
      infants: number;
      pets: number;
    }>
  >;
};

const GuestType: React.FC<GuestTypeProps> = ({
  guestType,
  description,
  setNumberOfGuests,
  numberOfGuests,
}) => {
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex-col flex ">
        <h1 className="font-roboto text-xl">
          {String(guestType).charAt(0).toUpperCase() +
            String(guestType).slice(1)}
        </h1>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex gap-3 items-center">
        <button
          className=" rounded-full border h-10 w-10 flex items-center justify-center "
          onClick={() =>
            setNumberOfGuests((prev) => ({
              ...prev,
              [guestType]: Math.max(0, prev[guestType] - 1),
            }))
          }
          disabled={numberOfGuests <= 0}
        >
          <MinusIcon />
        </button>
        <span>{numberOfGuests}</span>
        <button
          className=" rounded-full border h-10 w-10 flex items-center justify-center "
          onClick={() =>
            setNumberOfGuests((prev) => ({
              ...prev,
              [guestType]: prev[guestType] + 1,
            }))
          }
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default GuestType;
