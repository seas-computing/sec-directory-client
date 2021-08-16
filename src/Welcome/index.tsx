import { ReactNode } from "react";
import './Welcome.css';

interface WelcomeProps {
  /** The text that will display in the banner */
  bannerText: ReactNode;
  /** The actual message that will appear in the Welcome section */
  children: ReactNode;
}

const Welcome = ({bannerText, children}: WelcomeProps) => (
  <div className="app-welcome">
    <div className="app-welcome--banner">
      <h2 className="app-welcome--banner-text">
        {bannerText}
      </h2>
    </div>
    <div className="app-welcome--message">
      <p className="app-welcome--message-text">
        {children}
      </p>
    </div>
  </div>
);

export default Welcome;
