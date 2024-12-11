interface FooterItemProps {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
}
const FooterItem: React.FC<FooterItemProps> = ({ icon, label, onClick }) => {
  return (
    <button
      className="flex flex-col items-center justify-center"
      onClick={onClick}
    >
      {icon}
      <p className="text-sm">{label}</p>
    </button>
  );
};

export default FooterItem;
