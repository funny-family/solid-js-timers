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
    /* utc */
    | 'utcSeconds'
    | 'utcMinutes'
    | 'utcHours'
    /* utc */

    /* local */
    | 'localSeconds'
    | 'localMinutes'
    | 'localHours'
    /* local */
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
  /* utc */
  utcSeconds: number;
  utcMinutes: number;
  utcHours: number;
  /* utc */

  /* local */
  localSeconds: number;
  localMinutes: number;
  localHours: number;
  /* local */

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
