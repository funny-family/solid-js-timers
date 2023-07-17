import { type UseTimeHookArgFormat } from './use-time.hook';

export const getLocaleTimeString = (Date: DateConstructor) =>
  new Date().toLocaleTimeString('en-US', {
    hour12: false,
  });
export type GetLocaleTimeStringFunction = typeof getLocaleTimeString;

export const getHours = (
  value: string,
  format: NonNullable<UseTimeHookArgFormat>
) =>
  format === '12-hour'
    ? `${+`${value[0]}${value[1]}` % 12}`.padStart(2, '0')
    : `${value[0]}${value[1]}`;
export type GetHoursFunction = typeof getHours;

export const getAmPm = (value: string) =>
  +`${value[0]}${value[1]}` >= 12 ? 'PM' : 'AM';
export type GetAmPmFunction = typeof getAmPm;
