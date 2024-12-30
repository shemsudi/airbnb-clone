const UserProfileData = ({
  question,
  onClick,
  value,
}: {
  question: { icon: JSX.Element; title: string };
  onClick: () => void;
  value?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex  gap-3 rounded-md hover:bg-neutral-100 py-6 px-3 border-b"
    >
      <div>{question.icon}</div>
      <div className="  font-medium text-gray-500 text-lg">
        {question.title}{" "}
        {value ? <span className="text-gray-800"> {": " + value}</span> : ""}
      </div>
    </div>
  );
};

export default UserProfileData;
