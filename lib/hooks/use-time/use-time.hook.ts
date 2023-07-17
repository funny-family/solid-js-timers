import { onCleanup } from 'solid-js';
import { createMutable } from 'solid-js/store';
import {
  getLocaleTimeString,
  getHours,
  getAmPm,
  type GetLocaleTimeStringFunction,
  type GetHoursFunction,
  type GetAmPmFunction,
} from './utils';
import type {
  WindowSetInterval,
  WindowClearInterval,
  OnCleanupFunction,
  CreateMutable,
  RequireAtLeastOne,
  AutoClearableListeners,
} from '../../types';

export type UseTimeHookArgFormat = '24-hour' | '12-hour';

type UseTimeHookArgs = {
  format?: UseTimeHookArgFormat;
} & Partial<AutoClearableListeners>;

type UseTimeHookHookListenerArgs = Readonly<
  Pick<UseTimeHookReturnValue, 'seconds' | 'minutes' | 'hours' | 'ampm'>
>;

type UseTimeHookListenerCallback = (args: UseTimeHookHookListenerArgs) => void;

type UseTimeHookListener = (callback: UseTimeHookListenerCallback) => void;

type UseTimeHookReturnValue = {
  seconds: string;
  minutes: string;
  hours: string;
  ampm: string;
  onUpdate: UseTimeHookListener;
};

type UseTimeHook = (
  args?: RequireAtLeastOne<UseTimeHookArgs>
) => Readonly<UseTimeHookReturnValue>;

/**
 * @description Displays current time
 */
export const useTime = (
  (
    Date: DateConstructor,
    getLocaleTimeString: GetLocaleTimeStringFunction,
    getHours: GetHoursFunction,
    getAmPm: GetAmPmFunction,
    setInterval: WindowSetInterval,
    clearInterval: WindowClearInterval,
    createMutable: CreateMutable,
    onCleanup: OnCleanupFunction
  ) =>
  (args: Required<UseTimeHookArgs> = {} as any) => {
    if (args.format == null) {
      args.format = '24-hour';
    }
    const date = {
      value: getLocaleTimeString(Date),
    };
    type DateValue = typeof date;

    const updateListeners = Array<UseTimeHookListenerCallback>();
    type UpdateListeners = typeof updateListeners;

    const timeStore = createMutable<UseTimeHookReturnValue>({
      seconds: `${date.value[6]}${date.value[7]}`,
      minutes: `${date.value[3]}${date.value[4]}`,
      hours: getHours(date.value, args.format),
      ampm: getAmPm(date.value),
      onUpdate: (callback) => {
        updateListeners.push(callback);
      },
    });
    type TimeStore = typeof timeStore;

    const tick = (
      (
        format: NonNullable<UseTimeHookArgFormat>,
        date: DateValue,
        getLocaleTimeString: GetLocaleTimeStringFunction,
        getHours: GetHoursFunction,
        getAmPm: GetAmPmFunction,
        updateListeners: UpdateListeners,
        Date: DateConstructor,
        timeStore: TimeStore
      ) =>
      () => {
        date.value = getLocaleTimeString(Date);

        timeStore.seconds = `${date.value[6]}${date.value[7]}`;
        timeStore.minutes = `${date.value[3]}${date.value[4]}`;
        timeStore.hours = getHours(date.value, format);
        timeStore.ampm = getAmPm(date.value);

        const listenerArgs: UseTimeHookHookListenerArgs = {
          seconds: timeStore.seconds,
          minutes: timeStore.minutes,
          hours: timeStore.hours,
          ampm: timeStore.ampm,
        };

        if (updateListeners.length === 1) {
          updateListeners[0](listenerArgs);
        }

        if (updateListeners.length > 1) {
          for (let i = 0; i < updateListeners.length; i++) {
            updateListeners[i](listenerArgs);
          }
        }
      }
    )(
      args.format,
      date,
      getLocaleTimeString,
      getHours,
      getAmPm,
      updateListeners,
      Date,
      timeStore
    );

    const intervalID = setInterval(tick, 1000);

    onCleanup(() => {
      clearInterval(intervalID);
    });

    return timeStore;
  }
)(
  Date,
  getLocaleTimeString,
  getHours,
  getAmPm,
  setInterval,
  clearInterval,
  createMutable,
  onCleanup
) as UseTimeHook;
