/**
 * @description
 * Convert milliseconds from number to string.
 *
 * @example
 * calculateMillisecondsAsString(75); // '75'
 */
export const calculateMillisecondsAsString = (milliseconds: number): string =>
  `${milliseconds}`.padStart(2, '0').slice(-2);
export type CalculateMillisecondsAsStringFunction =
  typeof calculateMillisecondsAsString;

/**
 * @description
 * Calculate seconds in string.
 *
 * @example
 * calculateSeconds(ms); // 32
 */
export const calculateSeconds = (milliseconds: number): number =>
  ~~((milliseconds % 60000) / 1000);
export type CalculateSecondsFunction = typeof calculateSeconds;

/**
 * @description
 * Calculate minutes in string.
 *
 * @example
 * calculateMinutes(ms); // 12
 */
export const calculateMinutes = (milliseconds: number): number =>
  ~~(milliseconds / 60000);
export type CalculateMinutesFunction = typeof calculateMinutes;

/**
 * @description
 * Converts number to string and add zero at the start.
 *
 * @example
 * padZeroToNumber(4); // '04'
 */
export const padZeroToNumber = (number: number) => `${number}`.padStart(2, '0');
export type PadZeroToNumberFunction = typeof padZeroToNumber;
