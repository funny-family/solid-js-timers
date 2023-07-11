import { onCleanup, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  type OnCleanupFunction,
  type CreateStore,
  type OnMountFunction,
  type WindowClearInterval,
} from '../../types';
import {
  type StopwatchTimerInterface,
  StopwatchTimer,
} from './stopwatch-timer.class';

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
) => UseStopwatchHookReturnValue;

export const useStopwatch = (
  (
    clearInterval: WindowClearInterval,
    StopwatchTimer: { new (): StopwatchTimer },
    createStore: CreateStore,
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

    const stopwatchStore = createStore<UseStopwatchHookReturnValue>({
      milliseconds: '00',
      seconds: '00',
      minutes: '00',
      value: stopwatchTimer.clock,
      start: null as any as () => {},
      stop: null as any as () => {},
      reset: null as any as () => {},
    });

    stopwatchStore[1]('start', () => () => {
      stopwatchTimer.start();
      stopwatchStore[1]('value', stopwatchTimer.clock);
    });

    stopwatchStore[1]('stop', () => () => {
      stopwatchTimer.stop();
      stopwatchStore[1]('value', stopwatchTimer.clock);
    });

    stopwatchStore[1]('reset', () => () => {
      stopwatchTimer.reset();
      stopwatchStore[1]('milliseconds', '00');
      stopwatchStore[1]('seconds', '00');
      stopwatchStore[1]('minutes', '00');
      stopwatchStore[1]('value', 0);
    });

    stopwatchTimer.onUpdate(() => {
      stopwatchStore[1](
        'milliseconds',
        `${stopwatchTimer.clock || '00'}`.padStart(2, '0').slice(-2)
      );

      stopwatchStore[1](
        'seconds',
        `${~~((stopwatchTimer.clock % 60000) / 1000)}`.padStart(2, '0')
      );
      stopwatchStore[1](
        'minutes',
        `${~~(stopwatchTimer.clock / 60000)}`.padStart(2, '0')
      );
      stopwatchStore[1]('value', stopwatchTimer.clock);

      if (stopwatchTimer.clock === 3600000) {
        stopwatchTimer.reset();
      }
    });

    onMount(() => {
      if (args.autoStart) {
        stopwatchStore[0].start();
      }
    });

    onCleanup(() => {
      if (args.autoClearInterval && stopwatchTimer.intervalID != null) {
        clearInterval(stopwatchTimer.intervalID);
      }
    });

    return stopwatchStore[0];
  }
)(
  globalThis.clearInterval,
  StopwatchTimer,
  createStore,
  onMount,
  onCleanup
) as UseStopwatchHook;
