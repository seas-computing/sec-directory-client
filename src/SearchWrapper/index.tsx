import algoliasearch from 'algoliasearch/lite';
import { ReactNode, useEffect } from 'react';
import { InstantSearch, Configure, connectSearchBox } from 'react-instantsearch-dom';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX } from '../const';

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

interface SearchProps {
  /** The text to search against algolia */
  searchQuery: string;
  /** The components that will display the actual search results */
  children: ReactNode;
}

/**
* The InstantSearch library only runs the actual search when the refine
* function in the SearchBox component is called, so we have a null version of
* the SearchBox to handle that for us 
*/

const Query = connectSearchBox(
  ({currentRefinement, refine}) => {
  useEffect(() => {refine(currentRefinement)});
  return null;
});

/**
* Wrapper around the Algolia InstantSearch components that just runs the query
* provided by the searchQuery prop. Display of the results is handled by the
* children components
*/
const SearchWrapper = ({ searchQuery, children }: SearchProps) => {
  return (
    <InstantSearch 
      searchClient={searchClient}
      indexName={ALGOLIA_INDEX}
      refresh
    >
      <Query defaultRefinement={searchQuery} />
      <Configure
        hitsPerPage={8}
        analytics={false}
        enablePersonalization={false}
        distinct
      />
        {children}
    </InstantSearch>);
}

export default SearchWrapper;
