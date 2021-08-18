import './App.css';
import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';
import { useEffect, useState } from 'react';
import Welcome from '../Welcome';
import OnScreenKeyboard from '../Keyboard';
import {
  VIEW,
  APP_NAME,
  WELCOME_BANNER,
  WELCOME_INSTRUCTIONS,
  RELOAD_INTERVAL_MS
} from '../const';

const App = () => {
  const [searchInput, setSearchInput] = useState('');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [currentView] = useState<VIEW>(VIEW.WELCOME);

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
        <OnScreenKeyboard
          isVisible={isKeyboardVisible}
          setVisible={setKeyboardVisible}
          searchQuery={searchInput}
          searchUpdateHandler={setSearchInput}
          triggerSearchHandler={() => {console.log(`SEARCH: ${searchInput}`)}}
        /> 
      </Main>
      <Footer />
    </div>
  );
};

export default App;
