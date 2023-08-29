import { type CurrentDateInterface } from './current-date';
import type {
  AutoClearableInterval,
  AutoClearableListeners,
  AutoClearableListersArgs,
  AutoClearableStore,
  AutoClearableTimer,
  FilterNotStartingWith,
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

type ImmutableDate = Pick<Date, FilterNotStartingWith<keyof Date, 'set'>>;

export type UseTimeHookReturnValue = {
  currentDate: ImmutableDate;
  ampm: string;
  isRunning: CurrentDateInterface['isRunning'];
  start: CurrentDateInterface['start'];
  stop: CurrentDateInterface['stop'];
  on: (
    type: Parameters<CurrentDateInterface['on']>[0],
    listener: UseTimeHookListenerCallback
  ) => void;
};

export type UseTimeHook = (
  args?: RequireAtLeastOne<UseTimeHookArgs>
) => Readonly<UseTimeHookReturnValue>;
