import { onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';

type UseTimeHookArgFormat = '24-hour' | '12-hour';
type UseTimeHookArgs = { format?: UseTimeHookArgFormat };
type UseTimeHookReturnValue = {
  seconds: string;
  minutes: string;
  hours: string;
  format: UseTimeHookArgFormat;
};
type UseTimeHook = (args: UseTimeHookArgs) => UseTimeHookReturnValue;

/**
 * @description Displays current time
 */
export const useTime: UseTimeHook = (args) => {
  if (args.format == null) {
    args.format = '24-hour';
  }

  const formatTimeString = (string: string) =>
    string.length === 1 ? `0${string}` : string;

  const date = { value: new Date() };
  type DateValue = typeof date;
  const seconds = (
    (date: DateValue) => () =>
      formatTimeString(date.value.getSeconds().toString())
  )(date);
  const minutes = (
    (date: DateValue) => () =>
      formatTimeString(date.value.getMinutes().toString())
  )(date);
  const hours = (
    (date: DateValue) => () =>
      formatTimeString(date.value.getHours().toString())
  )(date);

  const timeStore = createStore<UseTimeHookReturnValue>({
    seconds: seconds(),
    minutes: minutes(),
    hours: hours(),
    format: args.format,
  });

  type TimeStore = typeof timeStore;

  const tick = (
    (
      timeStore: TimeStore,
      date: DateValue,
      seconds: () => string,
      minutes: () => string,
      hours: () => string
    ) =>
    () => {
      date.value = new Date();

      timeStore[1]('seconds', seconds());
      timeStore[1]('minutes', minutes());
      timeStore[1]('hours', hours());
    }
  )(timeStore, date, seconds, minutes, hours);

  const intervalID = setInterval(tick, 1000);

  onCleanup(() => {
    clearInterval(intervalID);
  });

  return timeStore[0];
};
