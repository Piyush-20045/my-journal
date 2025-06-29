import { useSearch } from "../SearchContext";

const Search = ({ mode }) => {
  const {
    searchValues,
    setSearchValues,
    filterDates,
    setFilterDates,
  } = useSearch();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValues((prev) => ({ ...prev, [mode]: value}))
  };
  const handleDate = (e) => {
    const value = e.target.value;
    setFilterDates((prev) => ({ ...prev, [mode]: value}))
  }

  return (
    <div className="mx-6 mb-5 mt-3 md:my-3 flex flex-col sm:flex-row gap-2 md:gap-4">
      {/* SEARCH INPUT */}
      <div className="sm:w-9/12 px-2 flex items-center flex-grow bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500">
        <svg
          className="search-icon h-5 w-5 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search journals..."
          className="w-full p-2 focus:outline-none cursor-pointer"
          value={searchValues[mode]}
          onChange={handleSearch}
        />
      </div>

      {/* DATE INPUT */}
      <div className="flex items-center bg-gray-100">
        {filterDates[mode] === "" ? (
          <label className="sm:hidden absolute w-29 ml-9 text-gray-500 pointer-events-none ">
            Select Date
          </label>
        ) : null}
        <input
          type="date"
          className="flex w-full sm:w-fit px-8 md:px-2 py-2 text-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          value={filterDates[mode]}
          onChange={handleDate}
        />
        <img src="/date.svg" className="md:hidden ml-2 absolute h-5 w-5" />
      </div>
    </div>
  );
};

export default Search;
