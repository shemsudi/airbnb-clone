interface AccountCardProps {
  title: string;
  description: string;
  icon?: JSX.Element;
  onClick: () => void;
}

const AccountCard: React.FC<AccountCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex hover:cursor-pointer shadow-lg rounded-lg flex-col  p-6 border"
    >
      <div className="mb-7">{icon}</div>
      <div className=" text-xl font-medium">{title}</div>
      <div className="text-gray-500 text-lg">{description}</div>
    </div>
  );
};

export default AccountCard;
