// export const calculateSeconds = (value: number): string => '';
// export type CalculateSecondsFunction = typeof calculateSeconds;

// export const calculateMinutes = (value: number): string => '';
// export type CalculateMinutesFunction = typeof calculateMinutes;

/**
 * @description
 * Calculate hours in string.
 *
 * @example
 * calculateHours(ms); // '34'
 */
export const calculateHours = (milliseconds: number): string =>
  `${~~((milliseconds / (1000 * 60 * 60)) % 24)}`.padStart(2, '0');
export type CalculateHoursFunction = typeof calculateHours;

/**
 * @description
 * Calculate days in string.
 *
 * @example
 * calculateDays(ms); // '23'
 */
export const calculateDays = (milliseconds: number): string =>
  `${~~(milliseconds / (1000 * 60 * 60 * 24))}`.padStart(2, '0');
export type CalculateDaysFunction = typeof calculateDays;

/**
 * @description
 * Calculate weeks in string.
 *
 * @example
 * calculateWeeks(ms); // '87'
 */
export const calculateWeeks = (milliseconds: number): string =>
  `${~~(milliseconds / (1000 * 7 * 24 * 60 * 60))}`.padStart(2, '0');
export type CalculateWeeksFunction = typeof calculateWeeks;

/**
 * @description
 * Calculate month in string.
 *
 * @example
 * calculateMonth(ms); // '04'
 */
export const calculateMonth = (milliseconds: number): string =>
  `${~~(milliseconds / ((1000 * 7 * 24 * 60 * 60) / 12))}`.padStart(2, '0');
export type CalculateMonthFunction = typeof calculateMonth;


/*
  seconds: `${~~((m / 1000) % 60)}`.padStart(2, '0')
  minutes: `${~~((m / 60000) % 60)}`.padStart(2, '0'), Math.floor(m / 60000)
*/