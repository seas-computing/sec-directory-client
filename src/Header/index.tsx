import './Header.css';
import headerLogo from './header_seas_logo.png';
import bannerBackground from './banner.jpg';

interface HeaderProps {
  /** The application title that will be displayed **/
  children: string;
}

/**
 * A static header componet that renders the school logo and banner image, along
 * with the title of the app
 */


const Header = ({ children }: HeaderProps) => (
  <div className="app-header">
    <div className="app-header--logo-wrapper">
      <img
        className="app-header--logo"
        src={headerLogo}
        alt="Harvard John A. Paulson School of Engineering and Applied Sciences"
      />
    </div>
    <div className="app-header--title-wrapper">
      <h1 className="app-header--title">{children}</h1>
      <img
        className="app-header--title-image"
        src={bannerBackground}
        alt="A computer screen rendering a 3D simulation alongside commands in a terminal"
      />
    </div>
  </div>
);

export default Header;
