import React from "react";

interface CustomSearchBarProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearch: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  value,
  onChange,
  onSearch,
}) => {
  return (
    <div
      style={{
        zIndex: 1000,
        padding: "0.5rem",
      }}
      className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3/5 flex"
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search for a location..."
        className="flex-grow p-2 rounded-l-lg border border-gray-300 shadow-md"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-lg shadow-md hover:bg-blue-600 transition duration-200"
      >
        Search
      </button>
    </div>
  );
};

export default CustomSearchBar;
