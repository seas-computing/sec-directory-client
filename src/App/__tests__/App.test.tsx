import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '..';
import {
  RELOAD_INTERVAL_MS,
  WELCOME_BANNER,
  WELCOME_INSTRUCTIONS
} from '../../const';

describe('App', function () {
  describe('Conditional Rendering', function () {
    describe('On Initial render', function () {
      beforeEach(function () {
        render(<App />);
      });
      it('Should show the Welcome message', function () {
        expect(screen.getByText(WELCOME_BANNER))
          .toBeInTheDocument();
      });
      it('Should show the instructions', function () {
        expect(screen.getByText(WELCOME_INSTRUCTIONS))
          .toBeInTheDocument();
      });
    });
  });
  describe('Reloading Timeout', function () {
    const { location: originalLocation } = window;
    // replacing window.location as described in https://remarkablemark.org/blog/2018/11/17/mock-window-location/
    beforeAll(function () {
      // We can ignore this error because we're replacing location with mocked
      // implementation immediately
      // @ts-expect-error
      delete window.location;
      window.location = { ...originalLocation, reload: jest.fn() };
    });
    afterAll(function () {
      window.location = originalLocation;
    });
    beforeEach(function () {
      jest.useFakeTimers('modern')
      render(<App />);
    });
    afterEach(function () {
      jest.resetAllMocks();
    });
    it('Should reload the page if interval elapses without activity', function () {
      jest.advanceTimersByTime(RELOAD_INTERVAL_MS * 1.25 );
      expect(window.location.reload).toHaveBeenCalled();
    });
    it('Should restart the interval after any activity', function () {
      //Get halfway through the timer
      jest.advanceTimersByTime(RELOAD_INTERVAL_MS * 0.5);
      //Open the keyboard
      fireEvent.pointerDown(document.body);
      // Go 75% through the new timer, so we should be at total 125% of our
      // elapsed time
      jest.advanceTimersByTime(RELOAD_INTERVAL_MS * 0.75);
      expect(window.location.reload).not.toHaveBeenCalled();
      // Now let the full timer time elapse
      jest.advanceTimersByTime(RELOAD_INTERVAL_MS);
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
