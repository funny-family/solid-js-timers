import { onMount, onCleanup } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { type CurrentTimeConstructor, CurrentTime } from './current-time';
import {
  type CalculateHoursFunction,
  type GetLocaleTimeStringFunction,
  calculateHours,
  getLocaleTimeString,
  getCurrentLocale,
  getAMPM,
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
    if (args.timeStringLocales == null) {
      args.timeStringLocales = getCurrentLocale();
    }

    if (args.timeStringOptions == null) {
      args.timeStringOptions = {};
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
    let timeStore = createMutable<UseTimeHookReturnValue>({
      utcSeconds: currentTime.date.getUTCSeconds(),
      utcMinutes: currentTime.date.getUTCMinutes(),
      utcHours: currentTime.date.getUTCHours(),

      localSeconds: currentTime.date.getSeconds(),
      localMinutes: currentTime.date.getMinutes(),
      localHours: currentTime.date.getHours(),

      localeTimeString: currentTime.date.toLocaleTimeString(
        args.timeStringLocales,
        args.timeStringOptions
      ),
      ampm: getAMPM(currentTime.date),
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
      utcSeconds: timeStore.utcSeconds,
      utcMinutes: timeStore.utcMinutes,
      utcHours: timeStore.utcHours,

      localSeconds: timeStore.localSeconds,
      localMinutes: timeStore.localMinutes,
      localHours: timeStore.localHours,

      localeTimeString: timeStore.localeTimeString,
      ampm: timeStore.ampm,
      isRunning: timeStore.isRunning,
    };

    let stopListenerArgs: Writeable<UseTimeHookHookListenerArgs> = {
      utcSeconds: timeStore.utcSeconds,
      utcMinutes: timeStore.utcMinutes,
      utcHours: timeStore.utcHours,

      localSeconds: timeStore.localSeconds,
      localMinutes: timeStore.localMinutes,
      localHours: timeStore.localHours,

      localeTimeString: timeStore.localeTimeString,
      ampm: timeStore.ampm,
      isRunning: timeStore.isRunning,
    };

    let updateListenerArgs: Writeable<UseTimeHookHookListenerArgs> = {
      utcSeconds: timeStore.utcSeconds,
      utcMinutes: timeStore.utcMinutes,
      utcHours: timeStore.utcHours,

      localSeconds: timeStore.localSeconds,
      localMinutes: timeStore.localMinutes,
      localHours: timeStore.localHours,

      localeTimeString: timeStore.localeTimeString,
      ampm: timeStore.ampm,
      isRunning: timeStore.isRunning,
    };

    currentTime.onStart(() => {
      timeStore.utcSeconds = currentTime.date.getUTCSeconds();
      timeStore.utcMinutes = currentTime.date.getUTCMinutes();
      timeStore.utcHours = currentTime.date.getUTCHours();
      timeStore.localSeconds = currentTime.date.getSeconds();
      timeStore.localMinutes = currentTime.date.getMinutes();
      timeStore.localHours = currentTime.date.getHours();
      timeStore.localeTimeString = currentTime.date.toLocaleString(
        args.timeStringLocales,
        args.timeStringOptions
      );
      timeStore.ampm = getAMPM(currentTime.date);
      timeStore.isRunning = currentTime.isRunning;

      startListenerArgs.utcSeconds = timeStore.utcSeconds;
      startListenerArgs.utcMinutes = timeStore.utcMinutes;
      startListenerArgs.utcHours = timeStore.utcHours;
      startListenerArgs.localSeconds = timeStore.localSeconds;
      startListenerArgs.localMinutes = timeStore.localMinutes;
      startListenerArgs.localHours = timeStore.localHours;
      startListenerArgs.localeTimeString = timeStore.localeTimeString;
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
      timeStore.utcSeconds = currentTime.date.getUTCSeconds();
      timeStore.utcMinutes = currentTime.date.getUTCMinutes();
      timeStore.utcHours = currentTime.date.getUTCHours();
      timeStore.localSeconds = currentTime.date.getSeconds();
      timeStore.localMinutes = currentTime.date.getMinutes();
      timeStore.localHours = currentTime.date.getHours();
      timeStore.localeTimeString = currentTime.date.toLocaleString(
        args.timeStringLocales,
        args.timeStringOptions
      );
      timeStore.ampm = getAMPM(currentTime.date);
      timeStore.isRunning = currentTime.isRunning;

      stopListenerArgs.utcSeconds = timeStore.utcSeconds;
      stopListenerArgs.utcMinutes = timeStore.utcMinutes;
      stopListenerArgs.utcHours = timeStore.utcHours;
      stopListenerArgs.localSeconds = timeStore.localSeconds;
      stopListenerArgs.localMinutes = timeStore.localMinutes;
      stopListenerArgs.localHours = timeStore.localHours;
      stopListenerArgs.localeTimeString = timeStore.localeTimeString;
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
      timeStore.utcSeconds = currentTime.date.getUTCSeconds();
      timeStore.utcMinutes = currentTime.date.getUTCMinutes();
      timeStore.utcHours = currentTime.date.getUTCHours();
      timeStore.localSeconds = currentTime.date.getSeconds();
      timeStore.localMinutes = currentTime.date.getMinutes();
      timeStore.localHours = currentTime.date.getHours();
      timeStore.localeTimeString = currentTime.date.toLocaleString(
        args.timeStringLocales,
        args.timeStringOptions
      );
      timeStore.ampm = getAMPM(currentTime.date);

      updateListenerArgs.utcSeconds = timeStore.utcSeconds;
      updateListenerArgs.utcMinutes = timeStore.utcMinutes;
      updateListenerArgs.utcHours = timeStore.utcHours;
      updateListenerArgs.localSeconds = timeStore.localSeconds;
      updateListenerArgs.localMinutes = timeStore.localMinutes;
      updateListenerArgs.localHours = timeStore.localHours;
      updateListenerArgs.localeTimeString = timeStore.localeTimeString;
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
