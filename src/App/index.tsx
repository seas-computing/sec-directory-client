import './App.css';
import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';
import { useState } from 'react';
import Welcome from '../Welcome';
import OnScreenKeyboard from '../Keyboard';
import {
  VIEW,
  APP_NAME,
  WELCOME_BANNER,
  WELCOME_INSTRUCTIONS,
} from '../const';

const App = () => {
  const [searchInput, setSearchInput] = useState('');

  const [currentView] = useState<VIEW>(VIEW.WELCOME);
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
