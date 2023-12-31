import { batch, onCleanup } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { Countdown, CountdownConstructor } from './countdown';
import {
  calculateSeconds,
  calculateMinutes,
  calculateHours,
  calculateDays,
} from './use-timer.utils';
import type {
  UseTimerHook,
  UseTimerHookArgs,
  UseTimerHookCallbackArgs,
  UseTimerHookListenerCallback,
  UseTimerHookReturnValue,
} from './use-timer.types';
import type { Batch, CreateMutable, OnCleanup, Writable } from '../../types';

export const useTimerSetup = (
  Countdown: CountdownConstructor,
  createMutable: CreateMutable,
  batch: Batch,
  onCleanup: OnCleanup
) =>
  ((args: Required<UseTimerHookArgs>) => {
    (args as unknown) = {};
    args.autoClearInterval ||= true;
    args.autoClearTimer ||= true;
    args.autoClearListeners ||= true;
    args.autoClearListersArgs ||= true;
    args.autoClearStore ||= true;

    let startListeners = Array<UseTimerHookListenerCallback>();
    let stopListeners = Array<UseTimerHookListenerCallback>();
    let resetListeners = Array<UseTimerHookListenerCallback>();
    let endListeners = Array<UseTimerHookListenerCallback>();
    let updateListeners = Array<UseTimerHookListenerCallback>();

    let countdown = new Countdown();
    let timerStore = createMutable<UseTimerHookReturnValue>({
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      isRunning: countdown.isRunning,
      setMilliseconds(predicate) {
        countdown.setMilliseconds(predicate());

        batch(() => {
          this.milliseconds = countdown.milliseconds;
          this.seconds = calculateSeconds(countdown.milliseconds);
          this.minutes = calculateMinutes(countdown.milliseconds);
          this.hours = calculateHours(countdown.milliseconds);
          this.days = calculateDays(countdown.milliseconds);
        });
      },
      start: countdown.start,
      stop: countdown.stop,
      reset: countdown.reset,
      on(type, listener) {
        if (type === 'start') {
          startListeners.push(listener);
        }

        if (type === 'end') {
          endListeners.push(listener);
        }

        if (type === 'stop') {
          stopListeners.push(listener);
        }

        if (type === 'reset') {
          resetListeners.push(listener);
        }

        if (type === 'update') {
          updateListeners.push(listener);
        }
      },
    });

    let startListenerArgs: Writable<UseTimerHookCallbackArgs> = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      isRunning: timerStore.isRunning,
    };

    let endListenerArgs: Writable<UseTimerHookCallbackArgs> = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      isRunning: false,
    };

    let stopListenerArgs: Writable<UseTimerHookCallbackArgs> = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      isRunning: false,
    };

    let resetListenerArgs: Writable<UseTimerHookCallbackArgs> = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      isRunning: false,
    };

    let updateListenerArgs: Writable<UseTimerHookCallbackArgs> = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      isRunning: false,
    };

    countdown.on('start', () => {
      timerStore.isRunning = countdown.isRunning;

      startListenerArgs.milliseconds = timerStore.milliseconds;
      startListenerArgs.seconds = timerStore.seconds;
      startListenerArgs.minutes = timerStore.minutes;
      startListenerArgs.hours = timerStore.hours;
      startListenerArgs.days = timerStore.days;
      startListenerArgs.isRunning = timerStore.isRunning;

      if (startListeners.length === 1) {
        startListeners[0](startListenerArgs);
      }

      if (startListeners.length > 1) {
        for (let i = 0; i < startListeners.length; i++) {
          startListeners[i](startListenerArgs);
        }
      }
    });

    countdown.on('end', () => {
      batch(() => {
        timerStore.milliseconds = 0;
        timerStore.minutes = 0;
        timerStore.hours = 0;
        timerStore.days = 0;
        timerStore.isRunning = countdown.isRunning;
      });

      endListenerArgs.milliseconds = timerStore.milliseconds;
      endListenerArgs.seconds = timerStore.seconds;
      endListenerArgs.minutes = timerStore.minutes;
      endListenerArgs.hours = timerStore.hours;
      endListenerArgs.days = timerStore.days;
      endListenerArgs.isRunning = timerStore.isRunning;

      if (endListeners.length === 1) {
        endListeners[0](endListenerArgs);
      }

      if (endListeners.length > 1) {
        for (let i = 0; i < endListeners.length; i++) {
          endListeners[i](endListenerArgs);
        }
      }
    });

    countdown.on('stop', () => {
      timerStore.isRunning = countdown.isRunning;

      stopListenerArgs.milliseconds = timerStore.milliseconds;
      stopListenerArgs.seconds = timerStore.seconds;
      stopListenerArgs.minutes = timerStore.minutes;
      stopListenerArgs.hours = timerStore.hours;
      stopListenerArgs.days = timerStore.days;
      stopListenerArgs.isRunning = timerStore.isRunning;

      if (stopListeners.length === 1) {
        stopListeners[0](stopListenerArgs);
      }

      if (stopListeners.length > 1) {
        for (let i = 0; i < stopListeners.length; i++) {
          stopListeners[i](stopListenerArgs);
        }
      }
    });

    countdown.on('reset', () => {
      batch(() => {
        timerStore.milliseconds = 0;
        timerStore.seconds = 0;
        timerStore.minutes = 0;
        timerStore.hours = 0;
        timerStore.days = 0;
        timerStore.isRunning = countdown.isRunning;
      });

      resetListenerArgs.milliseconds = timerStore.milliseconds;
      resetListenerArgs.seconds = timerStore.seconds;
      resetListenerArgs.minutes = timerStore.minutes;
      resetListenerArgs.hours = timerStore.hours;
      resetListenerArgs.days = timerStore.days;
      resetListenerArgs.isRunning = timerStore.isRunning;

      if (resetListeners.length === 1) {
        resetListeners[0](resetListenerArgs);
      }

      if (resetListeners.length > 1) {
        for (let i = 0; i < resetListeners.length; i++) {
          resetListeners[i](resetListenerArgs);
        }
      }
    });

    countdown.on('update', () => {
      batch(() => {
        timerStore.milliseconds = countdown.milliseconds;
        timerStore.seconds = calculateSeconds(countdown.milliseconds);
        timerStore.minutes = calculateMinutes(countdown.milliseconds);
        timerStore.hours = calculateHours(countdown.milliseconds);
        timerStore.days = calculateDays(countdown.milliseconds);
      });

      updateListenerArgs.milliseconds = timerStore.milliseconds;
      updateListenerArgs.seconds = timerStore.seconds;
      updateListenerArgs.minutes = timerStore.minutes;
      updateListenerArgs.hours = timerStore.hours;
      updateListenerArgs.days = timerStore.days;

      if (updateListeners.length === 1) {
        updateListeners[0](updateListenerArgs);
      }

      if (updateListeners.length > 1) {
        for (let i = 0; i < updateListeners.length; i++) {
          updateListeners[i](updateListenerArgs);
        }
      }
    });

    onCleanup(() => {
      if (args.autoClearInterval) {
        countdown.clearInterval();
      }

      if (args.autoClearTimer) {
        (countdown as unknown) = null;
      }

      if (args.autoClearListeners) {
        (startListeners as unknown) = null;
        (endListeners as unknown) = null;
        (stopListeners as unknown) = null;
        (resetListeners as unknown) = null;
        (updateListeners as unknown) = null;
      }

      if (args.autoClearListersArgs) {
        (startListenerArgs as unknown) = null;
        (endListenerArgs as unknown) = null;
        (stopListenerArgs as unknown) = null;
        (resetListenerArgs as unknown) = null;
        (updateListenerArgs as unknown) = null;
      }

      if (args.autoClearStore) {
        (timerStore as unknown) = null;
      }
    });

    return timerStore;
  }) as UseTimerHook;

/**
 * @description
 * Custom hook to create countdown timer.
 *
 * @param {Object} args timer configuration. {@link UseTimerHookArgs}
 *
 * @returns {Object} manage timer state. {@link UseTimerHookReturnValue}
 *
 *  * @example
 * ```tsx
 * const App = () => {
 *   const timer = useTimer();
 *   timer.setMilliseconds(() => 50000);
 *
 *   return (
 *     <div>
 *       <div>
 *         <div>
 *           <button type="button" onClick={() => timer.start()}>
 *             start
 *           </button>
 *           <button type="button" onClick={() => timer.stop()}>
 *             stop
 *           </button>
 *           <button type="button" onClick={() => timer.reset()}>
 *             reset
 *           </button>
 *         </div>
 *         <div>timer isRunning: {`${timer.isRunning}`}</div>
 *         <div>timer milliseconds: {timer.milliseconds}</div>
 *         <div>
 *           <span>timer time: </span>
 *           <span>
 *             {timer.days}:
 *             {`${timer.hours}`.padStart(2, '0')}:
 *             {`${timer.minutes}`.padStart(2, '0')}:
 *             {`${timer.seconds}`.padStart(2, '0')}:
 *             {`${timer.milliseconds}`.padStart(2, '0').slice(-2)}
 *           </span>
 *         </div>
 *       </div>
 *     </div>
 *   );
 * };
 * ```
 */
export const useTimer = useTimerSetup(
  Countdown,
  createMutable,
  batch,
  onCleanup
);
