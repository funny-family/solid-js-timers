import type { UseTimeHookArgFormat } from './use-time.types';

/**
 * @description
 * Calculate hours in string.
 *
 * @example
 * calculateHours('02:32:43 PM', 'h12', 0); // '02'
 * calculateHours('02:32:43 PM', 'h24', 0); // '14'
 */
export const calculateHours = (
  localeTimeString: string,
  hourCycle: NonNullable<UseTimeHookArgFormat>,
  hoursAsNumber: number
): string => {
  if (hourCycle === 'h12') {
    return localeTimeString[0] + localeTimeString[1];
  }

  hoursAsNumber = +(localeTimeString[0] + localeTimeString[1]);

  if (
    localeTimeString[9] + localeTimeString[10] === 'AM' &&
    hoursAsNumber === 12
  ) {
    return `${hoursAsNumber - 12}`.padStart(2, '0');
  }

  if (
    localeTimeString[9] + localeTimeString[10] === 'PM' &&
    hoursAsNumber < 12
  ) {
    return `${hoursAsNumber + 12}`.padStart(2, '0');
  }

  return `${hoursAsNumber}`;
};
export type CalculateHoursFunction = typeof calculateHours;

/**
 * @description
 * Get converted time string.
 *
 * @example
 * getLocaleTimeString(new Date()) // 02:30:19 PM
 */
export const getLocaleTimeString = (date: Date): string =>
  date.toLocaleTimeString('en-US', {
    hour12: true,
    second: '2-digit',
    minute: '2-digit',
    hour: '2-digit',
  });
export type GetLocaleTimeStringFunction = typeof getLocaleTimeString;
