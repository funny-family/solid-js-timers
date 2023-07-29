import type {
  AutoStartable,
  AutoClearableListeners,
  AutoClearableInterval,
  RequireAtLeastOne,
  AutoClearableTimer,
  AutoClearableListersArgs,
  AutoClearableStore,
} from './../../types';
import { type StopwatchInterface } from './stopwatch';

export type UseStopwatchHookArgs = {
  initialMilliseconds?: number;
} & Partial<AutoStartable> &
  Partial<AutoClearableInterval> &
  Partial<AutoClearableTimer> &
  Partial<AutoClearableListeners> &
  Partial<AutoClearableListersArgs> &
  Partial<AutoClearableStore>;

export type UseStopwatchHookListenerArgs = Readonly<
  Pick<
    UseStopwatchHookReturnValue,
    /* values as numbers */
    | 'millisecondsAsString'
    | 'secondsAsString'
    | 'minutesAsString'
    /* values as numbers */

    /* values as numbers */
    | 'millisecondsAsNumber'
    | 'secondsAsNumber'
    | 'minutesAsNumber'
    | 'isRunning'
    /* values as numbers */
  >
>;

export type UseStopwatchHookListenerCallback = (
  args: UseStopwatchHookListenerArgs
) => void;

export type UseStopwatchHookListener = (
  callback: UseStopwatchHookListenerCallback
) => void;

export type UseStopwatchHookReturnValue = {
  /* values as stings */
  millisecondsAsString: string;
  secondsAsString: string;
  minutesAsString: string;
  /* values as stings */

  /* values as numbers */
  millisecondsAsNumber: number;
  secondsAsNumber: number;
  minutesAsNumber: number;
  /* values as numbers */

  isRunning: boolean;

  onStart: UseStopwatchHookListener;
  onStop: UseStopwatchHookListener;
  onReset: UseStopwatchHookListener;
  onUpdate: UseStopwatchHookListener;
} & Pick<StopwatchInterface, 'start' | 'stop' | 'reset'>;

export type UseStopwatchHook = (
  args?: RequireAtLeastOne<UseStopwatchHookArgs>
) => Readonly<UseStopwatchHookReturnValue>;
