import { ReactNode } from "react";
import './SearchHeader.css';

interface SearchHeaderProps {
  /** The text that will display in the banner */
  bannerText: ReactNode;
  /** The actual message that will appear in the Welcome section */
  children: ReactNode;
}

const SearchHeader = ({bannerText, children}: SearchHeaderProps) => (
  <div className="search-results--header">
    <div className="search-results--banner">
      <h2 className="search-results--banner-text">
        {bannerText}
      </h2>
    </div>
    <div className="search-results--message">
      <p className="search-results--message-text">
        {children}
      </p>
    </div>
  </div>
);

export default SearchHeader;
