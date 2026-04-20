/**
 * Array of French month names indexed from 0 (janvier) to 11 (décembre).
 */
export const numericMonthToString = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/**
 * Converts an ISO date string into a human-readable format for task views (e.g., "15 mars").
 * 
 * @param date - The ISO date string to format.
 * @returns A string containing the day and the month name in French.
 */
export function ISODateToTaskView(date: string) {
  const isoDate = new Date(date);
  // Extract the day of the month and map the month index to the French name
  return isoDate.getDate() + " " + numericMonthToString[isoDate.getMonth()];
}

/**
 * Extracts the time from an ISO date string and formats it as "HHhMM".
 * 
 * @param date - The ISO date string to format.
 * @returns A string representing the time (e.g., "14h30").
 */
export function ISODateToTime(date: string) {
  const isoDate = new Date(date);
  /**
   * Concatenates hours and minutes with 'h' as a separator.
   * Note: Minutes are not padded with leading zeros.
   */
  return isoDate.getHours() + "h" + isoDate.getMinutes();
}
