import { connectHits, HitsProvided } from 'react-instantsearch-core';
import './SearchResults.css';

/**
* Represents the data returned in a search results
*/
export interface DirectoryEntry {
  /**
   * The name of the person or place
   */
  name: string;
  /**
   * Where that person or place can be found
   */
  location: string;
}

/**
* Displays the search results as an unordered list of names and locations
*/
export const ResultsList = ({hits}: HitsProvided<DirectoryEntry>) => (
  <div className="search-results--wrapper">
    <ul className="search-results--list">
      {hits.map(({objectID, name, location}) => (
        <li key={objectID} className="search-results--list-item">
          <h3 className="search-results--name">{name}</h3>
          <p className="search-results--location">{location}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default connectHits(ResultsList);
