import './SearchResultsCount.css';
import { 
  connectStateResults,
  StateResultsProvided,
} from 'react-instantsearch-core';
import { CAVEAT_ALLSTON } from '../const';

const SearchResultsCount = ({ searchResults }: StateResultsProvided) => {
  if (searchResults) { 
    const { nbHits: count, query } = searchResults;
    return (
    <div className="search-results--count-wrapper">
      <p className="search-results--count">
        {`${count} search result${count === 1 ? '' : 's'} for "${query}"`}
      </p>
      <p className="search-results--caveat">
        {CAVEAT_ALLSTON}
      </p>
    </div>
  )
  }
  return null;
};

export default connectStateResults(SearchResultsCount);
