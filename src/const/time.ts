/**
 * For convenience, define the number of minutes here and convert to
 * milliseconds for the export
 */
const RELOAD_INTERVAL_MIN = 5;

/**
 * The number of milliseconds of inactivity after which the screen should
 * reload, returning to the home screen
 */
export const RELOAD_INTERVAL_MS = RELOAD_INTERVAL_MIN * 60 * 1000;
