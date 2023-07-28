import { onCleanup, onMount } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { type StopwatchConstructor, Stopwatch } from './stopwatch';
import {
  type CalculateMillisecondsAsStringFunction,
  type CalculateSecondsFunction,
  type CalculateMinutesFunction,
  type PadZeroToNumberFunction,
  calculateMillisecondsAsString,
  calculateSeconds,
  calculateMinutes,
  padZeroToNumber,
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
  CreateMutable,
  Writeable,
} from '../../types';

export const useStopwatch = (
  (
    Stopwatch: StopwatchConstructor,
    calculateMillisecondsAsString: CalculateMillisecondsAsStringFunction,
    calculateSeconds: CalculateSecondsFunction,
    calculateMinutes: CalculateMinutesFunction,
    padZeroToNumber: PadZeroToNumberFunction,
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
      millisecondsAsString: calculateMillisecondsAsString(
        stopwatch.milliseconds
      ),
      secondsAsString: padZeroToNumber(
        calculateSeconds(stopwatch.milliseconds)
      ),
      minutesAsString: padZeroToNumber(
        calculateMinutes(stopwatch.milliseconds)
      ),

      millisecondsAsNumber: stopwatch.milliseconds,
      secondsAsNumber: calculateSeconds(stopwatch.milliseconds),
      minutesAsNumber: calculateMinutes(stopwatch.milliseconds),

      start: stopwatch.start,
      stop: stopwatch.stop,
      reset: stopwatch.reset,

      isRunning: stopwatch.isRunning,

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

    let startListenerArgs: Writeable<UseStopwatchHookListenerArgs> = {
      millisecondsAsString: stopwatchStore.millisecondsAsString,
      secondsAsString: stopwatchStore.secondsAsString,
      minutesAsString: stopwatchStore.minutesAsString,
      millisecondsAsNumber: stopwatchStore.millisecondsAsNumber,
      secondsAsNumber: stopwatchStore.secondsAsNumber,
      minutesAsNumber: stopwatchStore.minutesAsNumber,
      isRunning: stopwatchStore.isRunning,
    };

    let stopListenerArgs: Writeable<UseStopwatchHookListenerArgs> = {
      millisecondsAsString: stopwatchStore.millisecondsAsString,
      secondsAsString: stopwatchStore.secondsAsString,
      minutesAsString: stopwatchStore.minutesAsString,
      millisecondsAsNumber: stopwatchStore.millisecondsAsNumber,
      secondsAsNumber: stopwatchStore.secondsAsNumber,
      minutesAsNumber: stopwatchStore.minutesAsNumber,
      isRunning: stopwatchStore.isRunning,
    };

    let resetListenerArgs: Writeable<UseStopwatchHookListenerArgs> = {
      millisecondsAsString: stopwatchStore.millisecondsAsString,
      secondsAsString: stopwatchStore.secondsAsString,
      minutesAsString: stopwatchStore.minutesAsString,
      millisecondsAsNumber: stopwatchStore.millisecondsAsNumber,
      secondsAsNumber: stopwatchStore.secondsAsNumber,
      minutesAsNumber: stopwatchStore.minutesAsNumber,
      isRunning: stopwatchStore.isRunning,
    };

    let updateListenerArgs: Writeable<UseStopwatchHookListenerArgs> = {
      millisecondsAsString: stopwatchStore.millisecondsAsString,
      secondsAsString: stopwatchStore.secondsAsString,
      minutesAsString: stopwatchStore.minutesAsString,
      millisecondsAsNumber: stopwatchStore.millisecondsAsNumber,
      secondsAsNumber: stopwatchStore.secondsAsNumber,
      minutesAsNumber: stopwatchStore.minutesAsNumber,
      isRunning: stopwatchStore.isRunning,
    };

    stopwatch.onStart(() => {
      stopwatchStore.isRunning = stopwatch.isRunning;

      startListenerArgs.millisecondsAsString =
        stopwatchStore.millisecondsAsString;
      startListenerArgs.secondsAsString = stopwatchStore.secondsAsString;
      startListenerArgs.minutesAsString = stopwatchStore.minutesAsString;
      startListenerArgs.millisecondsAsNumber =
        stopwatchStore.millisecondsAsNumber;
      startListenerArgs.secondsAsNumber = stopwatchStore.secondsAsNumber;
      startListenerArgs.minutesAsNumber = stopwatchStore.minutesAsNumber;
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

      stopListenerArgs.millisecondsAsString =
        stopwatchStore.millisecondsAsString;
      stopListenerArgs.secondsAsString = stopwatchStore.secondsAsString;
      stopListenerArgs.minutesAsString = stopwatchStore.minutesAsString;
      stopListenerArgs.millisecondsAsNumber =
        stopwatchStore.millisecondsAsNumber;
      stopListenerArgs.secondsAsNumber = stopwatchStore.secondsAsNumber;
      stopListenerArgs.minutesAsNumber = stopwatchStore.minutesAsNumber;
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
      stopwatchStore.millisecondsAsString = '00';
      stopwatchStore.secondsAsString = '00';
      stopwatchStore.minutesAsString = '00';
      stopwatchStore.millisecondsAsNumber = 0;
      stopwatchStore.secondsAsNumber = 0;
      stopwatchStore.minutesAsNumber = 0;
      stopwatchStore.isRunning = stopwatch.isRunning;

      resetListenerArgs.millisecondsAsString =
        stopwatchStore.millisecondsAsString;
      resetListenerArgs.secondsAsString = stopwatchStore.secondsAsString;
      resetListenerArgs.minutesAsString = stopwatchStore.minutesAsString;
      resetListenerArgs.millisecondsAsNumber =
        stopwatchStore.millisecondsAsNumber;
      resetListenerArgs.secondsAsNumber = stopwatchStore.secondsAsNumber;
      resetListenerArgs.minutesAsNumber = stopwatchStore.minutesAsNumber;
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
      stopwatchStore.millisecondsAsString = calculateMillisecondsAsString(
        stopwatch.milliseconds
      );
      stopwatchStore.secondsAsString = padZeroToNumber(
        calculateSeconds(stopwatch.milliseconds)
      );
      stopwatchStore.minutesAsString = padZeroToNumber(
        calculateMinutes(stopwatch.milliseconds)
      );
      stopwatchStore.millisecondsAsNumber = stopwatch.milliseconds;
      stopwatchStore.secondsAsNumber = calculateSeconds(stopwatch.milliseconds);
      stopwatchStore.minutesAsNumber = calculateMinutes(stopwatch.milliseconds);
      stopwatchStore.isRunning = stopwatch.isRunning;

      updateListenerArgs.millisecondsAsString =
        stopwatchStore.millisecondsAsString;
      updateListenerArgs.secondsAsString = stopwatchStore.secondsAsString;
      updateListenerArgs.minutesAsString = stopwatchStore.minutesAsString;
      updateListenerArgs.millisecondsAsNumber =
        stopwatchStore.millisecondsAsNumber;
      updateListenerArgs.secondsAsNumber = stopwatchStore.secondsAsNumber;
      updateListenerArgs.minutesAsNumber = stopwatchStore.minutesAsNumber;
      updateListenerArgs.isRunning = stopwatchStore.isRunning;

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
  }
)(
  Stopwatch,
  calculateMillisecondsAsString,
  calculateSeconds,
  calculateMinutes,
  padZeroToNumber,
  createMutable,
  onMount,
  onCleanup
) as UseStopwatchHook;
