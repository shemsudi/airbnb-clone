interface AboutYouProps {
  aboutYou: string;
  handleItemClick: (questionTag: string) => void;
}
const AboutYou: React.FC<AboutYouProps> = ({ aboutYou, handleItemClick }) => {
  return (
    <div className="mt-10 border-b">
      <h1 className="text-3xl font-bold">About you</h1>
      <div className="px-4 py-3 border border-spacing-16 border-gray-400 rounded-lg mt-8 border-dashed mb-10 flex flex-col gap-2">
        <p className="text-gray-500 font-medium  text-lg">
          Write something fun and puchy
        </p>
        {aboutYou && <div className="text-lg font-mono">{aboutYou}</div>}
        <button
          onClick={() => handleItemClick("aboutYou")}
          className="underline text-start text-black"
        >
          {" "}
          {aboutYou ? "Edit" : "Add"} intro
        </button>
      </div>
    </div>
  );
};

export default AboutYou;
