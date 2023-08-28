import type {
  AutoClearableInterval,
  AutoClearableListeners,
  AutoClearableListersArgs,
  AutoClearableStore,
  AutoClearableTimer,
  RequireAtLeastOne,
} from '../../types';

export type UseTimeHookArgs = Partial<AutoClearableInterval> &
  Partial<AutoClearableTimer> &
  Partial<AutoClearableListeners> &
  Partial<AutoClearableListersArgs> &
  Partial<AutoClearableStore>;

export type UseTimeHookHookListenerArgs = Readonly<
  Pick<UseTimeHookReturnValue, 'currentDate' | 'ampm' | 'isRunning'>
>;

export type UseTimeHookListenerCallback = (
  args: UseTimeHookHookListenerArgs
) => void;

export type UseTimeHookListener = (
  callback: UseTimeHookListenerCallback
) => void;

export type UseTimeHookReturnValue = {
  currentDate: Date;
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
