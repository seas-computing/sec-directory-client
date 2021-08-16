import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './Keyboard.css';
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {DISPLAY_WIDTH, DISPLAY_HEIGHT } from '../const/display';

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
}: OnScreenKeyboardProps) => {
  /**
   * Whether the keyboard should be shown on screen
   */
  const [isVisible, setVisible] = useState(true);

  /**
   * The X,Y coordinates on the page at which the keyboard should be rendered
   */
  const [coordinates, setCoordinates] = useState<[number, number]>([540, 960]);

const keyboardModalRef = useRef<HTMLDivElement>(null);

  const otherKeyHandler = (button: string) => {
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

  useLayoutEffect(() => {
    const modal = keyboardModalRef.current;
    const [xTap, yTap] = coordinates;
    if (isVisible && modal !== null) {
      const keyboardWidth = modal.clientWidth;
      const keyboardHeight = modal.clientHeight;
      // Make sure that the tap position coordinates wouldn't render the keyboard outside the screen
      const leftEdge = xTap - keyboardWidth/2;
      const topEdge = yTap - keyboardHeight/2;
      const leftPosition = Math.min(
        Math.max(0, leftEdge),
        DISPLAY_WIDTH - keyboardWidth
      );
      const topPosition = Math.min(
        Math.max(0, topEdge),
        DISPLAY_HEIGHT - keyboardHeight
      )
      modal.style.left = `${leftPosition}px`;
      modal.style.top = `${topPosition}px`;
    }
  }, [isVisible, coordinates, keyboardModalRef]);

  if (isVisible) {
    return createPortal((
      <div className="keyboard--backdrop">
        <div className="keyboard--modal" ref={keyboardModalRef}>
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
              onClick={() => {setVisible(false)}}
            >
              cancel
            </button>
            <button
              className="keyboard--search-button"
              onClick={triggerSearchHandler}
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
