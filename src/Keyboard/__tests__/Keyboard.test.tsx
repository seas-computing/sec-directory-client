import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../../App';

// Mocks out a very basic version of the algolia searchClient
jest.mock('algoliasearch/lite', () => () => ({
  search: () => {return []},
}));

describe('Keyboard', function () {
  describe('Opening/Closing the keyboard', function () {
    beforeEach(function () {
      render(<App />);
    });
    describe('On initial render', function () {
      it('Should not initially appear', function () {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
    describe('After clicking on document.body', function () {
      beforeEach(function() {
        act(() => {
          userEvent.click(document.body);
        });
      });
      it('Should appear after clicking on the body', async function () {
        expect(screen.queryByRole('dialog')).toBeInTheDocument();
      });
      describe('After clicking outside the modal', function () {
        beforeEach(function() {
          act(() => {
            userEvent.click(document.querySelector('.keyboard--backdrop')!);
          });
        });
        it('Should disappear', function () {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
      })
      describe('After clicking cancel', function () {
        beforeEach(function() {
          act(() => {
            userEvent.click(screen.getByText('cancel'));
          });
        });
        it('Should disappear', function () {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
      });
      describe('After clicking enter', function () {
        beforeEach(function() {
          act(() => {
            userEvent.click(screen.getByText('< enter'));
          });
        });
        it('Should disappear', function () {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
      });
      describe('After clicking Search', function() {
        beforeEach(function() {
          act(() => {
            userEvent.click(screen.getByText('search'));
          });
        });
        it('Should disappear', function () {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
      });
    });
  });
  describe('Input display', function () {
    beforeEach(function () {
      render(<App />);
      act(() => {
        userEvent.click(document.body);
      });
    });
    it('Should display the text entered in the keys', function () {
      act(() => {
        userEvent.click(screen.getByText('s'))
        userEvent.click(screen.getByText('e'))
        userEvent.click(screen.getByText('a'))
        userEvent.click(screen.getByText('s'))
      });
      expect(screen.getByRole('textbox')).toHaveValue('seas');
    });
  });
  describe('Upper- and lower-case handling', function () {
    beforeEach(function () {
      render(<App />)
      act(() => {
        userEvent.click(document.body);
      });
    });
    it('Should initially be lowercase', async function () {
      const lowercase = await screen.findByText('a');
      expect(lowercase).toBeInTheDocument();
      const capital = screen.queryByText('Z');
      expect(capital).not.toBeInTheDocument();
    });
    it('should display nothing in the input', function () {
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
    describe('Pressing Shift', function () {
      beforeEach(function() {
        act(() => {
          userEvent.click(screen.getAllByText('shift')[0]);
        });
      });
      it('Should not change the input value', function () {
        expect(screen.getByRole('textbox')).toHaveValue('');
      });
      it('Should make the characters in the keyboard uppercase', async function () {
        const capital = await screen.findByText('A');
        expect(capital).toBeInTheDocument();
        const lowercase = screen.queryByText('z');
        expect(lowercase).not.toBeInTheDocument();
      });
      it('Should revert to lowercase after the next character is pressed', async function () {
        const capital = await screen.findByText('A');
        act(() => {
          userEvent.click(capital);
        });
        const lowercase = await screen.findByText('z');
        expect(screen.getByRole('textbox')).toHaveValue('A')
        expect(capital).not.toBeInTheDocument();
        expect(lowercase).toBeInTheDocument();
        act(() => {
          userEvent.click(lowercase);
        });
        expect(screen.getByRole('textbox')).toHaveValue('Az');
        expect(lowercase).toBeInTheDocument();
      });
      describe('Pressing Shift again', function () {
        it('Should revert to lowercase', async function () {
          act(() => {
            userEvent.click(screen.getAllByText('shift')[0]);
          });
          const lowercase = await screen.findByText('z')
          expect(lowercase).toBeInTheDocument();
          const capital = screen.queryByText('A');
          expect(capital).not.toBeInTheDocument();
        });
      });
    });
    describe('Pressing Caps Lock', function () {
      beforeEach(function() {
        act(() => {
          userEvent.click(screen.getAllByText('caps')[0]);
        });
      });
      it('Should not change the input value', function () {
        expect(screen.getByRole('textbox').textContent).toStrictEqual('');
      });
      it('Should make the characters in the keyboard uppercase', async function () {
        const capital = await screen.findByText('A');
        expect(capital).toBeInTheDocument();
        const lowercase = screen.queryByText('z');
        expect(lowercase).not.toBeInTheDocument();
      });
      it('Should stay uppercase after the next character is pressed', async function () {
        const capital = await screen.findByText('A');
        act(() => {
          userEvent.click(capital);
        });
        expect(capital).toBeInTheDocument();
        expect(await screen.findByRole('textbox')).toHaveValue('A')
        const lowercase = screen.queryByText('z');
        expect(lowercase).not.toBeInTheDocument();
        const capitalTwo = await screen.findByText('Z');
        expect(capitalTwo).toBeInTheDocument();
        act(() => {
          userEvent.click(capitalTwo);
        });
        expect(await screen.findByRole('textbox')).toHaveValue('AZ')
      });
      describe('Pressing Shift afterwards', function () {
        beforeEach(function() {
          act(() => {
            userEvent.click(screen.getAllByText('shift')[0]);
          });
        });
        it('Should make the characters in the keyboard lowercase', async function () {
          const lowercase = await screen.findByText('z');
          expect(lowercase).toBeInTheDocument();
          const capital = screen.queryByText('A');
          expect(capital).not.toBeInTheDocument();
        });
        it('Should revert to uppercase after the next character is pressed', async function () {
          const lowercase = await screen.findByText('z');
          act(() => {
            userEvent.click(lowercase);
          });
          expect(screen.getByRole('textbox')).toHaveValue('z')
          const capital = await screen.findByText('A');
          expect(lowercase).not.toBeInTheDocument();
          expect(capital).toBeInTheDocument();
          act(() => {
            userEvent.click(capital);
          });
          expect(screen.getByRole('textbox')).toHaveValue('zA');
          expect(capital).toBeInTheDocument();
        });
      });
      describe('Pressing Caps Lock again', function () {
        beforeEach(function () {
          act(() => {
            userEvent.click(screen.getByText('caps'));
          });
        });
        it('Should revert to lowercase', async function () {
          const lowercase = await screen.findByText('z')
          expect(lowercase).toBeInTheDocument();
          const capital = screen.queryByText('A');
          expect(capital).not.toBeInTheDocument();
        });
      });
    });
  });
});
