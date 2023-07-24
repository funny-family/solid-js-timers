/**
 * @description
 * Calculate milliseconds in string.
 *
 * @example
 * calculateMilliseconds(ms); // '87'
 */
export const calculateMilliseconds = (milliseconds: number): string =>
  `${milliseconds || '00'}`.padStart(2, '0').slice(-2);
export type CalculateMillisecondsFunction = typeof calculateMilliseconds;

/**
 * @description
 * Calculate seconds in string.
 *
 * @example
 * calculateSeconds(ms); // '32'
 */
export const calculateSeconds = (milliseconds: number): string =>
  `${~~((milliseconds % 60000) / 1000)}`.padStart(2, '0');
export type CalculateSecondsFunction = typeof calculateSeconds;

/**
 * @description
 * Calculate minutes in string.
 *
 * @example
 * calculateMinutes(ms); // '12'
 */
export const calculateMinutes = (milliseconds: number) =>
  `${~~(milliseconds / 60000)}`.padStart(2, '0');
export type CalculateMinutesFunction = typeof calculateMinutes;
