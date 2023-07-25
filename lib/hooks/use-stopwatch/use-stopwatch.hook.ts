import { onCleanup, onMount } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { type StopwatchConstructor, StopwatchTimer } from './stopwatch';
import {
  type CalculateMillisecondsFunction,
  type CalculateSecondsFunction,
  type CalculateMinutesFunction,
  calculateMilliseconds,
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
import type {
  OnCleanupFunction,
  OnMountFunction,
  WindowClearInterval,
  CreateMutable,
  Writeable,
} from '../../types';

export const useStopwatch = (
  (
    StopwatchTimer: StopwatchConstructor,
    calculateMilliseconds: CalculateMillisecondsFunction,
    calculateSeconds: CalculateSecondsFunction,
    calculateMinutes: CalculateMinutesFunction,
    clearInterval: WindowClearInterval,
    createMutable: CreateMutable,
    onMount: OnMountFunction,
    onCleanup: OnCleanupFunction
  ) =>
  (args: Required<UseStopwatchHookArgs> = {} as any) => {
    if (args.initialMilliseconds == null) {
      args.initialMilliseconds = 0;
    }

    if (args.autostart == null) {
      args.autostart = false;
    }

    if (args.autoClearListeners == null) {
      args.autoClearListeners = true;
    }

    if (args.autoClearInterval == null) {
      args.autoClearInterval = true;
    }

    let startListeners = Array<UseStopwatchHookListenerCallback>();
    let stopListeners = Array<UseStopwatchHookListenerCallback>();
    let resetListeners = Array<UseStopwatchHookListenerCallback>();
    let updateListeners = Array<UseStopwatchHookListenerCallback>();

    const stopwatchTimer = new StopwatchTimer(args.initialMilliseconds, 90);
    const stopwatchStore = createMutable<UseStopwatchHookReturnValue>({
      milliseconds: calculateMilliseconds(stopwatchTimer.value),
      seconds: calculateSeconds(stopwatchTimer.value),
      minutes: calculateMinutes(stopwatchTimer.value),
      value: stopwatchTimer.value,
      isRunning: false,
      start: stopwatchTimer.start,
      stop: stopwatchTimer.stop,
      reset: stopwatchTimer.reset,
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
    stopwatchTimer.value = args.initialMilliseconds;

    const listenerArgs: Writeable<UseStopwatchHookListenerArgs> = {
      milliseconds: stopwatchStore.milliseconds,
      seconds: stopwatchStore.seconds,
      minutes: stopwatchStore.minutes,
      value: stopwatchStore.value,
      isRunning: stopwatchStore.isRunning,
    };

    stopwatchTimer.onStart(() => {
      stopwatchStore.isRunning = stopwatchTimer.isRunning;

      listenerArgs.milliseconds = stopwatchStore.milliseconds;
      listenerArgs.seconds = stopwatchStore.seconds;
      listenerArgs.minutes = stopwatchStore.minutes;
      listenerArgs.value = stopwatchStore.value;
      listenerArgs.isRunning = stopwatchStore.isRunning;

      if (startListeners.length === 1) {
        startListeners[0](listenerArgs);
      }

      if (startListeners.length > 1) {
        for (let i = 0; i < startListeners.length; i++) {
          startListeners[i](listenerArgs);
        }
      }
    });

    stopwatchTimer.onStop(() => {
      stopwatchStore.isRunning = stopwatchTimer.isRunning;

      listenerArgs.milliseconds = stopwatchStore.milliseconds;
      listenerArgs.seconds = stopwatchStore.seconds;
      listenerArgs.minutes = stopwatchStore.minutes;
      listenerArgs.value = stopwatchStore.value;
      listenerArgs.isRunning = stopwatchStore.isRunning;

      if (stopListeners.length === 1) {
        stopListeners[0](listenerArgs);
      }

      if (stopListeners.length > 1) {
        for (let i = 0; i < stopListeners.length; i++) {
          stopListeners[i](listenerArgs);
        }
      }
    });

    stopwatchTimer.onReset(() => {
      stopwatchStore.milliseconds = '00';
      stopwatchStore.seconds = '00';
      stopwatchStore.minutes = '00';
      stopwatchStore.value = 0;
      stopwatchStore.isRunning = stopwatchTimer.isRunning;

      listenerArgs.milliseconds = stopwatchStore.milliseconds;
      listenerArgs.seconds = stopwatchStore.seconds;
      listenerArgs.minutes = stopwatchStore.minutes;
      listenerArgs.value = stopwatchStore.value;
      listenerArgs.isRunning = stopwatchStore.isRunning;

      if (resetListeners.length === 1) {
        resetListeners[0](listenerArgs);
      }

      if (resetListeners.length > 1) {
        for (let i = 0; i < resetListeners.length; i++) {
          resetListeners[i](listenerArgs);
        }
      }
    });

    stopwatchTimer.onUpdate(() => {
      stopwatchStore.milliseconds = calculateMilliseconds(stopwatchTimer.value);
      stopwatchStore.seconds = calculateSeconds(stopwatchTimer.value);
      stopwatchStore.minutes = calculateMinutes(stopwatchTimer.value);
      stopwatchStore.value = stopwatchTimer.value;

      // support only till 60 min (1 hour)
      if (stopwatchTimer.value >= 3600000) {
        stopwatchStore.reset();
      }

      listenerArgs.milliseconds = stopwatchStore.milliseconds;
      listenerArgs.seconds = stopwatchStore.seconds;
      listenerArgs.minutes = stopwatchStore.minutes;
      listenerArgs.value = stopwatchStore.value;

      if (updateListeners.length === 1) {
        updateListeners[0](listenerArgs);
      }

      if (updateListeners.length > 1) {
        for (let i = 0; i < updateListeners.length; i++) {
          updateListeners[i](listenerArgs);
        }
      }
    });

    onMount(() => {
      if (args.autostart) {
        stopwatchTimer.start();
      }
    });

    onCleanup(() => {
      if (args.autoClearListeners) {
        startListeners = Array();
        stopListeners = Array();
        resetListeners = Array();
        updateListeners = Array();
      }

      if (args.autoClearInterval && stopwatchTimer.intervalID != null) {
        clearInterval(stopwatchTimer.intervalID);
      }
    });

    return stopwatchStore;
  }
)(
  StopwatchTimer,
  calculateMilliseconds,
  calculateSeconds,
  calculateMinutes,
  globalThis.clearInterval,
  createMutable,
  onMount,
  onCleanup
) as UseStopwatchHook;
