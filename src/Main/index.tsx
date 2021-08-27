import { ReactNode } from 'react';
import './Main.css';

interface MainProps {
  /**
   * The content that should be displayed inside the Main section of the page
   */
  children: ReactNode
}

const Main = ({children}: MainProps) => (
 <main className="app-main">
  {children}
 </main>
);

export default Main;
