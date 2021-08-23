import { connectStateResults, StateResultsProvided } from "react-instantsearch-core";
import './SearchCount.css';

/**
  * Displays the total number of search hits, along with the query that was searched
  */

const SearchCount = ({ searchResults }: StateResultsProvided) => {
  if (searchResults) {
    const { nbHits, query } = searchResults;
    return (
      <div className="search-pagination--count-wrapper">
        <p className="search-pagination--count">
          {`${nbHits} result${nbHits === 1 ? '' : 's'} for:`}
        </p>
        <p className="search-pagination--query">
          {`"${query}"`}
        </p>
      </div>
    );
  } 
  return null;
};

export default connectStateResults(SearchCount);
