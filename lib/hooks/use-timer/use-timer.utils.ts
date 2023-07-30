export const calculateSeconds = (milliseconds: number): number =>
  ~~((milliseconds % (1000 * 60)) / 1000);
export type CalculateSeconds = typeof calculateSeconds;

export const calculateMinutes = (milliseconds: number): number =>
  ~~((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
export type CalculateMinutes = typeof calculateMinutes;

export const calculateHours = (milliseconds: number): number =>
  ~~((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
export type CalculateHour = typeof calculateHours;

export const calculateDays = (milliseconds: number): number =>
  ~~(milliseconds / 60 / 60 / 24) % 7;
export type CalculateDays = typeof calculateDays;

// var days = Math.floor(distance / (1000 * 60 * 60 * 24));
