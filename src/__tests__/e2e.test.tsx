import App from '../App';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import algoliasearch from 'algoliasearch/lite';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID, ALGOLIA_HITS_PER_PAGE, ALGOLIA_INDEX } from '../const';
import { SearchIndex } from 'algoliasearch/lite';
import { DirectoryEntry } from '../SearchResults';
import { Hit } from '@algolia/client-search';

describe.only('End to End testing', function () {
  let index: SearchIndex

  beforeEach(function () {
    // Initialize a connection to algolia and render the App
    const client = algoliasearch(
      ALGOLIA_APP_ID,
      ALGOLIA_API_KEY
    );
    index = client.initIndex(ALGOLIA_INDEX);
    render(<App />);
  })

  describe('Searching for a specific name', function () {
    let searchResult: Hit<DirectoryEntry>;

    beforeEach(async function () {
      // Pull the first name in the list to search
      const result = await index.search<DirectoryEntry>('', {
        hitsPerPage: 1,
      });
      searchResult = result.hits[0];
    });

    it('Should return exactly that one result', async function () {
      // Touch the background to open the keyboard
      await act(async () => {
        userEvent.click(screen.getByText(/Touch/));
      });
      await screen.findByRole('dialog');

      // click through the characters in the keyboard
      searchResult.name.split('').forEach((char) => {
        if (char === ' ') {
          act(() => {
            //Space bar is the only blank key
            userEvent.click(screen.getByRole('button', { name: '' }));
          });
        } else if (/[A-Z]/.exec(char)) {
          // Need to press Shift first for capital letters
          act(() => {
            userEvent.click(screen.getAllByText('shift')[0]);
          });
          act(() => {
            userEvent.click(screen.getByText(char));
          });
        } else {
          act(() => {
            userEvent.click(screen.getByText(char));
          });
        }
      });
      act(() => {
        userEvent.click(screen.getByText('search'));
      });

      // Make sure the name and number of results are shown
      const resultsDescriptions = await screen.findAllByText('1 result for:');
      expect(resultsDescriptions).toHaveLength(2);
      const queryDescriptions = await screen.findAllByText(`"${searchResult.name}"`);
      expect(queryDescriptions).toHaveLength(2);

      // Check that the name and location appear in the results
      expect(screen.queryByRole('list')).toBeInTheDocument();
      const results = screen.queryAllByRole('listitem');
      expect(results).toHaveLength(1);
      expect(within(results[0]).getByText(searchResult.name)).toBeInTheDocument();
      expect(within(results[0]).getByText(searchResult.location)).toBeInTheDocument();

      // Check that the pagination buttons don't appear
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
      expect(screen.queryByText('Prev')).not.toBeInTheDocument();
    });

  });

  describe('Searches that return many results', function (){
    let firstPage: Hit<DirectoryEntry>[];
    let secondPage: Hit<DirectoryEntry>[];
    let totalHits: number;

    beforeEach(async function () {
      // Get the first two pages worth of results manually
      const result = await index.search<DirectoryEntry>('', {
        page: 0,
        hitsPerPage: ALGOLIA_HITS_PER_PAGE,
      });
      firstPage = result.hits;
      totalHits = result.nbHits;
      const nextResult = await index.search<DirectoryEntry>('', {
        page: 1,
        hitsPerPage: ALGOLIA_HITS_PER_PAGE,
      });
      secondPage = nextResult.hits;
    });

    it('Should return a paginated list of results', async function () {
      // Open the keyboard
      act(() => {
        userEvent.click(screen.getByText(/Touch/));
      });
      await screen.findByRole('dialog');
      // Send a blank search, returning everyone
      act(() => {
        userEvent.click(screen.getByText('search'));
      });

      // Make sure it shows the total number of hits
      const resultsDescriptions = await screen.findAllByText(`${totalHits} results for:`);
      expect(resultsDescriptions).toHaveLength(2);
      const queryDescriptions = await screen.findAllByText('""');
      expect(queryDescriptions).toHaveLength(2);
      expect(screen.queryByRole('list')).toBeInTheDocument();

      // Make sure we have the correct number of results per page
      const results = screen.queryAllByRole('listitem');
      expect(results).toHaveLength(ALGOLIA_HITS_PER_PAGE);

      // Make sure the same results are all shown here
      firstPage.forEach((hit, index) => {
        expect(within(results[index]).getByText(hit.name)).toBeInTheDocument();
        expect(within(results[index]).getByText(hit.location)).toBeInTheDocument();
      });

      // Click the Next button
      const nextButtons = await screen.findAllByText('Next');
      expect(nextButtons).toHaveLength(2);
      expect(screen.queryByText('Prev')).not.toBeInTheDocument();
      act(() => {
        userEvent.click(nextButtons[0]);
      });

      // Make sure the second page of results is accurate
      await screen.findByText(secondPage[0].name);
      const nextResults = screen.queryAllByRole('listitem');
      expect(nextResults).toHaveLength(ALGOLIA_HITS_PER_PAGE);
      secondPage.forEach((hit, index) => {
        expect(within(nextResults[index]).getByText(hit.name)).toBeInTheDocument();
        expect(within(nextResults[index]).getByText(hit.location)).toBeInTheDocument();
      });

      // Click the previous button
      const prevButtons = await screen.findAllByText('Prev');
      expect(prevButtons).toHaveLength(2);
      act(() => {
        userEvent.click(prevButtons[0]);
      });

      // Make sure we're still getting the same first page
      await screen.findByText(firstPage[0].name)
      const prevResults = screen.queryAllByRole('listitem');
      expect(prevResults.map(({textContent}) => textContent))
        .toEqual(results.map(({textContent}) => textContent));
    });
  });

  describe('Searches that return no results', function () {
    it('Should not show any results', async function () {
      // Search for a random string of gibberish
      const fakeSearchString = 'zxcvasdf12345ghaf453hadf';
      await act(async () => {
        userEvent.click(screen.getByText(/Touch/));
      });
      await screen.findByRole('dialog');
      await act(async () => {
        fakeSearchString.split('').forEach((char) => {
          userEvent.click(screen.getByText(char));
        });
      });
      act(() => {
        userEvent.click(screen.getByText('search'));
      });

      // Make sure there are no results
      const resultsDescriptions = await screen.findAllByText('0 results for:');
      expect(resultsDescriptions).toHaveLength(2);
      const queryDescriptions = await screen.findAllByText(fakeSearchString, { exact: false });
      expect(queryDescriptions).toHaveLength(2);
      expect(screen.queryByRole('list')).toBeInTheDocument();
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

      // Make sure there are no pagination buttons 
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
      expect(screen.queryByText('Prev')).not.toBeInTheDocument();
    });
  });
});
