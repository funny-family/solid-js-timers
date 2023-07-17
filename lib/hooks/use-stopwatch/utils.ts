export const calculateMilliseconds = (value: number): string =>
  `${value || '00'}`.padStart(2, '0').slice(-2);
export type CalculateMillisecondsFunction = typeof calculateMilliseconds;

export const calculateSeconds = (value: number): string =>
  `${~~((value % 60000) / 1000)}`.padStart(2, '0');
export type CalculateSecondsFunction = typeof calculateSeconds;

export const calculateMinutes = (value: number) =>
  `${~~(value / 60000)}`.padStart(2, '0');
export type CalculateMinutesFunction = typeof calculateMinutes;
