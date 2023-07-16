import {
  type CalculateMillisecondsFunction,
  type CalculateSecondsFunction,
  type CalculateMinutesFunction,
  calculateMilliseconds,
  calculateSeconds,
  calculateMinutes,
} from './utils';
import { onCleanup, onMount } from 'solid-js';
import { createMutable } from 'solid-js/store';
import {
  type StopwatchTimerInterface,
  StopwatchTimer,
  StopwatchTimerConstructor,
} from './stopwatch-timer.class';
import type {
  OnCleanupFunction,
  OnMountFunction,
  WindowClearInterval,
  CreateMutable,
  RequireAtLeastOne,
} from '../../types';

type UseStopwatchHookArgs = {
  initialMilliseconds?: number;
  autoStart?: boolean;
  autoClearInterval?: boolean;
  autoClearListeners?: boolean;
};

type UseStopwatchHookListenerArgs = Pick<
  UseStopwatchHookReturnValue,
  'milliseconds' | 'seconds' | 'minutes' | 'value' | 'isRunning'
>;

type UseStopwatchHookListenerCallback = (
  args: UseStopwatchHookListenerArgs
) => void;

type UseStopwatchHookListener = (
  callback: UseStopwatchHookListenerCallback
) => void;

type UseStopwatchHookReturnValue = {
  milliseconds: string;
  seconds: string;
  minutes: string;
  value: number;
  isRunning: boolean;
  onStart: UseStopwatchHookListener;
  onStop: UseStopwatchHookListener;
  onReset: UseStopwatchHookListener;
  onUpdate: UseStopwatchHookListener;
} & Pick<StopwatchTimerInterface, 'start' | 'stop' | 'reset'>;

type UseStopwatchHook = (
  args?: RequireAtLeastOne<UseStopwatchHookArgs>
) => Readonly<UseStopwatchHookReturnValue>;

export const useStopwatch = (
  (
    StopwatchTimer: StopwatchTimerConstructor,
    calculateMilliseconds: CalculateMillisecondsFunction,
    calculateSeconds: CalculateSecondsFunction,
    calculateMinutes: CalculateMinutesFunction,
    clearInterval: WindowClearInterval,
    createMutable: CreateMutable,
    onMount: OnMountFunction,
    onCleanup: OnCleanupFunction
  ) =>
  (args: Required<UseStopwatchHookArgs> = {} as any) => {
    if (args.autoStart == null) {
      args.autoStart = false;
    }

    if (args.autoClearInterval == null) {
      args.autoClearInterval = true;
    }

    if (args.autoClearListeners == null) {
      args.autoClearListeners = true;
    }

    if (args.initialMilliseconds == null) {
      args.initialMilliseconds = 0;
    }

    const stopwatchTimer = new StopwatchTimer(90);
    const stopwatchStore = createMutable<UseStopwatchHookReturnValue>({
      milliseconds: '00',
      seconds: '00',
      minutes: '00',
      value: 0,
      isRunning: false,
      start: null as unknown as UseStopwatchHookReturnValue['start'],
      stop: null as unknown as UseStopwatchHookReturnValue['stop'],
      reset: null as unknown as UseStopwatchHookReturnValue['reset'],
      onStart: null as unknown as UseStopwatchHookListener,
      onStop: null as unknown as UseStopwatchHookListener,
      onReset: null as unknown as UseStopwatchHookListener,
      onUpdate: null as unknown as UseStopwatchHookListener,
    });

    // support only till 60 min (1 hour)
    if (args.initialMilliseconds >= 3600000) {
      args.initialMilliseconds = 0;
    }
    stopwatchTimer.value = args.initialMilliseconds;

    /* ----------------- register start listeners ----------------- */
    let startListeners = Array<UseStopwatchHookListenerCallback>();
    stopwatchStore.start = stopwatchTimer.start;
    stopwatchTimer.onStart(() => {
      stopwatchStore.isRunning = stopwatchTimer.isRunning;

      if (startListeners.length === 1) {
        startListeners[0]({
          milliseconds: stopwatchStore.milliseconds,
          seconds: stopwatchStore.seconds,
          minutes: stopwatchStore.minutes,
          value: stopwatchStore.value,
          isRunning: stopwatchStore.isRunning,
        });
      }

      if (startListeners.length > 1) {
        for (let i = 0; i < startListeners.length; i++) {
          startListeners[i]({
            milliseconds: stopwatchStore.milliseconds,
            seconds: stopwatchStore.seconds,
            minutes: stopwatchStore.minutes,
            value: stopwatchStore.value,
            isRunning: stopwatchStore.isRunning,
          });
        }
      }
    });
    stopwatchStore.onStart = (callback) => {
      startListeners.push(callback);
    };
    /* ----------------- register start listeners ----------------- */

    /* ----------------- register stop listeners ----------------- */
    let stopListeners = Array<UseStopwatchHookListenerCallback>();
    stopwatchStore.stop = stopwatchTimer.stop;
    stopwatchTimer.onStop(() => {
      stopwatchStore.isRunning = stopwatchTimer.isRunning;

      if (stopListeners.length === 1) {
        stopListeners[0]({
          milliseconds: stopwatchStore.milliseconds,
          seconds: stopwatchStore.seconds,
          minutes: stopwatchStore.minutes,
          value: stopwatchStore.value,
          isRunning: stopwatchStore.isRunning,
        });
      }

      if (stopListeners.length > 1) {
        for (let i = 0; i < stopListeners.length; i++) {
          stopListeners[i]({
            milliseconds: stopwatchStore.milliseconds,
            seconds: stopwatchStore.seconds,
            minutes: stopwatchStore.minutes,
            value: stopwatchStore.value,
            isRunning: stopwatchStore.isRunning,
          });
        }
      }
    });
    stopwatchStore.onStop = (callback) => {
      stopListeners.push(callback);
    };
    /* ----------------- register stop listeners ----------------- */

    /* ----------------- register reset listeners ----------------- */
    let resetListeners = Array<UseStopwatchHookListenerCallback>();
    stopwatchStore.reset = stopwatchTimer.reset;
    stopwatchTimer.onReset(() => {
      stopwatchStore.milliseconds = '00';
      stopwatchStore.seconds = '00';
      stopwatchStore.minutes = '00';
      stopwatchStore.value = 0;
      stopwatchStore.isRunning = stopwatchTimer.isRunning;

      if (resetListeners.length === 1) {
        resetListeners[0]({
          milliseconds: stopwatchStore.milliseconds,
          seconds: stopwatchStore.seconds,
          minutes: stopwatchStore.minutes,
          value: stopwatchStore.value,
          isRunning: stopwatchStore.isRunning,
        });
      }

      if (resetListeners.length > 1) {
        for (let i = 0; i < resetListeners.length; i++) {
          resetListeners[i]({
            milliseconds: stopwatchStore.milliseconds,
            seconds: stopwatchStore.seconds,
            minutes: stopwatchStore.minutes,
            value: stopwatchStore.value,
            isRunning: stopwatchStore.isRunning,
          });
        }
      }
    });
    stopwatchStore.onReset = (callback) => {
      resetListeners.push(callback);
    };
    /* ----------------- register reset listeners ----------------- */

    /* ----------------- register update listeners ----------------- */
    let updateListeners = Array<UseStopwatchHookListenerCallback>();
    stopwatchTimer.onUpdate(() => {
      stopwatchStore.milliseconds = calculateMilliseconds(stopwatchTimer);
      stopwatchStore.seconds = calculateSeconds(stopwatchTimer);
      stopwatchStore.minutes = calculateMinutes(stopwatchTimer);
      stopwatchStore.value = stopwatchTimer.value;

      // support only till 60 min (1 hour)
      if (stopwatchTimer.value >= 3600000) {
        stopwatchStore.reset();
      }

      if (updateListeners.length === 1) {
        updateListeners[0]({
          milliseconds: stopwatchStore.milliseconds,
          seconds: stopwatchStore.seconds,
          minutes: stopwatchStore.minutes,
          value: stopwatchStore.value,
          isRunning: stopwatchStore.isRunning,
        });
      }

      if (updateListeners.length > 1) {
        for (let i = 0; i < updateListeners.length; i++) {
          updateListeners[i]({
            milliseconds: stopwatchStore.milliseconds,
            seconds: stopwatchStore.seconds,
            minutes: stopwatchStore.minutes,
            value: stopwatchStore.value,
            isRunning: stopwatchStore.isRunning,
          });
        }
      }
    });
    stopwatchStore.onUpdate = (callback) => {
      updateListeners.push(callback);
    };
    /* ----------------- register update listeners ----------------- */

    onMount(() => {
      if (args.autoStart) {
        stopwatchStore.start();
      }
    });

    onCleanup(() => {
      if (args.autoClearListeners) {
        startListeners = [];
        stopListeners = [];
        resetListeners = [];
        updateListeners = [];
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
