export const calculateMilliseconds = (milliseconds: number): string =>
  `${milliseconds || '00'}`.padStart(2, '0').slice(-2);
export type CalculateMillisecondsFunction = typeof calculateMilliseconds;

export const calculateSeconds = (milliseconds: number): string =>
  `${~~((milliseconds % 60000) / 1000)}`.padStart(2, '0');
export type CalculateSecondsFunction = typeof calculateSeconds;

export const calculateMinutes = (milliseconds: number) =>
  `${~~(milliseconds / 60000)}`.padStart(2, '0');
export type CalculateMinutesFunction = typeof calculateMinutes;
