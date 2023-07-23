export const calculateSeconds = (milliseconds: number): string =>
  `${~~((milliseconds % 60000) / 1000)}`.padStart(2, '0');
export type CalculateSecondsFunction = typeof calculateSeconds;

export const calculateMinutes = (milliseconds: number) =>
  `${~~(milliseconds / 60000)}`.padStart(2, '0');
export type CalculateMinutesFunction = typeof calculateMinutes;

const getSeconds = (milliseconds: number) =>
  `${~~((milliseconds % 60000) / 1000)}`.padStart(2, '0');
type GetSecondsFunction = typeof getSeconds;

// ==============================

const getMinutes = (
  (getSeconds: GetSecondsFunction) => (milliseconds: number) =>
    `${~~(getSeconds(milliseconds))}`
)(getSeconds);
