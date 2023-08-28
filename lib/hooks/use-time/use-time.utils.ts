/**
 * @description
 * Get AM/PM from a date/
 *
 * @example
 * getAMPM(new Date()) // 'AM'
 */
export const getAMPM = (
  (format: Intl.DateTimeFormat['format']) =>
  (date: Parameters<Intl.DateTimeFormat['format']>[0]) => {
    const dateAsString = format(date);

    return dateAsString[9] + dateAsString[10];
  }
)(
  Intl.DateTimeFormat('en-US', {
    second: '2-digit',
    minute: '2-digit',
    hour: '2-digit',
    hour12: true,
  }).format
);
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
