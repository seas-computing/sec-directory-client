import { render, screen } from '@testing-library/react';
import App from '..';
import { welcomeBannerText, welcomeInstructions } from '../../App/text';

describe('App', function () {
  describe('Conditional Rendering', function () {
    describe('On Initial render', function () {
      beforeEach(function () {
        render(<App />);
      });
      it('Should show the Welcome message', function () {
        expect(screen.getByText(welcomeBannerText))
          .toBeInTheDocument();
      });
      it('Should show the instructions', function () {
        expect(screen.getByText(welcomeInstructions))
          .toBeInTheDocument();
      });
    });
  });
});
