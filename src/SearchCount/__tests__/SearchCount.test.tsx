import { render, screen } from '@testing-library/react';
import { SearchResults } from 'react-instantsearch-core';
import { SearchCount } from '..'

describe('Search Count Description', function () {
  describe('With no results', function () {
    const testSearchResults = {
      nbHits: 0,
      query: 'nothing',
    } as SearchResults;
    it('should show "0 results for:"', function  () {
      render(<SearchCount searchResults={testSearchResults} />);
      expect(screen.getByText('0 results for:')).toBeInTheDocument();
    });
  });
  describe('With one result', function () {
    const testSearchResults = {
      nbHits: 1,
      query: 'one thing',
    } as SearchResults;
    it('should show "1 result for:"', function  () {
      render(<SearchCount searchResults={testSearchResults} />);
      expect(screen.getByText('1 result for:')).toBeInTheDocument();
    });
  });
  describe('With more than one result', function () {
    const testSearchResults = {
      nbHits: 42,
      query: 'everything',
    } as SearchResults;
    it('should show "n results for:"', function  () {
      render(<SearchCount searchResults={testSearchResults} />);
      expect(screen.getByText('42 results for:')).toBeInTheDocument();
    });
  });
  describe('With a blank query', function () {
    const testSearchResults = {
      nbHits: 42,
      query: '',
    } as SearchResults;
    it('should show ""', function  () {
      render(<SearchCount searchResults={testSearchResults} />);
      expect(screen.getByText('""')).toBeInTheDocument();
    });
  });
  describe('With a non-blank query', function () {
    const testSearchResults = {
      nbHits: 42,
      query: 'everything',
    } as SearchResults;
    it('should show the query', function  () {
      render(<SearchCount searchResults={testSearchResults} />);
      expect(screen.getByText('"everything"')).toBeInTheDocument();
    });
  });
});
