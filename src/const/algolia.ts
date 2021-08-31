/**
 * Read and export the Algolia configuration values from the local environment.
 * In local development these should be set in the `.env` file in the project
 * root (see `.env.example` for more details on each)
 */

/**
 * A search-only/secured API key from Algolia
 */
export const ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY || '';

/**
 * The Algolia App ID that should be used
 */
export const ALGOLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID || '';

/**
 * The Algolia index against which we'll be searching
 */
export const ALGOLIA_INDEX = process.env.REACT_APP_ALGOLIA_INDEX || '';

/**
 * The number of results we want to show per page
 */
export const ALGOLIA_HITS_PER_PAGE = 8;
