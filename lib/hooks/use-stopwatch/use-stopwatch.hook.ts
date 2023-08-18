import { onCleanup, onMount } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { type StopwatchConstructor, Stopwatch } from './stopwatch';
import {
  type CalculateSeconds,
  type CalculateMinutes,
  calculateSeconds,
  calculateMinutes,
} from './use-stopwatch.utils';
import type {
  UseStopwatchHook,
  UseStopwatchHookArgs,
  UseStopwatchHookListenerArgs,
  UseStopwatchHookListenerCallback,
  UseStopwatchHookReturnValue,
} from './use-stopwatch.types';
import type { OnCleanup, OnMount, CreateMutable, Writable } from '../../types';

export const useStopwatchSetup = (
  Stopwatch: StopwatchConstructor,
  calculateSeconds: CalculateSeconds,
  calculateMinutes: CalculateMinutes,
  createMutable: CreateMutable,
  onMount: OnMount,
  onCleanup: OnCleanup
) =>
  ((args: Required<UseStopwatchHookArgs> = {} as any) => {
    if (args.initialMilliseconds == null) {
      args.initialMilliseconds = 0;
    }

    if (args.autostart == null) {
      args.autostart = false;
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

    let startListeners = Array<UseStopwatchHookListenerCallback>();
    let stopListeners = Array<UseStopwatchHookListenerCallback>();
    let resetListeners = Array<UseStopwatchHookListenerCallback>();
    let updateListeners = Array<UseStopwatchHookListenerCallback>();

    let stopwatch = new Stopwatch(args.initialMilliseconds, 90);
    let stopwatchStore = createMutable<UseStopwatchHookReturnValue>({
      milliseconds: stopwatch.milliseconds,
      seconds: calculateSeconds(stopwatch.milliseconds),
      minutes: calculateMinutes(stopwatch.milliseconds),
      isRunning: stopwatch.isRunning,
      start: stopwatch.start,
      stop: stopwatch.stop,
      reset: stopwatch.reset,
      onStart: (callback) => {
        startListeners.push(callback);
      },
      onStop: (callback) => {
        stopListeners.push(callback);
      },
      onReset: (callback) => {
        resetListeners.push(callback);
      },
      onUpdate: (callback) => {
        updateListeners.push(callback);
      },
    });

    // support only till 60 min (1 hour)
    if (args.initialMilliseconds >= 3600000) {
      args.initialMilliseconds = 0;
    }
    stopwatch.milliseconds = args.initialMilliseconds;

    let startListenerArgs: Writable<UseStopwatchHookListenerArgs> = {
      milliseconds: stopwatchStore.milliseconds,
      seconds: stopwatchStore.seconds,
      minutes: stopwatchStore.minutes,
      isRunning: stopwatchStore.isRunning,
    };

    let stopListenerArgs: Writable<UseStopwatchHookListenerArgs> = {
      milliseconds: stopwatchStore.milliseconds,
      seconds: stopwatchStore.seconds,
      minutes: stopwatchStore.minutes,
      isRunning: stopwatchStore.isRunning,
    };

    let resetListenerArgs: Writable<UseStopwatchHookListenerArgs> = {
      milliseconds: stopwatchStore.milliseconds,
      seconds: stopwatchStore.seconds,
      minutes: stopwatchStore.minutes,
      isRunning: stopwatchStore.isRunning,
    };

    let updateListenerArgs: Writable<UseStopwatchHookListenerArgs> = {
      milliseconds: stopwatchStore.milliseconds,
      seconds: stopwatchStore.seconds,
      minutes: stopwatchStore.minutes,
      isRunning: stopwatchStore.isRunning,
    };

    stopwatch.onStart(() => {
      stopwatchStore.isRunning = stopwatch.isRunning;

      startListenerArgs.milliseconds = stopwatchStore.milliseconds;
      startListenerArgs.seconds = stopwatchStore.seconds;
      startListenerArgs.minutes = stopwatchStore.minutes;
      startListenerArgs.isRunning = stopwatchStore.isRunning;

      if (startListeners.length === 1) {
        startListeners[0](startListenerArgs);
      }

      if (startListeners.length > 1) {
        for (let i = 0; i < startListeners.length; i++) {
          startListeners[i](startListenerArgs);
        }
      }
    });

    stopwatch.onStop(() => {
      stopwatchStore.isRunning = stopwatch.isRunning;

      stopListenerArgs.milliseconds = stopwatchStore.milliseconds;
      stopListenerArgs.seconds = stopwatchStore.seconds;
      stopListenerArgs.minutes = stopwatchStore.minutes;
      stopListenerArgs.isRunning = stopwatchStore.isRunning;

      if (stopListeners.length === 1) {
        stopListeners[0](stopListenerArgs);
      }

      if (stopListeners.length > 1) {
        for (let i = 0; i < stopListeners.length; i++) {
          stopListeners[i](stopListenerArgs);
        }
      }
    });

    stopwatch.onReset(() => {
      stopwatchStore.milliseconds = 0;
      stopwatchStore.seconds = 0;
      stopwatchStore.minutes = 0;
      stopwatchStore.isRunning = stopwatch.isRunning;

      resetListenerArgs.milliseconds = stopwatchStore.milliseconds;
      resetListenerArgs.seconds = stopwatchStore.seconds;
      resetListenerArgs.minutes = stopwatchStore.minutes;
      resetListenerArgs.isRunning = stopwatchStore.isRunning;

      if (resetListeners.length === 1) {
        resetListeners[0](resetListenerArgs);
      }

      if (resetListeners.length > 1) {
        for (let i = 0; i < resetListeners.length; i++) {
          resetListeners[i](resetListenerArgs);
        }
      }
    });

    stopwatch.onUpdate(() => {
      stopwatchStore.milliseconds = stopwatch.milliseconds;
      stopwatchStore.seconds = calculateSeconds(stopwatch.milliseconds);
      stopwatchStore.minutes = calculateMinutes(stopwatch.milliseconds);
      stopwatchStore.isRunning = stopwatch.isRunning;

      updateListenerArgs.milliseconds = stopwatchStore.milliseconds;
      updateListenerArgs.seconds = stopwatchStore.seconds;
      updateListenerArgs.minutes = stopwatchStore.minutes;

      // support only till 60 min (1 hour)
      if (stopwatch.milliseconds >= 3600000) {
        stopwatch.reset();
      }

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
      if (args.autostart) {
        stopwatch.start();
      }
    });

    onCleanup(() => {
      if (args.autoClearInterval) {
        stopwatch.clearInterval();
      }

      if (args.autoClearTimer) {
        (stopwatch as unknown) = null;
      }

      if (args.autoClearListeners) {
        (startListeners as unknown) = null;
        (stopListeners as unknown) = null;
        (resetListeners as unknown) = null;
        (updateListeners as unknown) = null;
      }

      if (args.autoClearListersArgs) {
        (startListenerArgs as unknown) = null;
        (stopListenerArgs as unknown) = null;
        (resetListenerArgs as unknown) = null;
        (updateListenerArgs as unknown) = null;
      }

      if (args.autoClearStore) {
        (stopwatchStore as unknown) = null;
      }
    });

    return stopwatchStore;
  }) as UseStopwatchHook;

export const useStopwatch = useStopwatchSetup(
  Stopwatch,
  calculateSeconds,
  calculateMinutes,
  createMutable,
  onMount,
  onCleanup
);
