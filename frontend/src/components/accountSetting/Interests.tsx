import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InterestsProps {
  handleItemClick: (questionTag: string) => void;
  interests: string[];
}

const Interests: React.FC<InterestsProps> = ({
  handleItemClick,
  interests,
}) => {
  return (
    <div className="mt-10 border-b flex flex-col">
      <h1 className="text-3xl font-medium">What you're into</h1>
      <p className="text-gray-500 font-normal  text-lg">
        Find common ground with other guests and Hosts by adding interests to
        your profile.
      </p>
      <div className="flex gap-4 my-4 flex-wrap">
        {interests
          ? interests.map((interest, index) => (
              <div
                key={index}
                className="border border-gray-300 px-4 py-2 rounded-full"
              >
                {interest}
              </div>
            ))
          : Array(3)
              .fill(0)
              .map((_, index) => (
                <button
                  onClick={() => handleItemClick("whatYouAreInto")}
                  key={index}
                  className="border border-dashed border-spacing-3 border-gray-500 py-2 px-5 rounded-full w-24"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="size-6 text-gray-500"
                  />
                </button>
              ))}
      </div>

      <div
        onClick={() => handleItemClick("whatAreYouInto")}
        className="underline mb-8"
      >
        Add interests
      </div>
    </div>
  );
};

export default Interests;
