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
