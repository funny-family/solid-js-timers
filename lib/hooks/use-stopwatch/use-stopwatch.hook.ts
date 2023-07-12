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
  autoStart?: boolean;
  autoClearInterval?: boolean;
};
type UseStopwatchHookReturnValue = {
  milliseconds: string;
  seconds: string;
  minutes: string;
  value: number;
  onStart: (callback: () => void) => void;
  onStop: (callback: () => void) => void;
  onReset: (callback: () => void) => void;
  onUpdate: (
    callback: (value: UseStopwatchHookReturnValue['value']) => void
  ) => void;
} & Pick<StopwatchTimerInterface, 'start' | 'stop' | 'reset'>;
type UseStopwatchHook = (
  args?: UseStopwatchHookArgs
) => Readonly<UseStopwatchHookReturnValue>;

export const useStopwatch = (
  (
    clearInterval: WindowClearInterval,
    StopwatchTimer: StopwatchTimerConstructor,
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

    const stopwatchTimer = new StopwatchTimer();

    const stopwatchStore = createMutable<UseStopwatchHookReturnValue>({
      milliseconds: '00',
      seconds: '00',
      minutes: '00',
      value: stopwatchTimer.clock,
      start: null as any as UseStopwatchHookReturnValue['start'],
      stop: null as any as UseStopwatchHookReturnValue['stop'],
      reset: null as any as UseStopwatchHookReturnValue['reset'],
      onStart: null as any as UseStopwatchHookReturnValue['onStart'],
      onStop: null as any as UseStopwatchHookReturnValue['onStop'],
      onReset: null as any as UseStopwatchHookReturnValue['onReset'],
      onUpdate: null as any as UseStopwatchHookReturnValue['onUpdate'],
    });

    // const startListeners =
    //   Array<Parameters<UseStopwatchHookReturnValue['onStart']>[0]>();
    stopwatchStore.start = () => {
      stopwatchTimer.start();
      stopwatchStore.value = stopwatchTimer.clock;

      // stopwatchStore.onStart = (callback) => {
      //   startListeners.push(callback);
      // };

      // if (startListeners.length > 0) {
      //   for (let i = 0; i < startListeners.length; i++) {
      //     startListeners[i]();
      //   }
      // }
    };

    stopwatchStore.stop = () => {
      stopwatchTimer.stop();
      stopwatchStore.value = stopwatchTimer.clock;
      stopwatchStore.onStop = (callback) => {
        callback();
      };
    };

    stopwatchStore.reset = () => {
      stopwatchTimer.reset();
      stopwatchStore.milliseconds = '00';
      stopwatchStore.seconds = '00';
      stopwatchStore.minutes = '00';
      stopwatchStore.value = 0;
      stopwatchStore.onReset = (callback) => {
        callback();
      };
    };

    stopwatchTimer.onUpdate(() => {
      stopwatchStore.milliseconds = `${stopwatchTimer.clock || '00'}`
        .padStart(2, '0')
        .slice(-2);
      stopwatchStore.seconds = `${~~(
        (stopwatchTimer.clock % 60000) /
        1000
      )}`.padStart(2, '0');
      stopwatchStore.minutes = `${~~(stopwatchTimer.clock / 60000)}`.padStart(
        2,
        '0'
      );

      if (stopwatchTimer.clock === 3600000) {
        stopwatchTimer.reset();
      }

      stopwatchStore.onUpdate = (callback) => {
        callback(stopwatchStore.value);
      };
    });

    onMount(() => {
      if (args.autoStart) {
        stopwatchStore.start();
      }
    });

    onCleanup(() => {
      if (args.autoClearInterval && stopwatchTimer.intervalID != null) {
        clearInterval(stopwatchTimer.intervalID);
      }
    });

    return stopwatchStore;
  }
)(
  globalThis.clearInterval,
  StopwatchTimer,
  createMutable,
  onMount,
  onCleanup
) as UseStopwatchHook;
