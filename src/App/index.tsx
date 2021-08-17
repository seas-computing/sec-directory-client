import './App.css';
import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';
import { useState } from 'react';
import { VIEW } from './views';
import Welcome from '../Welcome';
import OnScreenKeyboard from '../Keyboard';
import {
  appName,
  welcomeBannerText,
  welcomeInstructions
} from './text';

const App = () => {
  const [searchInput, setSearchInput] = useState('');

  const [currentView] = useState<VIEW>(VIEW.WELCOME);
  return (
    <div className="app">
      <Header>{appName}</Header>
      <Main>
        {currentView === VIEW.WELCOME && (
          <Welcome bannerText={welcomeBannerText}>
            {welcomeInstructions}
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
