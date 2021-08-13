import { render } from '@testing-library/react';
import Footer from '..';

describe('Footer', function () {
  describe('Copyright date', function () {
    it('Should use the current UTC year as the copyright date', function () {
      jest.useFakeTimers('modern').setSystemTime(new Date(2020, 0, 1))
      const { getByText } = render(<Footer />);
      expect(getByText(2020, {exact: false})).toBeInTheDocument();
    }); 
  });
});
