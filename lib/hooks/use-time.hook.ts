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
type UseTimeHook = (args?: UseTimeHookArgs) => UseTimeHookReturnValue;

/**
 * @description Displays current time
 */
export const useTime = ((args: UseTimeHookArgs) => {
  if (args.format == null) {
    args.format = '24-hour';
  }

  const getLocaleTimeString = (Date: DateConstructor) =>
    new Date().toLocaleTimeString('en-US', {
      hour12: args.format === '12-hour' ? true : false,
    });
  type GetLocaleTimeStringFunction = typeof getLocaleTimeString;

  const date = {
    value: getLocaleTimeString(Date),
  };
  type DateValue = typeof date;

  const timeStore = createStore<UseTimeHookReturnValue>({
    seconds: `${date.value[6]}${date.value[7]}`,
    minutes: `${date.value[3]}${date.value[4]}`,
    hours: `${date.value[0]}${date.value[1]}`,
    format: args.format,
  });
  type TimeStore = typeof timeStore;

  const tick = (
    (
      timeStore: TimeStore,
      date: DateValue,
      Date: DateConstructor,
      getLocaleTimeString: GetLocaleTimeStringFunction
    ) =>
    () => {
      date.value = getLocaleTimeString(Date);

      timeStore[1]('seconds', `${date.value[6]}${date.value[7]}`);
      timeStore[1]('minutes', `${date.value[3]}${date.value[4]}`);
      timeStore[1]('hours', `${date.value[0]}${date.value[1]}`);
    }
  )(timeStore, date, Date, getLocaleTimeString);

  const intervalID = setInterval(tick, 1000);

  onCleanup(() => {
    clearInterval(intervalID);
  });

  return timeStore[0];
}) as UseTimeHook;
