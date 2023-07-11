import { onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  type CreateStore,
  type WindowSetInterval,
  type WindowClearInterval,
  type OnCleanupFunction,
} from '../../types';

type UseTimeHookArgFormat = '24-hour' | '12-hour';
type UseTimeHookArgs = { format?: UseTimeHookArgFormat };
type UseTimeHookReturnValue = {
  seconds: string;
  minutes: string;
  hours: string;
  ampm: string;
};
type UseTimeHook = (args?: UseTimeHookArgs) => UseTimeHookReturnValue;

/**
 * @description Displays current time
 */
export const useTime = (
  (
    Date: DateConstructor,
    setInterval: WindowSetInterval,
    clearInterval: WindowClearInterval,
    createStore: CreateStore,
    onCleanup: OnCleanupFunction
  ) =>
  (args: UseTimeHookArgs = {}) => {
    if (args.format == null) {
      args.format = '24-hour';
    }

    const getLocaleTimeString = (Date: DateConstructor) =>
      new Date().toLocaleTimeString('en-US', {
        hour12: false,
      });
    type GetLocaleTimeStringFunction = typeof getLocaleTimeString;

    const date = {
      value: getLocaleTimeString(Date),
    };
    type DateValue = typeof date;

    const getHours = (date: DateValue) =>
      args.format === '12-hour'
        ? `${+`${date.value[0]}${date.value[1]}` % 12}`.padStart(2, '0')
        : `${date.value[0]}${date.value[1]}`;
    type GetHoursFunction = typeof getHours;

    const getAmPm = (date: DateValue) =>
      +`${date.value[0]}${date.value[1]}` > 12 ? 'PM' : 'AM';
    type GetAmPmFunction = typeof getAmPm;

    const timeStore = createStore<UseTimeHookReturnValue>({
      seconds: `${date.value[6]}${date.value[7]}`,
      minutes: `${date.value[3]}${date.value[4]}`,
      hours: getHours(date),
      ampm: getAmPm(date),
    });
    type TimeStore = typeof timeStore;

    const tick = (
      (
        timeStore: TimeStore,
        date: DateValue,
        Date: DateConstructor,
        getLocaleTimeString: GetLocaleTimeStringFunction,
        getHours: GetHoursFunction,
        getAmPm: GetAmPmFunction
      ) =>
      () => {
        date.value = getLocaleTimeString(Date);

        timeStore[1]('seconds', `${date.value[6]}${date.value[7]}`);
        timeStore[1]('minutes', `${date.value[3]}${date.value[4]}`);
        timeStore[1]('hours', getHours(date));
        timeStore[1]('ampm', getAmPm(date));
      }
    )(timeStore, date, Date, getLocaleTimeString, getHours, getAmPm);

    const intervalID = setInterval(tick, 1000);

    onCleanup(() => {
      clearInterval(intervalID);
    });

    return timeStore[0];
  }
)(
  Date,
  globalThis.setInterval,
  globalThis.clearInterval,
  createStore,
  onCleanup
) as UseTimeHook;
