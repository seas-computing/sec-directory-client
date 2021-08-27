import { connectStateResults, StateResultsProvided } from "react-instantsearch-core";

/**
  * Displays the total number of search hits, along with the query that was searched
  */

export const SearchCount = ({ searchResults }: Partial<StateResultsProvided>) => {
  if (searchResults) {
    const { nbHits, query } = searchResults;
    return (
     <>
        <p className="search-pagination--count">
          {`${nbHits} result${nbHits === 1 ? '' : 's'} for:`}
        </p>
        <p className="search-pagination--query">
          {`"${query}"`}
        </p>
      </>
    );
  } 
  return null;
};

export default connectStateResults(SearchCount);
