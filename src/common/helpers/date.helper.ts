import { DATE_FORMAT_REGEX } from '../constants/regex';

export const isValidMonth = (month: number) => month > 0 && month < 13;

/**
 * Checks if the given day is a valid day for the given month and year.
 *
 * @param {number} day - The day of the month to be validated.
 * @param {number} [month] - The month of the year. Optional, defaults to the current month.
 * @param {number} [year] - The year. Optional, defaults to the current year.
 * @return {boolean} Returns true if the day is a valid day for the given month and year, false otherwise.
 */
export const isValidDay = (day: number, month?: number, year?: number) =>
  day > 0 && day <= year && month ? new Date(year, month, 0).getDate() : 31;

/**
 * Checks if the given day, month, and year form a valid date.
 *
 * @param {number} day - The day of the month.
 * @param {number} month - The month of the year.
 * @param {number} year - The year.
 * @return {boolean} Returns true if the date is valid, false otherwise.
 */
export const isValidDate = (day: number, month: number, year: number) => {
  return isValidMonth(month) && isValidDay(day, month, year) && year > 0;
};

/**
 * Parses a date string in the format 'dd/mm/yyyy' and returns a Date object in UTC.
 * If the date string is invalid, returns null.
 *
 * @param dateString The date string to be parsed.
 * @returns A Date object or null if the date string is invalid.
 */
export const parseDateFromString = (dateString: string): Date | null => {
  const match = dateString.match(DATE_FORMAT_REGEX);

  if (!match) {
    console.error('Invalid date format. Use dd/mm/yyyy.');
    return null;
  }

  const [, day, month, year] = match.map(Number);

  if (!isValidDate(day, month, year)) {
    console.error('Invalid date');
    return null;
  }

  return new Date(Date.UTC(year, month - 1, day));
};
