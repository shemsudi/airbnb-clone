const PlusOrMinus = ({ size = 24, color = "currentColor", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path fill="none" d="M16 4v16m-8-8h16M8 26h16" />
    </svg>
  );
};
export default PlusOrMinus;
