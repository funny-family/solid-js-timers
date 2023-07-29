import { onMount, onCleanup } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { type CurrentTimeConstructor, CurrentTime } from './current-time';
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

    if (args.autoClearInterval == null) {
      args.autoClearInterval = true;
    }

    if (args.autoClearTimer == null) {
      args.autoClearTimer = true;
    }

    if (args.autoClearListeners == null) {
      args.autoClearListeners = true;
    }

    if (args.autoClearListersArgs == null) {
      args.autoClearListersArgs = true;
    }

    if (args.autoClearStore == null) {
      args.autoClearStore = true;
    }

    let startListeners = Array<UseTimeHookListenerCallback>();
    let stopListeners = Array<UseTimeHookListenerCallback>();
    let updateListeners = Array<UseTimeHookListenerCallback>();

    let currentTime = new CurrentTime();
    const localeTimeString = getLocaleTimeString(currentTime.date);
    let timeStore = createMutable<UseTimeHookReturnValue>({
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

    let startListenerArgs: Writeable<UseTimeHookHookListenerArgs> = {
      seconds: timeStore.seconds,
      minutes: timeStore.minutes,
      hours: timeStore.hours,
      ampm: timeStore.ampm,
      isRunning: timeStore.isRunning,
    };

    let stopListenerArgs: Writeable<UseTimeHookHookListenerArgs> = {
      seconds: timeStore.seconds,
      minutes: timeStore.minutes,
      hours: timeStore.hours,
      ampm: timeStore.ampm,
      isRunning: timeStore.isRunning,
    };

    let updateListenerArgs: Writeable<UseTimeHookHookListenerArgs> = {
      seconds: timeStore.seconds,
      minutes: timeStore.minutes,
      hours: timeStore.hours,
      ampm: timeStore.ampm,
      isRunning: timeStore.isRunning,
    };

    currentTime.onStart(() => {
      const localeTimeString = getLocaleTimeString(currentTime.date);

      timeStore.seconds = localeTimeString[6] + localeTimeString[7];
      timeStore.minutes = localeTimeString[3] + localeTimeString[4];
      timeStore.hours = calculateHours(localeTimeString, args.hourCycle, 0);
      timeStore.ampm = localeTimeString[9] + localeTimeString[10];
      timeStore.isRunning = currentTime.isRunning;

      startListenerArgs.seconds = timeStore.seconds;
      startListenerArgs.minutes = timeStore.minutes;
      startListenerArgs.hours = timeStore.hours;
      startListenerArgs.ampm = timeStore.ampm;
      startListenerArgs.isRunning = timeStore.isRunning;

      if (startListeners.length === 1) {
        startListeners[0](startListenerArgs);
      }

      if (startListeners.length > 1) {
        for (let i = 0; i < startListeners.length; i++) {
          startListeners[i](startListenerArgs);
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

      stopListenerArgs.seconds = timeStore.seconds;
      stopListenerArgs.minutes = timeStore.minutes;
      stopListenerArgs.hours = timeStore.hours;
      stopListenerArgs.ampm = timeStore.ampm;
      stopListenerArgs.isRunning = timeStore.isRunning;

      if (stopListeners.length === 1) {
        stopListeners[0](stopListenerArgs);
      }

      if (stopListeners.length > 1) {
        for (let i = 0; i < stopListeners.length; i++) {
          stopListeners[i](stopListenerArgs);
        }
      }
    });

    currentTime.onUpdate(() => {
      const localeTimeString = getLocaleTimeString(currentTime.date);

      timeStore.seconds = localeTimeString[6] + localeTimeString[7];
      timeStore.minutes = localeTimeString[3] + localeTimeString[4];
      timeStore.hours = calculateHours(localeTimeString, args.hourCycle, 0);
      timeStore.ampm = localeTimeString[9] + localeTimeString[10];

      updateListenerArgs.seconds = timeStore.seconds;
      updateListenerArgs.minutes = timeStore.minutes;
      updateListenerArgs.hours = timeStore.hours;
      updateListenerArgs.ampm = timeStore.ampm;
      updateListenerArgs.isRunning = timeStore.isRunning;

      if (updateListeners.length === 1) {
        updateListeners[0](updateListenerArgs);
      }

      if (updateListeners.length > 1) {
        for (let i = 0; i < updateListeners.length; i++) {
          updateListeners[i](updateListenerArgs);
        }
      }
    });

    onMount(() => {
      currentTime.start();
    });

    onCleanup(() => {
      if (args.autoClearInterval) {
        currentTime.clearInterval();
      }

      if (args.autoClearTimer) {
        (currentTime as unknown) = null;
      }

      if (args.autoClearListeners) {
        (startListeners as unknown) = null;
        (stopListeners as unknown) = null;
        (updateListeners as unknown) = null;
      }

      if (args.autoClearListersArgs) {
        (startListenerArgs as unknown) = null;
        (stopListenerArgs as unknown) = null;
        (updateListenerArgs as unknown) = null;
      }

      if (args.autoClearStore) {
        (timeStore as unknown) = null;
      }
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
