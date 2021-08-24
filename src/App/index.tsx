import './App.css';
import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';
import { useEffect, useRef, useState } from 'react';
import Welcome from '../Welcome';
import SearchHeader from '../SearchHeader';
import SearchWrapper from '../SearchWrapper';
import SearchResults from '../SearchResults';
import SearchPagination from '../SearchPagination';
import OnScreenKeyboard from '../Keyboard';
import {
  VIEW,
  DISPLAY_WIDTH,
  DISPLAY_HEIGHT,
  APP_NAME,
  WELCOME_BANNER,
  WELCOME_INSTRUCTIONS,
  RELOAD_INTERVAL_MS
} from '../const';

const App = () => {
  /**
   * The current value to search for
   */
  const [searchInput, setSearchInput] = useState('');

  /**
   * Whether the keyboard should be displayed
   */
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  /**
   * The content that should be shown in the Main section
   */
  const [currentView, setView] = useState<VIEW>(VIEW.RESULTS);

  /**
   * A reference to the background div, used for adding/removing event handlers
   */
  const keyboardBackgroundRef = useRef<HTMLDivElement>(null);

  /**
   * The X,Y coordinates on the page at which the center point of the keyboard
   * should be rendered
   */
  const [keyboardCoordinates, setKeyboardCoordinates] = useState<[number, number]>(
    [DISPLAY_WIDTH/2, DISPLAY_HEIGHT/2]
  );

  /**
   * Handle setting the event listener to open the keyboard when clicking on
   * the body, then close it when clicking outside the modal
   */
  useEffect(() => {
    if (isKeyboardVisible) {
      const background = keyboardBackgroundRef.current;
      const closeKeyboard = (evt: MouseEvent) => {
        if (evt.target === background) {
          setKeyboardVisible(false);
        }
      };
      if (background) {
        background.addEventListener('pointerdown', closeKeyboard);
      }
      return(() => {
        if (background) {
          background.removeEventListener('pointerdown', closeKeyboard);
        }
      });
    }
    const openKeyboard = (evt: MouseEvent) => {
      setSearchInput('');
      setKeyboardVisible(true);
      setKeyboardCoordinates([evt.clientX, evt.clientY]);
      setView(VIEW.SEARCH);
    };
    document.body.addEventListener('pointerdown', openKeyboard);
    return(() => {
      document.body.removeEventListener('pointerdown', openKeyboard);
    })
  }, [
    isKeyboardVisible,
    setKeyboardVisible,
    setKeyboardCoordinates,
    keyboardBackgroundRef,
    setSearchInput,
  ]);

  /**
   * Reload the window if interval elapses with no activity
   */
  useEffect(() => {
    const tid = window.setTimeout(
      () => {
        window.location.reload()
      },
      RELOAD_INTERVAL_MS
    );
    return () => {
      window.clearTimeout(tid);
    };
  });

  return (
    <div className="app">
      <Header>{APP_NAME}</Header>
      <Main>
        {currentView === VIEW.WELCOME && (
          <Welcome bannerText={WELCOME_BANNER}>
            {WELCOME_INSTRUCTIONS}
          </Welcome>
        )}
        {currentView === VIEW.RESULTS && (
          <SearchWrapper
            searchQuery={searchInput}
          >
            <SearchHeader>
              {WELCOME_INSTRUCTIONS}
            </SearchHeader>
            <SearchPagination />
            <SearchResults />
            <SearchPagination />
          </SearchWrapper>
        )}
        <OnScreenKeyboard
          backdropRef={keyboardBackgroundRef}
          coordinates={keyboardCoordinates}
          isVisible={isKeyboardVisible}
          closeKeyboard={() => {
            setKeyboardVisible(false)
            setView(VIEW.WELCOME);
          }}
          searchQuery={searchInput}
          searchUpdateHandler={setSearchInput}
          triggerSearchHandler={() => {
            setKeyboardVisible(false);
            setView(VIEW.RESULTS)
          }}
        /> 
      </Main>
      <Footer />
    </div>
  );
};

export default App;
