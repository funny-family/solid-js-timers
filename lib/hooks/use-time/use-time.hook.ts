import { onCleanup } from 'solid-js';
import { createMutable } from 'solid-js/store';
import type {
  WindowSetInterval,
  WindowClearInterval,
  OnCleanupFunction,
  CreateMutable,
  RequireAtLeastOne,
} from '../../types';

type UseTimeHookArgFormat = '24-hour' | '12-hour';

type UseTimeHookArgs = { format?: UseTimeHookArgFormat };

type UseTimeHookHookListenerArgs = Pick<
  UseTimeHookReturnValue,
  'seconds' | 'minutes' | 'hours' | 'ampm'
>;

type UseTimeHookListenerCallback = (
  args: Readonly<UseTimeHookHookListenerArgs>
) => void;

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
    setInterval: WindowSetInterval,
    clearInterval: WindowClearInterval,
    createMutable: CreateMutable,
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

    const timeStore = createMutable<UseTimeHookReturnValue>({
      seconds: `${date.value[6]}${date.value[7]}`,
      minutes: `${date.value[3]}${date.value[4]}`,
      hours: getHours(date),
      ampm: getAmPm(date),
      onUpdate: null as unknown as UseTimeHookReturnValue['onUpdate'],
    });
    type TimeStore = typeof timeStore;

    const updateListeners = Array<UseTimeHookListenerCallback>();
    type UpdateListeners = typeof updateListeners;
    timeStore.onUpdate = (callback) => {
      updateListeners.push(callback);
    };

    const tick = (
      (
        timeStore: TimeStore,
        date: DateValue,
        Date: DateConstructor,
        getLocaleTimeString: GetLocaleTimeStringFunction,
        getHours: GetHoursFunction,
        getAmPm: GetAmPmFunction,
        updateListeners: UpdateListeners
      ) =>
      () => {
        date.value = getLocaleTimeString(Date);

        timeStore.seconds = `${date.value[6]}${date.value[7]}`;
        timeStore.minutes = `${date.value[3]}${date.value[4]}`;
        timeStore.hours = getHours(date);
        timeStore.ampm = getAmPm(date);

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
      timeStore,
      date,
      Date,
      getLocaleTimeString,
      getHours,
      getAmPm,
      updateListeners
    );

    const intervalID = setInterval(tick, 1000);

    onCleanup(() => {
      clearInterval(intervalID);
    });

    return timeStore;
  }
)(
  Date,
  globalThis.setInterval,
  globalThis.clearInterval,
  createMutable,
  onCleanup
) as UseTimeHook;
