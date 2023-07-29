import type {
  UseTimeHookHookListenerArgs,
  UseTimeHookReturnValue,
} from './use-time.types';
import type { Writable } from '../../types';

/**
 * @description
 * Get AM/PM from a date/
 *
 * @example
 * getAMPM(new Date()) // 'AM'
 */
export const getAMPM = (date: Date): string => {
  const savedDate = date.toLocaleTimeString('en-US', {
    hour12: true,
    second: '2-digit',
    minute: '2-digit',
    hour: '2-digit',
  });

  return savedDate[9] + savedDate[10];
};
export type GetAMPM = typeof getAMPM;

/**
 * @description
 * Get preferred language of the user.
 *
 * @example
 * getCurrentLocale() // 'en'
 */
export const getCurrentLocale = (
  (navigator: Navigator) => () =>
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language
)(globalThis.navigator);
export type GetCurrentLocale = typeof getCurrentLocale;

/**
 * @description
 * Update object of listener arguments.
 *
 * @example
 * updateListenerAugmentsOf(updateListenerArgs, timeStore);
 */
export const updateListenerAugmentsOf = (
  args: Writable<UseTimeHookHookListenerArgs>,
  timeStore: UseTimeHookReturnValue
) => {
  args.utcSeconds = timeStore.utcSeconds;
  args.utcMinutes = timeStore.utcMinutes;
  args.utcHours = timeStore.utcHours;
  args.localSeconds = timeStore.localSeconds;
  args.localMinutes = timeStore.localMinutes;
  args.localHours = timeStore.localHours;
  args.localeTimeString = timeStore.localeTimeString;
  args.ampm = timeStore.ampm;
  args.isRunning = timeStore.isRunning;
};
export type UpdateListenerAugmentsOf = typeof updateListenerAugmentsOf;
