import { createContext, useContext, useEffect, useState } from "react";
import { usePost } from "./postContext";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const { journals, publicJournals } = usePost();
  // state for search and filter
  const [searchValues, setSearchValues] = useState({ private: "", public: "" });
  const [filterDates, setFilterDates] = useState({ private: "", public: "" });
  const [filteredJournals, setFilteredJournals] = useState([]); //filtered private journals
  const [publicFilteredJournals, setPublicFilteredJournals] = useState([]); // filtered public ''

  // applying search and filter logic for private journals
  useEffect(() => {
    const filtered = journals.filter((journal) => {
      const matchesSearch =
        journal.title.toLowerCase().includes(searchValues.private.toLowerCase()) ||
        journal.content.toLowerCase().includes(searchValues.private.toLowerCase());

      const matchesDate = filterDates.private ? journal.date === filterDates.private : true;

      return matchesSearch && matchesDate;
    });
    setFilteredJournals(filtered);
  }, [searchValues.private, filterDates.private, journals]);

  // applying search and filter logic for public journals
  useEffect(() => {
    const filtered = publicJournals.filter((journal) => {
      const matchesSearch =
        journal.title.toLowerCase().includes(searchValues.public.toLowerCase()) ||
        journal.content.toLowerCase().includes(searchValues.public.toLowerCase());

      const matchesDate = filterDates.public ? filterDates.public === journal.date : true;

      return matchesSearch && matchesDate;
    });
    setPublicFilteredJournals(filtered);
  }, [searchValues.public, filterDates.public, publicJournals]);

  return (
    <SearchContext.Provider
      value={{
        searchValues,
        setSearchValues,
        filterDates,
        setFilterDates,
        filteredJournals, //private journals
        publicFilteredJournals, //public journals
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export function useSearch() {
  return useContext(SearchContext);
}
