import SearchIcon from "../icons/searchIcon";
import FilterIcon from "../icons/icons/filterIcon";

const MdScreenHeader = () => {
  return (
    <>
      <div className=" hidden max-md:flex mx-10 my-4 p-2 gap-3  border-b-2">
        <button className=" border flex-grow rounded-full p-2 flex items-center gap-3">
          <SearchIcon />
          <div className="flex flex-col items-start">
            <h1 className="font-roboto">Where to?</h1>
            <p className="text-gray-500">Anywhere . Anyweek . Addguests</p>
          </div>
        </button>
        <div className=" w-16 flex justify-center items-center rounded-full  border">
          <FilterIcon />
        </div>
      </div>
    </>
  );
};

export default MdScreenHeader;
