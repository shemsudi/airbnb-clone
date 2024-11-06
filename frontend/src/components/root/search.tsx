import SearchIcon from "../icons/searchIcon";

const Search = () => {
  return (
    <div className="flex flex-shrink gap-2 border rounded-full py-2 px-4 shadow-md translate-x-8 ">
      <div className="flex self-center">Anywhere</div>
      <div className="border-r-2"></div>
      <div className="flex self-center">Any week</div>
      <div className="border-r-2"></div>
      <div className="flex self-center">Add guests</div>
      <button className="bg-primary rounded-3xl text-white p-1">
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;
