import { batch, onCleanup } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { type StopwatchConstructor, Stopwatch } from './stopwatch';
import {
  type CalculateSeconds,
  type CalculateMinutes,
  calculateSeconds,
  calculateMinutes,
} from './use-stopwatch.utils';
import type {
  UseStopwatchHook,
  UseStopwatchHookArgs,
  UseStopwatchHookListenerArgs,
  UseStopwatchHookListenerCallback,
  UseStopwatchHookReturnValue,
} from './use-stopwatch.types';
import type { OnCleanup, CreateMutable, Writable, Batch } from '../../types';

export const useStopwatchSetup = (
  Stopwatch: StopwatchConstructor,
  calculateSeconds: CalculateSeconds,
  calculateMinutes: CalculateMinutes,
  createMutable: CreateMutable,
  batch: Batch,
  onCleanup: OnCleanup
) =>
  ((args: Required<UseStopwatchHookArgs>) => {
    (args as unknown) = {};
    args.autoClearInterval ||= true;
    args.autoClearTimer ||= true;
    args.autoClearListeners ||= true;
    args.autoClearListersArgs ||= true;
    args.autoClearStore ||= true;

    let startListeners = Array<UseStopwatchHookListenerCallback>();
    let stopListeners = Array<UseStopwatchHookListenerCallback>();
    let resetListeners = Array<UseStopwatchHookListenerCallback>();
    let updateListeners = Array<UseStopwatchHookListenerCallback>();

    let stopwatch = new Stopwatch();
    let stopwatchStore = createMutable<UseStopwatchHookReturnValue>({
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      isRunning: stopwatch.isRunning,
      setMilliseconds(predicate) {
        const milliseconds = predicate({
          currentMilliseconds: stopwatch.milliseconds,
        });

        // support only till 60 min (1 hour)
        if (milliseconds >= 3600000) {
          stopwatch.reset();
        } else {
          stopwatch.milliseconds = milliseconds;
        }

        batch(() => {
          this.milliseconds = stopwatch.milliseconds;
          this.seconds = calculateSeconds(stopwatch.milliseconds);
          this.minutes = calculateMinutes(stopwatch.milliseconds);
        });
      },
      start: stopwatch.start,
      stop: stopwatch.stop,
      reset: stopwatch.reset,
      on(type, listener) {
        if (type === 'start') {
          startListeners.push(listener);
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

    let startListenerArgs: Writable<UseStopwatchHookListenerArgs> = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      isRunning: false,
    };

    let stopListenerArgs: Writable<UseStopwatchHookListenerArgs> = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      isRunning: false,
    };

    let resetListenerArgs: Writable<UseStopwatchHookListenerArgs> = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      isRunning: false,
    };

    let updateListenerArgs: Writable<UseStopwatchHookListenerArgs> = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      isRunning: false,
    };

    stopwatch.on('start', () => {
      stopwatchStore.isRunning = stopwatch.isRunning;

      startListenerArgs.milliseconds = stopwatchStore.milliseconds;
      startListenerArgs.seconds = stopwatchStore.seconds;
      startListenerArgs.minutes = stopwatchStore.minutes;
      startListenerArgs.isRunning = stopwatchStore.isRunning;

      if (startListeners.length === 1) {
        startListeners[0](startListenerArgs);
      }

      if (startListeners.length > 1) {
        for (let i = 0; i < startListeners.length; i++) {
          startListeners[i](startListenerArgs);
        }
      }
    });

    stopwatch.on('stop', () => {
      stopwatchStore.isRunning = stopwatch.isRunning;

      stopListenerArgs.milliseconds = stopwatchStore.milliseconds;
      stopListenerArgs.seconds = stopwatchStore.seconds;
      stopListenerArgs.minutes = stopwatchStore.minutes;
      stopListenerArgs.isRunning = stopwatchStore.isRunning;

      if (stopListeners.length === 1) {
        stopListeners[0](stopListenerArgs);
      }

      if (stopListeners.length > 1) {
        for (let i = 0; i < stopListeners.length; i++) {
          stopListeners[i](stopListenerArgs);
        }
      }
    });

    stopwatch.on('reset', () => {
      batch(() => {
        stopwatchStore.milliseconds = 0;
        stopwatchStore.seconds = 0;
        stopwatchStore.minutes = 0;
        stopwatchStore.isRunning = stopwatch.isRunning;
      });

      resetListenerArgs.milliseconds = stopwatchStore.milliseconds;
      resetListenerArgs.seconds = stopwatchStore.seconds;
      resetListenerArgs.minutes = stopwatchStore.minutes;
      resetListenerArgs.isRunning = stopwatchStore.isRunning;

      if (resetListeners.length === 1) {
        resetListeners[0](resetListenerArgs);
      }

      if (resetListeners.length > 1) {
        for (let i = 0; i < resetListeners.length; i++) {
          resetListeners[i](resetListenerArgs);
        }
      }
    });

    stopwatch.on('update', () => {
      // support only till 60 min (1 hour)
      if (stopwatch.milliseconds >= 3600000) {
        stopwatch.reset();

        return;
      }

      batch(() => {
        stopwatchStore.milliseconds = stopwatch.milliseconds;
        stopwatchStore.seconds = calculateSeconds(stopwatch.milliseconds);
        stopwatchStore.minutes = calculateMinutes(stopwatch.milliseconds);
        stopwatchStore.isRunning = stopwatch.isRunning;
      });

      updateListenerArgs.milliseconds = stopwatchStore.milliseconds;
      updateListenerArgs.seconds = stopwatchStore.seconds;
      updateListenerArgs.minutes = stopwatchStore.minutes;

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
        stopwatch.clearInterval();
      }

      if (args.autoClearTimer) {
        (stopwatch as unknown) = null;
      }

      if (args.autoClearListeners) {
        (startListeners as unknown) = null;
        (stopListeners as unknown) = null;
        (resetListeners as unknown) = null;
        (updateListeners as unknown) = null;
      }

      if (args.autoClearListersArgs) {
        (startListenerArgs as unknown) = null;
        (stopListenerArgs as unknown) = null;
        (resetListenerArgs as unknown) = null;
        (updateListenerArgs as unknown) = null;
      }

      if (args.autoClearStore) {
        (stopwatchStore as unknown) = null;
      }
    });

    return stopwatchStore;
  }) as UseStopwatchHook;

/**
 * @description
 * Custom hook to create stopwatch timer.
 *
 * @param {Object} args timer configuration. {@link UseStopwatchHookArgs}
 *
 * @returns {Object} manage timer state. {@link UseStopwatchHookReturnValue}
 *
 *  * @example
 * ```tsx
 * const App = () => {
 *   const stopwatch = useStopwatch();
 *   stopwatch.setMilliseconds(() => 30000);
 *
 *   return (
 *     <div>
 *       <div>
 *         <div>
 *           <button type="button" onClick={() => stopwatch.start()}>
 *             start
 *           </button>
 *           <button type="button" onClick={() => stopwatch.stop()}>
 *             stop
 *           </button>
 *           <button type="button" onClick={() => stopwatch.reset()}>
 *             reset
 *           </button>
 *         </div>
 *         <div>isRunning: {`${stopwatch.isRunning}`}</div>
 *         <div>stopwatch milliseconds: {stopwatch.milliseconds}</div>
 *         <div>
 *           <span>stopwatch time: </span>
 *           <span>
 *             {`${stopwatch.minutes}`.padStart(2, '0')}:
 *             {`${stopwatch.seconds}`.padStart(2, '0')}:
 *             {`${stopwatch.milliseconds}`.padStart(2, '0').slice(-2)}
 *           </span>
 *         </div>
 *       </div>
 *     </div>
 *   );
 * };
 * ```
 */
export const useStopwatch = useStopwatchSetup(
  Stopwatch,
  calculateSeconds,
  calculateMinutes,
  createMutable,
  batch,
  onCleanup
);
