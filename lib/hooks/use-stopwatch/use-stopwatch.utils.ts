/**
 * @description
 * Calculate seconds in string.
 *
 * @example
 * calculateSeconds(ms); // 32
 */
export const calculateSeconds = (milliseconds: number): number =>
  ~~((milliseconds % 60000) / 1000);
export type CalculateSeconds = typeof calculateSeconds;

/**
 * @description
 * Calculate minutes in string.
 *
 * @example
 * calculateMinutes(ms); // 12
 */
export const calculateMinutes = (milliseconds: number): number =>
  ~~(milliseconds / 60000);
export type CalculateMinutes = typeof calculateMinutes;
