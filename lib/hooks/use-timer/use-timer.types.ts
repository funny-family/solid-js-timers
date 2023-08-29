import { type CountdownInterface } from './countdown';
import type {
  AutoClearableInterval,
  AutoClearableListeners,
  AutoClearableListersArgs,
  AutoClearableStore,
  AutoClearableTimer,
  RequireAtLeastOne,
} from './../../types';

export type UseTimerHookArgs = Partial<AutoClearableInterval> &
  Partial<AutoClearableTimer> &
  Partial<AutoClearableListeners> &
  Partial<AutoClearableListersArgs> &
  Partial<AutoClearableStore>;

export type UseTimerHookCallbackArgs = Readonly<
  Pick<
    UseTimerHookReturnValue,
    'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'isRunning'
  >
>;

export type UseTimerHookListenerCallback = (
  args: UseTimerHookCallbackArgs
) => void;

export type UseTimerHookListener = (
  callback: UseTimerHookListenerCallback
) => void;

export type UseTimerHookReturnValue = {
  milliseconds: CountdownInterface['milliseconds'];
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  isRunning: CountdownInterface['isRunning'];
  setMilliseconds: (
    predicate: () => UseTimerHookReturnValue['milliseconds']
  ) => void;
  start: CountdownInterface['start'];
  stop: CountdownInterface['stop'];
  reset: CountdownInterface['reset'];
  on: (
    type: Parameters<CountdownInterface['on']>[0],
    listener: UseTimerHookListenerCallback
  ) => void;
};

export type UseTimerHook = (
  args?: RequireAtLeastOne<UseTimerHookArgs>
) => Readonly<UseTimerHookReturnValue>;
