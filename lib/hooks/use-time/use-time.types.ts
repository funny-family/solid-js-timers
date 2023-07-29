import type {
  AutoClearableInterval,
  AutoClearableListeners,
  AutoClearableListersArgs,
  AutoClearableStore,
  AutoClearableTimer,
  AutoStartable,
  RequireAtLeastOne,
} from '../../types';

export type UseTimeHookArgFormat = Extract<
  NonNullable<Intl.DateTimeFormatOptions['hourCycle']>,
  'h24' | 'h12'
>;

export type UseTimeHookArgs = {
  hourCycle?: UseTimeHookArgFormat;
} & Partial<AutoStartable> &
  Partial<AutoClearableInterval> &
  Partial<AutoClearableTimer> &
  Partial<AutoClearableListeners> &
  Partial<AutoClearableListersArgs> &
  Partial<AutoClearableStore>;

export type UseTimeHookHookListenerArgs = Readonly<
  Pick<
    UseTimeHookReturnValue,
    'seconds' | 'minutes' | 'hours' | 'ampm' | 'isRunning'
  >
>;

export type UseTimeHookListenerCallback = (
  args: UseTimeHookHookListenerArgs
) => void;

export type UseTimeHookListener = (
  callback: UseTimeHookListenerCallback
) => void;

export type UseTimeHookReturnValue = {
  seconds: string;
  minutes: string;
  hours: string;
  ampm: string;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  onUpdate: UseTimeHookListener;
  onStart: UseTimeHookListener;
  onStop: UseTimeHookListener;
};

export type UseTimeHook = (
  args?: RequireAtLeastOne<UseTimeHookArgs>
) => Readonly<UseTimeHookReturnValue>;
