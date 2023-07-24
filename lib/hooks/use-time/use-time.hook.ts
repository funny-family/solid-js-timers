import { type CurrentTimeConstructor, CurrentTime } from './current-time';
import { onMount, onCleanup } from 'solid-js';
import { createMutable } from 'solid-js/store';
import {
  type CalculateHoursFunction,
  type GetLocaleTimeStringFunction,
  calculateHours,
  getLocaleTimeString,
} from './use-time.utils';
import type {
  UseTimeHook,
  UseTimeHookArgs,
  UseTimeHookHookListenerArgs,
  UseTimeHookListenerCallback,
  UseTimeHookReturnValue,
} from './use-time.types';
import type {
  OnCleanupFunction,
  CreateMutable,
  Writeable,
  OnMountFunction,
} from '../../types';

/**
 * @description Displays current time
 */
export const useTime = (
  (
    CurrentTime: CurrentTimeConstructor,
    calculateHours: CalculateHoursFunction,
    getLocaleTimeString: GetLocaleTimeStringFunction,
    createMutable: CreateMutable,
    onMount: OnMountFunction,
    onCleanup: OnCleanupFunction
  ) =>
  (args: Required<UseTimeHookArgs> = {} as any) => {
    if (args.hourCycle == null) {
      args.hourCycle = 'h24';
    }

    if (args.autoClearListeners == null) {
      args.autoClearListeners = true;
    }

    if (args.autoClearInterval == null) {
      args.autoClearInterval = true;
    }

    let startListeners = Array<UseTimeHookListenerCallback>();
    let stopListeners = Array<UseTimeHookListenerCallback>();
    let updateListeners = Array<UseTimeHookListenerCallback>();

    const currentTime = new CurrentTime();
    // let localeTimeString = getLocaleTimeString(currentTime.date);
    const localeTimeString = getLocaleTimeString(currentTime.date);
    const timeStore = createMutable<UseTimeHookReturnValue>({
      seconds: localeTimeString[6] + localeTimeString[7],
      minutes: localeTimeString[3] + localeTimeString[4],
      hours: calculateHours(localeTimeString, args.hourCycle, 0),
      ampm: localeTimeString[9] + localeTimeString[10],
      isRunning: currentTime.isRunning,
      start: currentTime.start,
      stop: currentTime.stop,
      onStart: (callback) => {
        startListeners.push(callback);
      },
      onStop: (callback) => {
        stopListeners.push(callback);
      },
      onUpdate: (callback) => {
        updateListeners.push(callback);
      },
    });

    const listenerArgs: Writeable<UseTimeHookHookListenerArgs> = {
      seconds: timeStore.seconds,
      minutes: timeStore.minutes,
      hours: timeStore.hours,
      ampm: timeStore.ampm,
      isRunning: timeStore.isRunning,
    };

    currentTime.onStart(() => {
      // localeTimeString = getLocaleTimeString(currentTime.date);

      timeStore.isRunning = currentTime.isRunning;
      // console.log({ timeStore, localeTimeString });

      // const listenerArgs: Writeable<UseTimeHookHookListenerArgs> = {
      //   seconds: timeStore.seconds,
      //   minutes: timeStore.minutes,
      //   hours: timeStore.hours,
      //   ampm: timeStore.ampm,
      //   isRunning: timeStore.isRunning,
      // };

      if (startListeners.length === 1) {
        startListeners[0](listenerArgs);
      }

      if (startListeners.length > 1) {
        for (let i = 0; i < startListeners.length; i++) {
          startListeners[0](listenerArgs);
        }
      }
    });

    currentTime.onStop(() => {
      const localeTimeString = getLocaleTimeString(currentTime.date);

      timeStore.seconds = localeTimeString[6] + localeTimeString[7];
      timeStore.minutes = localeTimeString[3] + localeTimeString[4];
      timeStore.hours = calculateHours(localeTimeString, args.hourCycle, 0);
      timeStore.ampm = localeTimeString[9] + localeTimeString[10];
      timeStore.isRunning = currentTime.isRunning;

      // const listenerArgs: Writeable<UseTimeHookHookListenerArgs> = {
      //   seconds: timeStore.seconds,
      //   minutes: timeStore.minutes,
      //   hours: timeStore.hours,
      //   ampm: timeStore.ampm,
      //   isRunning: timeStore.isRunning,
      // };

      if (stopListeners.length === 1) {
        stopListeners[0](listenerArgs);
      }

      if (stopListeners.length > 1) {
        for (let i = 0; i < stopListeners.length; i++) {
          stopListeners[0](listenerArgs);
        }
      }
    });

    currentTime.onUpdate(() => {
      const localeTimeString = getLocaleTimeString(currentTime.date);

      timeStore.seconds = localeTimeString[6] + localeTimeString[7];
      timeStore.minutes = localeTimeString[3] + localeTimeString[4];
      timeStore.hours = calculateHours(localeTimeString, args.hourCycle, 0);
      timeStore.ampm = localeTimeString[9] + localeTimeString[10];
      timeStore.isRunning = currentTime.isRunning;

      // const listenerArgs: Writeable<UseTimeHookHookListenerArgs> = {
      //   seconds: timeStore.seconds,
      //   minutes: timeStore.minutes,
      //   hours: timeStore.hours,
      //   ampm: timeStore.ampm,
      //   isRunning: timeStore.isRunning,
      // };

      listenerArgs.seconds = timeStore.seconds;
      listenerArgs.minutes = timeStore.minutes;
      listenerArgs.hours = timeStore.hours;
      listenerArgs.ampm = timeStore.ampm;
      listenerArgs.isRunning = timeStore.isRunning;

      if (updateListeners.length === 1) {
        updateListeners[0](listenerArgs);
      }

      if (updateListeners.length > 1) {
        for (let i = 0; i < updateListeners.length; i++) {
          updateListeners[0](listenerArgs);
        }
      }
    });

    onMount(() => {
      currentTime.start();
    });

    onCleanup(() => {
      if (args.autoClearListeners) {
        startListeners = Array();
        stopListeners = Array();
        updateListeners = Array();
      }

      if (args.autoClearInterval && currentTime.intervalID != null) {
        currentTime.clearInterval();
      }
    });

    console.log({
      timeStore,
      listener: {
        startListeners,
        stopListeners,
        updateListeners,
      },
    });

    return timeStore;
  }
)(
  CurrentTime,
  calculateHours,
  getLocaleTimeString,
  createMutable,
  onMount,
  onCleanup
) as UseTimeHook;
