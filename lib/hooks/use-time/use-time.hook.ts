import { onMount, onCleanup } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { type CurrentTimeConstructor, CurrentTime } from './current-time';
import {
  type GetCurrentLocale,
  type GetAMPM,
  type UpdateListenerAugmentsOf,
  getCurrentLocale,
  getAMPM,
  updateListenerAugmentsOf,
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
  Writable,
  OnMountFunction,
} from '../../types';

export const useTime = (
  (
    CurrentTime: CurrentTimeConstructor,
    getCurrentLocale: GetCurrentLocale,
    getAMPM: GetAMPM,
    updateListenerAugmentsOf: UpdateListenerAugmentsOf,
    createMutable: CreateMutable,
    onMount: OnMountFunction,
    onCleanup: OnCleanupFunction
  ) =>
  (args: Required<UseTimeHookArgs> = {} as any) => {
    if (args.localesArgument == null) {
      args.localesArgument = getCurrentLocale();
    }

    if (args.dateTimeFormatOptions == null) {
      args.dateTimeFormatOptions = {};
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
        args.localesArgument,
        args.dateTimeFormatOptions
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

    let startListenerArgs: Writable<UseTimeHookHookListenerArgs> = {
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

    let stopListenerArgs: Writable<UseTimeHookHookListenerArgs> = {
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

    let updateListenerArgs: Writable<UseTimeHookHookListenerArgs> = {
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
      timeStore.localeTimeString = currentTime.date.toLocaleTimeString(
        args.localesArgument,
        args.dateTimeFormatOptions
      );
      timeStore.ampm = getAMPM(currentTime.date);
      timeStore.isRunning = currentTime.isRunning;

      updateListenerAugmentsOf(startListenerArgs, timeStore);

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
      timeStore.localeTimeString = currentTime.date.toLocaleTimeString(
        args.localesArgument,
        args.dateTimeFormatOptions
      );
      timeStore.ampm = getAMPM(currentTime.date);
      timeStore.isRunning = currentTime.isRunning;

      updateListenerAugmentsOf(stopListenerArgs, timeStore);

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
      timeStore.localeTimeString = currentTime.date.toLocaleTimeString(
        args.localesArgument,
        args.dateTimeFormatOptions
      );
      timeStore.ampm = getAMPM(currentTime.date);

      updateListenerAugmentsOf(updateListenerArgs, timeStore);

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
  getCurrentLocale,
  getAMPM,
  updateListenerAugmentsOf,
  createMutable,
  onMount,
  onCleanup
) as UseTimeHook;
