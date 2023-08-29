import { type StopwatchInterface } from './stopwatch';
import type {
  AutoStartable,
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
  milliseconds: number;
  seconds: number;
  minutes: number;
  isRunning: boolean;
  setMilliseconds: (
    predicate: (args: {
      currentMilliseconds: UseStopwatchHookReturnValue['milliseconds'];
    }) => UseStopwatchHookReturnValue['milliseconds']
  ) => void;
  on: (
    type: Parameters<StopwatchInterface['on']>[0],
    listener: UseStopwatchHookListenerCallback
  ) => void;
} & Pick<StopwatchInterface, 'start' | 'stop' | 'reset'>;

export type UseStopwatchHook = (
  args?: RequireAtLeastOne<UseStopwatchHookArgs>
) => Readonly<UseStopwatchHookReturnValue>;
