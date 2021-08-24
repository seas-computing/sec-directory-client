import {  Hit } from 'react-instantsearch-core';
import { ResultsList, DirectoryEntry }  from '../';
import { render, screen } from '@testing-library/react';

describe('Individual Search Results', function () {
  const testHits: Hit<DirectoryEntry>[] = [
    {
      objectID: 'fefad727fe18d_dashboard_generated_id',
      name: 'John Harvard',
      location: '150 Western Avenue',
      _highlightResult: {
        name: { 
          value: 'Harvard',
          matchLevel: 'partial',
          matchedWords: ['Harvard']
        },
      },
    },
    {
      objectID: 'fd9537b2777a1_dashboard_generated_id',
      name: 'Jane Harvard',
      location: '114 Western Avenue',
      _highlightResult: {
        name: { 
          value: 'Harvard',
          matchLevel: 'partial',
          matchedWords: ['Harvard']
        },
      },
    }
  ];
  describe('When there are hits', function () {
    beforeEach(function () {
      render(<ResultsList hits={testHits} />)
    });
    test.each(
      testHits.map(({name, location}) => [name, location])
    )('Should render the name and location for %s', function (name, location) {
      expect(screen.queryByText(name)).toBeInTheDocument();
      expect(screen.queryByText(location)).toBeInTheDocument();
    });
  });
  describe('When there are no hits', function () {
    beforeEach(function () {
      render(<ResultsList hits={[]} />)
    });
    it('Should render an empty list', function () {
      expect(screen.queryByRole('list')).toBeInTheDocument();
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
  });
});
