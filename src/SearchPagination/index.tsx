import { ReactNode } from "react";
import { connectPagination } from "react-instantsearch-dom";
import './SearchPagination.css';

/**
* Describes the props that the connectPagination HOC will expose to the
* underlying component
*/
interface SearchPaginationProps {
  /** The page currently shown */
  currentRefinement: number;
  /** The total Number of pages */
  nbPages: number;
  /** the function to move to a new page */
  refine: (arg0: number) => void;
  /**
   * content that should appear between the buttons, used to show the total
   * number of results
   */
  children?: ReactNode;
}

export const SearchPagination = ({
  currentRefinement,
  nbPages,
  refine,
  children,
}: SearchPaginationProps) => {
  const nextPage = nbPages > currentRefinement
    ? currentRefinement + 1
    : null;
  const prevPage = currentRefinement > 1
    ? currentRefinement - 1
    : null;
   return (
     <div className="search-pagination--wrapper">
       {prevPage !== null && (
         <button
           className="search-pagination--button button__prev"
           onPointerDown={(evt) => {
             evt.stopPropagation();
             refine(prevPage);
           }}
         >
           Prev
         </button>
       )}
      <div className="search-pagination--count-wrapper">
         {children}
      </div>
       {nextPage !== null && (
         <button
           className="search-pagination--button button__next"
           onPointerDown={(evt) => {
             evt.stopPropagation();
             refine(nextPage);
           }}
         >
          Next
         </button>
       )}
     </div>
   );
}

export default connectPagination(SearchPagination);
