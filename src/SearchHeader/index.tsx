import { ReactNode } from "react";
import './SearchHeader.css';

interface SearchHeaderProps {
  /** The actual message that will appear in the Welcome section */
  children: ReactNode;
}

const SearchHeader = ({ children }: SearchHeaderProps) => (
  <div className="search-results--header">
    <div className="search-results--message">
      <p className="search-results--message-text">
        {children}
      </p>
    </div>
  </div>
);

export default SearchHeader;
