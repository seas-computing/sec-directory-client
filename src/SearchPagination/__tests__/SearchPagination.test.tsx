import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchPagination } from '..';

describe('Search Pagination', function () {
  describe('rendering', function () {
    describe('With only one page', function () {
      beforeEach(function () {
        render(<SearchPagination
          currentRefinement={1}
          nbPages={1}
          refine={jest.fn()}
        />);
      });
      it('Should not render the next button', function () {
        expect(screen.queryByText('Next')).not.toBeInTheDocument();
      });
      it('Should not render the prev button', function () {
        expect(screen.queryByText('Prev')).not.toBeInTheDocument();
      });
    });
    describe('On the first page', function () {
      beforeEach(function () {
        render(<SearchPagination
          currentRefinement={1}
          nbPages={2}
          refine={jest.fn()}
        />);
      });
      it('Should render the next button', function () {
        expect(screen.queryByText('Next')).toBeInTheDocument();
      });
      it('Should not render the prev button', function () {
        expect(screen.queryByText('Prev')).not.toBeInTheDocument();
      });
    });
    describe('On the last page', function () {
      beforeEach(function () {
        render(<SearchPagination
          currentRefinement={2}
          nbPages={2}
          refine={jest.fn()}
        />);
      });
      it('Should not render the next button', function () {
        expect(screen.queryByText('Next')).not.toBeInTheDocument();
      });
      it('Should render the prev button', function () {
        expect(screen.queryByText('Prev')).toBeInTheDocument();
      });
    });
    describe('Between two pages', function () {
      beforeEach(function () {
        render(<SearchPagination
          currentRefinement={2}
          nbPages={3}
          refine={jest.fn()}
        />);
      });
      it('Should render the next button', function () {
        expect(screen.queryByText('Next')).toBeInTheDocument();
      });
      it('Should render the prev button', function () {
        expect(screen.queryByText('Prev')).toBeInTheDocument();
      });
    });
  });
  describe('Changing pages', function () {
    let fakeRefine: jest.Mock;
    beforeEach(function () {
      fakeRefine = jest.fn();
      render(<SearchPagination
        currentRefinement={2}
        nbPages={3}
        refine={fakeRefine}
      />);
    });
    it('Should switch to page three when pressing the next button', function () {
      userEvent.click(screen.getByText('Next'));
      expect(fakeRefine).toHaveBeenCalledWith(3);
    });
    it('Should switch to page one when pressing the prev button', function () {
      userEvent.click(screen.getByText('Prev'));
      expect(fakeRefine).toHaveBeenCalledWith(1);
    });
  });
});
