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
  /**
   * @description
   * Current number of milliseconds.
   *
   * @example
   * ```js
   * console.log(timer.milliseconds);
   * ```
   */
  milliseconds: CountdownInterface['milliseconds'];
  /**
   * @description
   * Current number of seconds.
   *
   * @example
   * ```js
   * console.log(timer.seconds);
   * ```
   */
  seconds: number;
  /**
   * @description
   * Current number of minutes.
   *
   * @example
   * ```js
   * console.log(timer.minutes);
   * ```
   */
  minutes: number;
  /**
   * @description
   * Current number of hours.
   *
   * @example
   * ```js
   * console.log(timer.hours);
   * ```
   */
  hours: number;
  /**
   * @description
   * Current number of days.
   *
   * @example
   * ```js
   * console.log(timer.days);
   * ```
   */
  days: number;
  /**
   * @description
   * Indicates whether the timer is running or not.
   *
   * @example
   * ```js
   * console.log(timer.isRunning);
   * ```
   */
  isRunning: CountdownInterface['isRunning'];
  /**
   * @description
   * Sets the number of milliseconds.
   *
   * @example
   * ```js
   * timer.setMilliseconds(() => 69000);
   * ```
   */
  setMilliseconds: (
    predicate: () => UseTimerHookReturnValue['milliseconds']
  ) => void;
  /**
   * @description
   * Start timer.
   *
   * @example
   * ```js
   * timer.start();
   * ```
   */
  start: CountdownInterface['start'];
  /**
   * @description
   * Stop timer.
   *
   * @example
   * ```js
   * timer.stop();
   * ```
   */
  stop: CountdownInterface['stop'];
  /**
   * @description
   * Reset timer.
   *
   * @example
   * ```js
   * timer.reset();
   * ```
   */
  reset: CountdownInterface['reset'];
  /**
   * @description
   * Listener method that fires on the specified timer event.
   *
   * @example
   * ```js
   * timer.on('update', () => {
   *    console.log('updated!');
   * });
   * ```
   */
  on: (
    type: Parameters<CountdownInterface['on']>[0],
    listener: UseTimerHookListenerCallback
  ) => void;
};

export type UseTimerHook = (
  args?: RequireAtLeastOne<UseTimerHookArgs>
) => Readonly<UseTimerHookReturnValue>;
