import { onCleanup, onMount } from 'solid-js';
import { createMutable } from 'solid-js/store';
import {
  type StopwatchTimerInterface,
  StopwatchTimer,
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
} & Pick<StopwatchTimerInterface, 'start' | 'stop' | 'reset'>;
type UseStopwatchHook = (
  args?: UseStopwatchHookArgs
) => Readonly<UseStopwatchHookReturnValue>;

export const useStopwatch = (
  (
    clearInterval: WindowClearInterval,
    StopwatchTimer: { new (): StopwatchTimer },
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
      start: null as any as () => {},
      stop: null as any as () => {},
      reset: null as any as () => {},
    });

    stopwatchStore.start = () => {
      stopwatchTimer.start();
      stopwatchStore.value = stopwatchTimer.clock;
    };

    stopwatchStore.stop = () => {
      stopwatchTimer.stop();
      stopwatchStore.value = stopwatchTimer.clock;
    };

    stopwatchStore.reset = () => {
      stopwatchTimer.reset();
      stopwatchStore.milliseconds = '00';
      stopwatchStore.seconds = '00';
      stopwatchStore.minutes = '00';
      stopwatchStore.value = 0;
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
