import ReactSwitch from "react-switch";
import { intialProfileDataProps } from "../../data/profileData";
import { useAppDispatch } from "../../redux/store";
import { setProfile } from "../../redux/profileActions";
interface WhereYouHaveBeenProps {
  isCheked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<intialProfileDataProps>>;
}

const WhereYouHaveBeen: React.FC<WhereYouHaveBeenProps> = ({
  isCheked,
  setIsChecked,
}) => {
  const dispatch = useAppDispatch();
  const handleChange = (checked: boolean) => {
    dispatch(setProfile({ tag: "whereYouHaveBeen", value: checked }));
    setIsChecked((prev) => {
      return { ...prev, whereYouHaveBeen: checked };
    });
  };

  return (
    <div className="mt-10 border-b flex flex-col">
      <div className="flex justify-between ">
        <div className="flex flex-col">
          <h1 className="text-3xl font-medium"> Where you've been</h1>
          <p className="text-gray-500 font-normal  text-lg">
            Choose whether other people can see all the places you’ve been on
            Airbnb.
          </p>
        </div>

        <div>
          <ReactSwitch
            checked={isCheked}
            onChange={(checked) => handleChange(checked)}
            id="switch"
          />
        </div>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar gap-4 my-8 ">
        <div className="flex flex-col items-center gap-2 ">
          <img
            src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-PassportStamps/original/ed85e67a-c172-4813-bde2-9ff3b3cdf9c9.png"
            alt="Next destination"
            style={{ stroke: "gray" }}
          />
          <div>Next destination</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img
            src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-PassportStamps/original/ed85e67a-c172-4813-bde2-9ff3b3cdf9c9.png"
            alt="Next destination"
          />
          <div>Next destination</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img
            src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-PassportStamps/original/ed85e67a-c172-4813-bde2-9ff3b3cdf9c9.png"
            alt="Next destination"
          />
          <div>Next destination</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img
            src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-PassportStamps/original/ed85e67a-c172-4813-bde2-9ff3b3cdf9c9.png"
            alt="Next destination"
          />
          <div>Next destination</div>
        </div>
      </div>
    </div>
  );
};

export default WhereYouHaveBeen;
