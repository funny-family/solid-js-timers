/**
 * @description
 * Calculate remanding seconds form milliseconds.
 *
 * @example
 * calculateSeconds(milliseconds); // 21
 */
export const calculateSeconds = (milliseconds: number): number =>
  ~~(milliseconds / 1000) % 60;
export type CalculateSeconds = typeof calculateSeconds;

/**
 * @description
 * Calculate remanding minutes form milliseconds.
 *
 * @example
 * calculateMinutes(milliseconds); // 55
 */
export const calculateMinutes = (milliseconds: number): number =>
  ~~(milliseconds / 1000 / 60) % 60;
export type CalculateMinutes = typeof calculateMinutes;

/**
 * @description
 * Calculate remanding hours form milliseconds.
 *
 * @example
 * calculateHours(milliseconds); // 13
 */
export const calculateHours = (milliseconds: number): number =>
  ~~(milliseconds / 1000 / 60 / 60) % 24;
export type CalculateHour = typeof calculateHours;

/**
 * @description
 * Calculate remanding days form milliseconds.
 *
 * @example
 * calculateDays(milliseconds); // 92
 */
export const calculateDays = (milliseconds: number): number =>
  ~~(milliseconds / 1000 / 60 / 60 / 24);
export type CalculateDays = typeof calculateDays;
