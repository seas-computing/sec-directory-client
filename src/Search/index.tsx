import algoliasearch from 'algoliasearch/lite';
import { useEffect } from 'react';
import { InstantSearch, Hits, Configure, connectSearchBox } from 'react-instantsearch-dom';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX } from '../const';

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

interface searchProps {
  /** The text to search against algolia */
  searchQuery: string;
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
* provided by the searchQuery prop and displays the results
*/
const Search = ({ searchQuery }: searchProps) => {
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
        <Hits />
    </InstantSearch>);
}

export default Search;
