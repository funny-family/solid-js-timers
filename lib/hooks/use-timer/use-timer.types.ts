import type {
  AutoClearableInterval,
  AutoClearableListeners,
  AutoClearableListersArgs,
  AutoClearableStore,
  AutoClearableTimer,
  AutoStartable,
} from './../../types';

export type UseTimerHookArgs = {
  initialMilliseconds: number;
} & Partial<AutoStartable> &
  Partial<AutoClearableInterval> &
  Partial<AutoClearableTimer> &
  Partial<AutoClearableListeners> &
  Partial<AutoClearableListersArgs> &
  Partial<AutoClearableStore>;

export type UseTimerHookCallbackArgs = Readonly<
  Pick<
    UseTimerHookReturnValue,
    | 'seconds'
    | 'minutes'
    | 'hours'
    | 'days'
    | 'isRunning'
  >
>;

export type UseTimerHookListenerCallback = (
  args: UseTimerHookCallbackArgs
) => void;

export type UseTimerHookListener = (
  callback: UseTimerHookListenerCallback
) => void;

export type UseTimerHookReturnValue = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;

  isRunning: boolean;

  start: () => void;
  stop: () => void;
  reset: () => void;

  onStart: UseTimerHookListener;
  onEnd: UseTimerHookListener;
  onStop: UseTimerHookListener;
  onReset: UseTimerHookListener;
  onUpdate: UseTimerHookListener;
};

export type UseTimerHook = (args: UseTimerHookArgs) => UseTimerHookReturnValue;
