import type {
  AutoStartable,
  AutoClearableListeners,
  AutoClearableInterval,
  RequireAtLeastOne,
} from './../../types';
import { type StopwatchInterface } from './stopwatch';

export type UseStopwatchHookArgs = {
  initialMilliseconds?: number;
} & Partial<AutoStartable> &
  Partial<AutoClearableListeners> &
  Partial<AutoClearableInterval>;

export type UseStopwatchHookListenerArgs = Readonly<
  Pick<
    UseStopwatchHookReturnValue,
    'milliseconds' | 'seconds' | 'minutes' | 'value' | 'isRunning'
  >
>;

export type UseStopwatchHookListenerCallback = (
  args: UseStopwatchHookListenerArgs
) => void;

export type UseStopwatchHookListener = (
  callback: UseStopwatchHookListenerCallback
) => void;

export type UseStopwatchHookReturnValue = {
  milliseconds: string;
  seconds: string;
  minutes: string;
  value: number;
  isRunning: boolean;
  onStart: UseStopwatchHookListener;
  onStop: UseStopwatchHookListener;
  onReset: UseStopwatchHookListener;
  onUpdate: UseStopwatchHookListener;
} & Pick<StopwatchInterface, 'start' | 'stop' | 'reset'>;

export type UseStopwatchHook = (
  args?: RequireAtLeastOne<UseStopwatchHookArgs>
) => Readonly<UseStopwatchHookReturnValue>;
