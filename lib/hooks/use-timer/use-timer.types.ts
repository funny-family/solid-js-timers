import type {
  AutoClearableInterval,
  AutoClearableListeners,
  AutoClearableListersArgs,
  AutoClearableStore,
  AutoClearableTimer,
  AutoStartable,
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
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  isRunning: boolean;
  setMilliseconds: (
    predicate: () => UseTimerHookReturnValue['milliseconds']
  ) => void;
  start: () => void;
  stop: () => void;
  reset: () => void;
  onStart: UseTimerHookListener;
  onEnd: UseTimerHookListener;
  onStop: UseTimerHookListener;
  onReset: UseTimerHookListener;
  onUpdate: UseTimerHookListener;
};

export type UseTimerHook = (
  args?: RequireAtLeastOne<UseTimerHookArgs>
) => Readonly<UseTimerHookReturnValue>;
