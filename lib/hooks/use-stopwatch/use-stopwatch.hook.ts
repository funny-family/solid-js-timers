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
} from '../../types';

type UseStopwatchHookArgs = {
  initialMilliseconds?: number;
  autoStart?: boolean;
  autoClearInterval?: boolean;
  autoClearListeners?: boolean;
};
type UseStopwatchHookReturnValue = {
  milliseconds: string;
  seconds: string;
  minutes: string;
  value: number;
  onStart: (callback: () => void) => void;
  onStop: (callback: () => void) => void;
  onReset: (callback: () => void) => void;
  onUpdate: (callback: () => void) => void;
} & Pick<StopwatchTimerInterface, 'start' | 'stop' | 'reset'>;
type UseStopwatchHook = (
  args?: UseStopwatchHookArgs
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
      start: null as unknown as UseStopwatchHookReturnValue['start'],
      stop: null as unknown as UseStopwatchHookReturnValue['stop'],
      reset: null as unknown as UseStopwatchHookReturnValue['reset'],
      onStart: null as unknown as UseStopwatchHookReturnValue['onStart'],
      onStop: null as unknown as UseStopwatchHookReturnValue['onStop'],
      onReset: null as unknown as UseStopwatchHookReturnValue['onReset'],
      onUpdate: null as unknown as UseStopwatchHookReturnValue['onUpdate'],
    });

    // support only till 60 min (1 hour)
    if (args.initialMilliseconds >= 3600000) {
      args.initialMilliseconds = 0;
    }
    stopwatchTimer.value = args.initialMilliseconds;
    stopwatchStore.milliseconds = calculateMilliseconds(stopwatchTimer);
    stopwatchStore.seconds = calculateSeconds(stopwatchTimer);
    stopwatchStore.minutes = calculateMinutes(stopwatchTimer);
    stopwatchStore.value = stopwatchTimer.value;

    let startListeners =
      Array<Parameters<UseStopwatchHookReturnValue['onStart']>[0]>();
    stopwatchStore.start = () => {
      stopwatchTimer.start();

      const startListenersLength = startListeners.length;

      if (startListenersLength === 1) {
        startListeners[0]();
      }

      if (startListenersLength > 1) {
        for (let i = 0; i < startListenersLength; i++) {
          startListeners[i]();
        }
      }
    };
    stopwatchStore.onStart = (callback) => {
      startListeners.push(callback);
    };

    let stopListeners =
      Array<Parameters<UseStopwatchHookReturnValue['onStop']>[0]>();
    const stopListenersLength = stopListeners.length;
    stopwatchStore.stop = () => {
      stopwatchTimer.stop();

      if (stopListenersLength === 1) {
        resetListeners[0]();
      }

      if (stopListenersLength > 1) {
        for (let i = 0; i < stopListenersLength; i++) {
          stopListeners[i]();
        }
      }
    };
    stopwatchStore.onStop = (callback) => {
      stopListeners.push(callback);
    };

    let resetListeners =
      Array<Parameters<UseStopwatchHookReturnValue['onReset']>[0]>();
    const resetListenersLength = resetListeners.length;
    stopwatchStore.reset = () => {
      stopwatchTimer.reset();

      stopwatchStore.milliseconds = '00';
      stopwatchStore.seconds = '00';
      stopwatchStore.minutes = '00';
      stopwatchStore.value = 0;

      if (resetListenersLength === 1) {
        resetListeners[0]();
      }

      if (resetListenersLength > 1) {
        for (let i = 0; i < resetListenersLength; i++) {
          resetListeners[i]();
        }
      }
    };
    stopwatchStore.onReset = (callback) => {
      resetListeners.push(callback);
    };

    let updateListeners =
      Array<Parameters<UseStopwatchHookReturnValue['onUpdate']>[0]>();
    const updateListenersLength = updateListeners.length;
    stopwatchTimer.onUpdate(() => {
      stopwatchStore.milliseconds = calculateMilliseconds(stopwatchTimer);
      stopwatchStore.seconds = calculateSeconds(stopwatchTimer);
      stopwatchStore.minutes = calculateMinutes(stopwatchTimer);
      stopwatchStore.value = stopwatchTimer.value;

      // support only till 60 min (1 hour)
      if (stopwatchTimer.value >= 3600000) {
        stopwatchStore.reset();
      }

      if (updateListenersLength === 1) {
        updateListeners[0]();
      }

      if (updateListenersLength > 1) {
        for (let i = 0; i < updateListenersLength; i++) {
          updateListeners[i]();
        }
      }
    });
    stopwatchStore.onUpdate = (callback) => {
      updateListeners.push(callback);
    };

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
