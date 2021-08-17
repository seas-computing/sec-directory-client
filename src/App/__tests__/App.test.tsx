import { render, screen } from '@testing-library/react';
import App from '..';
import {
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
});
