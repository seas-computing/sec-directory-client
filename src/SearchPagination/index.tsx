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
   return (
     <div className="search-pagination--wrapper">
       {currentRefinement > 1 && (
         <button
           className="search-pagination--button button__prev"
           onPointerDown={(evt) => {
             evt.stopPropagation();
             refine(currentRefinement - 1);
           }}
         >
           Prev
         </button>
       )}
       <div className="search-pagination--count-wrapper">
         {children}
       </div>
       {nbPages > currentRefinement && (
         <button
           className="search-pagination--button button__next"
           onPointerDown={(evt) => {
             evt.stopPropagation();
             refine(currentRefinement + 1);
           }}
         >
          Next
         </button>
       )}
     </div>
   );
}

export default connectPagination(SearchPagination);
