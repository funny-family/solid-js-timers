import { type StopwatchInterface } from './stopwatch';
import type {
  AutoClearableListeners,
  AutoClearableInterval,
  RequireAtLeastOne,
  AutoClearableTimer,
  AutoClearableListersArgs,
  AutoClearableStore,
} from './../../types';

export type UseStopwatchHookArgs = Partial<AutoClearableInterval> &
  Partial<AutoClearableTimer> &
  Partial<AutoClearableListeners> &
  Partial<AutoClearableListersArgs> &
  Partial<AutoClearableStore>;

export type UseStopwatchHookListenerArgs = Readonly<
  Pick<
    UseStopwatchHookReturnValue,
    'milliseconds' | 'seconds' | 'minutes' | 'isRunning'
  >
>;

export type UseStopwatchHookListenerCallback = (
  args: UseStopwatchHookListenerArgs
) => void;

export type UseStopwatchHookListener = (
  callback: UseStopwatchHookListenerCallback
) => void;

export type UseStopwatchHookReturnValue = {
  /**
   * @description
   * Current number of milliseconds.
   *
   * @example
   * ```js
   * console.log(stopwatch.milliseconds);
   * ```
   */
  milliseconds: StopwatchInterface['milliseconds'];
  /**
   * @description
   * Current amount of seconds.
   *
   * @example
   * ```js
   * console.log(stopwatch.seconds);
   * ```
   */
  seconds: number;
  /**
   * @description
   * Current amount of minutes.
   *
   * @example
   * ```js
   * console.log(stopwatch.minutes);
   * ```
   */
  minutes: number;
  /**
   * @description
   * Indicates whether the timer is running or not.
   *
   * @example
   * ```js
   * console.log(stopwatch.isRunning);
   * ```
   */
  isRunning: StopwatchInterface['isRunning'];
  /**
   * @description
   * Sets the number of milliseconds.
   *
   * @example
   * ```js
   * stopwatch.setMilliseconds(() => 69000);
   * ```
   */
  setMilliseconds: (
    predicate: (args: {
      currentMilliseconds: UseStopwatchHookReturnValue['milliseconds'];
    }) => UseStopwatchHookReturnValue['milliseconds']
  ) => void;
  /**
   * @description
   * Start timer.
   *
   * @example
   * ```js
   * stopwatch.start();
   * ```
   */
  start: StopwatchInterface['start'];
  /**
   * @description
   * Stop timer.
   *
   * @example
   * ```js
   * stopwatch.stop();
   * ```
   */
  stop: StopwatchInterface['stop'];
  /**
   * @description
   * Reset timer.
   *
   * @example
   * ```js
   * stopwatch.reset();
   * ```
   */
  reset: StopwatchInterface['reset'];
  /**
   * @description
   * Listener method that fires on the specified timer event.
   *
   * @example
   * ```js
   * stopwatch.on('update', () => {
   *    console.log('updated!');
   * });
   * ```
   */
  on: (
    type: Parameters<StopwatchInterface['on']>[0],
    listener: UseStopwatchHookListenerCallback
  ) => void;
};

export type UseStopwatchHook = (
  args?: RequireAtLeastOne<UseStopwatchHookArgs>
) => Readonly<UseStopwatchHookReturnValue>;
