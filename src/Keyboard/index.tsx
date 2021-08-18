import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './Keyboard.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DISPLAY_WIDTH, DISPLAY_HEIGHT } from '../const';

interface OnScreenKeyboardProps {
  /**
   * The text that's currently being searched
   */
  searchQuery: string;
  /**
   * A handler to update the search text
   */
  searchUpdateHandler: (arg0: string) => void;
  /**
   * A handler to initiate a search
   */
  triggerSearchHandler: () => void;
  /**
  * Whether to show the keyboard on screen
  */
  isVisible: boolean;
  /**
  * Toggle the visibility of the keyboard
  */
  setVisible: (arg0: boolean) => void;
}



/**
* Enum for handling the casing of the keyboard
*/
enum CASE {
  /** lowercase layout */
  DEFAULT,
  /** next character uppercase, then back to lowercase */
  SHIFTED,
  /** uppercase layout */
  LOCKED,
  /** next character lowercase, then back to uppercase */
  UNSHIFTED,
}

const OnScreenKeyboard = ({
  searchQuery,
  searchUpdateHandler,
  triggerSearchHandler,
  isVisible,
  setVisible,
}: OnScreenKeyboardProps) => {

  /**
   * Set a ref to the modal for updating placement, etc.
   */
  const keyboardModalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  /**
   * The X,Y coordinates on the page at which the center point of the keyboard
   * should be rendered
   */
  const [coordinates, setCoordinates] = useState<[number, number]>(
    [DISPLAY_WIDTH/2, DISPLAY_HEIGHT/2]
  );

  /**
   * Handle setting the event listener to open the keyboard when clicking on
   * the body, then close it when clicking outside the modal
   */
  useEffect(() => {
    if (isVisible) {
      const background = backdropRef.current;
      const closeKeyboard = (evt: MouseEvent) => {
        if (evt.target === background) {
          searchUpdateHandler('');
          setVisible(false);
        }
      };
      if (background) {
        background.addEventListener('click', closeKeyboard);
      }
      return(() => {
        if (background) {
           background.removeEventListener('click', closeKeyboard);
        }
      });
    }
    const openKeyboard = (evt: MouseEvent) => {
      setVisible(true);
      setCoordinates([evt.clientX, evt.clientY]);
    };
    document.body.addEventListener('click', openKeyboard);
    return(() => {
      document.body.removeEventListener('click', openKeyboard);
    })
  }, [
    isVisible,
    setVisible,
    setCoordinates,
    backdropRef,
    searchUpdateHandler,
  ]);

  /**
  * Handles the Capitalization state of the keyboard
  */
  const [keyboardCase, setKeyboardCase] = useState<CASE>(CASE.DEFAULT);

  /**
   * Handles the logic for controlling the non-input keys, i.e shift, caps, and
   * enter.
   * The capitalization is not built into the keyboard library unfortunately,
   * and I think that leaving out the upper/lower case functionality might be
   * more confusing for users.
   */

  const otherKeyHandler = (button: string) => {
    // Trigger a search on enter
    if (button === '{enter}') {
      setVisible(false);
      searchUpdateHandler('');
      triggerSearchHandler();
    }
    setKeyboardCase((currentCase) => {
      switch(currentCase) {
        case CASE.DEFAULT: {
          if (button === '{shift}') {
            return CASE.SHIFTED;
          }
          if (button === '{lock}') {
            return CASE.LOCKED;
          }
          return CASE.DEFAULT;
        }
        case CASE.SHIFTED: {
          if (button === '{shift}') {
            return CASE.DEFAULT;
          }
          if (button === '{lock}') {
            return CASE.LOCKED;
          }
          return CASE.DEFAULT;
        }
        case CASE.UNSHIFTED: {
          if (button === '{shift}') {
            return CASE.LOCKED;
          }
          if (button === '{lock}') {
            return CASE.DEFAULT;
          }
          return CASE.LOCKED;
        }
        case CASE.LOCKED: {
          if (button === '{shift}') {
            return CASE.UNSHIFTED;
          }
          if (button === '{lock}') {
            return CASE.DEFAULT;
          }
          return CASE.LOCKED;
        }
        default:
          return currentCase;
      }
    });
  };

  /**
   * Calculate the position closest to the touch coordinates without rendering
   * the keyboard offscreen.
   */
  useLayoutEffect(() => {
    const modal = keyboardModalRef.current;
    const [xTap, yTap] = coordinates;
    if (isVisible && modal !== null) {
      const keyboardWidth = modal.clientWidth;
      const keyboardHeight = modal.clientHeight;
      const leftEdge = xTap - keyboardWidth/2;
      const topEdge = yTap - keyboardHeight/2;
      const leftPosition = Math.min(
        Math.max(0, leftEdge),
        DISPLAY_WIDTH - keyboardWidth
      );
      const topPosition = Math.min(
        Math.max(0, topEdge),
        DISPLAY_HEIGHT - keyboardHeight
      );
      modal.style.left = `${leftPosition}px`;
      modal.style.top = `${topPosition}px`;
    }
  }, [isVisible, coordinates, keyboardModalRef]);

  if (isVisible) {
    return createPortal((
      <div className="keyboard--backdrop" ref={backdropRef}>
        <div role="dialog" className="keyboard--modal" ref={keyboardModalRef}>
          <div className="keyboard--search-container">
            <label
              className="keyboard--search-input-label"
              htmlFor="search-query"
            >
              Search Query
            </label>
            <input
              name="search-query"
              type="text"
              className="keyboard--search-input"
              placeholder="Search for a person or place"
              defaultValue={searchQuery}
            />
          </div>
          <div className="keyboard--keyboard-container">
            <Keyboard
              onChange={searchUpdateHandler}
              onKeyPress={otherKeyHandler}
              layoutName={
                [CASE.LOCKED, CASE.SHIFTED].includes(keyboardCase)
                  ? 'shift'
                  : 'default'
              }
              theme="hg-theme-default hg-layout-default keyboard--component"
              useButtonTag
            />
          </div>
          <div className="keyboard--buttons">
            <button
              className="keyboard--cancel-button"
              onClick={() => {
                searchUpdateHandler('');
                setVisible(false);
              }}
            >
              cancel
            </button>
            <button
              className="keyboard--search-button"
              onClick={() => {
                triggerSearchHandler();
                setVisible(false);
                searchUpdateHandler('');
              }}
            >
              search
            </button>
          </div>
        </div>
      </div>
    ), document.body);
  }
  return null;
};

export default OnScreenKeyboard;
