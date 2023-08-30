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
  /**
   * @description
   * Current date object.
   *
   * @example
   * ```js
   * console.log(time.currentDate);
   * ```
   */
  currentDate: CurrentDateInterface['date'];
  /**
   * @description
   * 'AM' or 'PM' depends on time.
   *
   * @example
   * ```js
   * console.log(time.ampm);
   * ```
   */
  ampm: string;
  /**
   * @description
   * Indicates whether the timer is running or not.
   *
   * @example
   * ```js
   * console.log(time.isRunning);
   * ```
   */
  isRunning: CurrentDateInterface['isRunning'];
  /**
   * @description
   * Start timer.
   *
   * @example
   * ```js
   * time.start();
   * ```
   */
  start: CurrentDateInterface['start'];
  /**
   * @description
   * Stop timer.
   *
   * @example
   * ```js
   * time.stop();
   * ```
   */
  stop: CurrentDateInterface['stop'];
  /**
   * @description
   * Listener method that fires on the specified timer event.
   *
   * @example
   * ```js
   * time.on('update', () => {
   *    console.log('updated!');
   * });
   * ```
   */
  on: (
    type: Parameters<CurrentDateInterface['on']>[0],
    listener: UseTimeHookListenerCallback
  ) => void;
};

export type UseTimeHook = (
  args?: RequireAtLeastOne<UseTimeHookArgs>
) => Readonly<UseTimeHookReturnValue>;
