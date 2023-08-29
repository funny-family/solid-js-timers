import { type StopwatchInterface } from './stopwatch';
import type {
  AutoClearableListeners,
  AutoClearableInterval,
  RequireAtLeastOne,
  AutoClearableTimer,
  AutoClearableListersArgs,
  AutoClearableStore,
} from './../../types';

export type UseStopwatchHookArgs = Partial<AutoClearableInterval> &
  Partial<AutoClearableTimer> &
  Partial<AutoClearableListeners> &
  Partial<AutoClearableListersArgs> &
  Partial<AutoClearableStore>;

export type UseStopwatchHookListenerArgs = Readonly<
  Pick<
    UseStopwatchHookReturnValue,
    'milliseconds' | 'seconds' | 'minutes' | 'isRunning'
  >
>;

export type UseStopwatchHookListenerCallback = (
  args: UseStopwatchHookListenerArgs
) => void;

export type UseStopwatchHookListener = (
  callback: UseStopwatchHookListenerCallback
) => void;

export type UseStopwatchHookReturnValue = {
  milliseconds: StopwatchInterface['milliseconds'];
  seconds: number;
  minutes: number;
  isRunning: StopwatchInterface['isRunning'];
  setMilliseconds: (
    predicate: (args: {
      currentMilliseconds: UseStopwatchHookReturnValue['milliseconds'];
    }) => UseStopwatchHookReturnValue['milliseconds']
  ) => void;
  start: StopwatchInterface['start'];
  stop: StopwatchInterface['stop'];
  reset: StopwatchInterface['reset'];
  on: (
    type: Parameters<StopwatchInterface['on']>[0],
    listener: UseStopwatchHookListenerCallback
  ) => void;
};

export type UseStopwatchHook = (
  args?: RequireAtLeastOne<UseStopwatchHookArgs>
) => Readonly<UseStopwatchHookReturnValue>;
