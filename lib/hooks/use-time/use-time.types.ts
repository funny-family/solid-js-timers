import type {
  AutoClearableInterval,
  AutoClearableListeners,
  AutoClearableListersArgs,
  AutoClearableStore,
  AutoClearableTimer,
  AutoStartable,
  RequireAtLeastOne,
} from '../../types';

export type UseTimeHookArgs = {
  localesArgument?: Parameters<Date['toLocaleTimeString']>[0];
  dateTimeFormatOptions?: Parameters<Date['toLocaleTimeString']>[1];
} & Partial<AutoStartable> &
  Partial<AutoClearableInterval> &
  Partial<AutoClearableTimer> &
  Partial<AutoClearableListeners> &
  Partial<AutoClearableListersArgs> &
  Partial<AutoClearableStore>;

export type UseTimeHookHookListenerArgs = Readonly<
  Pick<
    UseTimeHookReturnValue,
    | 'utcSeconds'
    | 'utcMinutes'
    | 'utcHours'
    | 'localSeconds'
    | 'localMinutes'
    | 'localHours'
    | 'localeTimeString'
    | 'ampm'
    | 'isRunning'
  >
>;

export type UseTimeHookListenerCallback = (
  args: UseTimeHookHookListenerArgs
) => void;

export type UseTimeHookListener = (
  callback: UseTimeHookListenerCallback
) => void;

export type UseTimeHookReturnValue = {
  utcSeconds: number;
  utcMinutes: number;
  utcHours: number;
  localSeconds: number;
  localMinutes: number;
  localHours: number;
  localeTimeString: string;
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
