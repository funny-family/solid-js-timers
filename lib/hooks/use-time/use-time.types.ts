import { type CurrentDateInterface } from './current-date';
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
  currentDate: CurrentDateInterface['date'];
  ampm: string;
  isRunning: CurrentDateInterface['isRunning'];
  on: (
    type: Parameters<CurrentDateInterface['on']>[0],
    listener: UseTimeHookListenerCallback
  ) => void;
} & Pick<CurrentDateInterface, 'start' | 'stop'>;

export type UseTimeHook = (
  args?: RequireAtLeastOne<UseTimeHookArgs>
) => Readonly<UseTimeHookReturnValue>;
