import { onCleanup, onMount } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { Countdown, CountdownConstructor } from './countdown';
import type {
  UseTimerHook,
  UseTimerHookArgs,
  UseTimerHookCallbackArgs,
  UseTimerHookListenerCallback,
  UseTimerHookReturnValue,
} from './use-timer.types';
import type {
  CreateMutable,
  OnCleanupFunction,
  OnMountFunction,
  Writable,
} from '../../types';
import {
  calculateSeconds,
  calculateMinutes,
  calculateHours,
  calculateDays,
} from './use-timer.utils';

export const useTimer = (
  (
    Countdown: CountdownConstructor,
    createMutable: CreateMutable,
    onMount: OnMountFunction,
    onCleanup: OnCleanupFunction
  ) =>
  (args: Required<UseTimerHookArgs>) => {
    if (args.initialMilliseconds == null) {
      args.initialMilliseconds = 0;
    }

    if (args.autostart == null) {
      args.autostart = false;
    }

    if (args.autoClearInterval == null) {
      args.autoClearInterval = true;
    }

    if (args.autoClearTimer == null) {
      args.autoClearTimer = true;
    }

    if (args.autoClearListeners == null) {
      args.autoClearListeners = true;
    }

    if (args.autoClearListersArgs == null) {
      args.autoClearListersArgs = true;
    }

    if (args.autoClearStore == null) {
      args.autoClearStore = true;
    }

    let startListeners = Array<UseTimerHookListenerCallback>();
    let stopListeners = Array<UseTimerHookListenerCallback>();
    let resetListeners = Array<UseTimerHookListenerCallback>();
    let endListeners = Array<UseTimerHookListenerCallback>();
    let updateListeners = Array<UseTimerHookListenerCallback>();

    let countdown = new Countdown(args.initialMilliseconds);
    let timerStore = createMutable<UseTimerHookReturnValue>({
      seconds: calculateSeconds(countdown.milliseconds),
      minutes: calculateMinutes(countdown.milliseconds),
      hours: calculateHours(countdown.milliseconds),
      days: calculateDays(countdown.milliseconds),
      isRunning: countdown.isRunning,
      start: countdown.start,
      stop: countdown.stop,
      reset: countdown.reset,
      onStart: (callback) => {
        startListeners.push(callback);
      },
      onEnd: (callback) => {
        endListeners.push(callback);
      },
      onStop: (callback) => {
        stopListeners.push(callback);
      },
      onReset: (callback) => {
        resetListeners.push(callback);
      },
      onUpdate: (callback) => {
        updateListeners.push(callback);
      },
    });
    console.log(1, countdown);
    console.log(2, timerStore);

    let startListenerArgs: Writable<UseTimerHookCallbackArgs> = {
      seconds: timerStore.seconds,
      minutes: timerStore.minutes,
      hours: timerStore.hours,
      days: timerStore.days,
      isRunning: timerStore.isRunning,
    };

    let endListenerArgs: Writable<UseTimerHookCallbackArgs> = {
      seconds: timerStore.seconds,
      minutes: timerStore.minutes,
      hours: timerStore.hours,
      days: timerStore.days,
      isRunning: timerStore.isRunning,
    };

    let stopListenerArgs: Writable<UseTimerHookCallbackArgs> = {
      seconds: timerStore.seconds,
      minutes: timerStore.minutes,
      hours: timerStore.hours,
      days: timerStore.days,
      isRunning: timerStore.isRunning,
    };

    let resetListenerArgs: Writable<UseTimerHookCallbackArgs> = {
      seconds: timerStore.seconds,
      minutes: timerStore.minutes,
      hours: timerStore.hours,
      days: timerStore.days,
      isRunning: timerStore.isRunning,
    };

    let updateListenerArgs: Writable<UseTimerHookCallbackArgs> = {
      seconds: timerStore.seconds,
      minutes: timerStore.minutes,
      hours: timerStore.hours,
      days: timerStore.days,
      isRunning: timerStore.isRunning,
    };

    countdown.onStart(() => {
      timerStore.seconds = calculateSeconds(countdown.milliseconds);
      timerStore.minutes = calculateMinutes(countdown.milliseconds);
      timerStore.hours = calculateHours(countdown.milliseconds);
      timerStore.days = calculateDays(countdown.milliseconds);
      timerStore.isRunning = countdown.isRunning;

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

    countdown.onEnd(() => {
      // timerStore.seconds = calculateSeconds(countdown.milliseconds);
      // timerStore.minutes = calculateMinutes(countdown.milliseconds);
      // timerStore.hours = calculateHours(countdown.milliseconds);
      // timerStore.days = calculateDays(countdown.milliseconds);
      timerStore.isRunning = countdown.isRunning;

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

    countdown.onStop(() => {
      // timerStore.seconds = calculateSeconds(countdown.milliseconds);
      // timerStore.minutes = calculateMinutes(countdown.milliseconds);
      // timerStore.hours = calculateHours(countdown.milliseconds);
      // timerStore.days = calculateDays(countdown.milliseconds);
      timerStore.isRunning = countdown.isRunning;

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

    countdown.onReset(() => {
      timerStore.seconds = 0;
      timerStore.minutes = 0;
      timerStore.hours = 0;
      timerStore.days = 0;
      timerStore.isRunning = countdown.isRunning;

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

    countdown.onUpdate(() => {
      // const value = Math.ceil(countdown.milliseconds / 1000);
      // timerStore.seconds = `${value % 60}`.padStart(2, '0');
      // timerStore.minutes = `${Math.floor(value / 60) % 60}`.padStart(2, '0');
      // timerStore.hours = `${Math.floor(value / 60 / 60) % 24}`.padStart(2, '0');
      // timerStore.days = `${Math.floor(value / 60 / 60 / 24) % 7}`.padStart(
      //   2,
      //   '0'
      // );
      // timerStore.weeks = `${Math.floor(value / 60 / 60 / 24) % 7}`.padStart(
      //   2,
      //   '0'
      // );
      // timerStore.month = `${Math.floor(
      //   value / 60 / 60 / 24 / 30.4368
      // )}`.padStart(2, '0');
      // timerStore.years = `${Math.abs(
      //   new Date(countdown.milliseconds).getFullYear() -
      //     new Date().getFullYear()
      // )}`.padStart(2, '0');
      // timerStore.value = countdown.milliseconds;
      // timerStore.isRunning = countdown.isRunning;

      timerStore.seconds = calculateSeconds(countdown.milliseconds);
      timerStore.minutes = calculateMinutes(countdown.milliseconds);
      timerStore.hours = calculateHours(countdown.milliseconds);
      timerStore.days = calculateDays(countdown.milliseconds);

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

    onMount(() => {
      if (args.autostart) {
        countdown.start();
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
        (timerStore as unknown) = null;
      }
    });

    console.log({
      countdown,
      timerStore,
    });

    return timerStore;
  }
)(Countdown, createMutable, onMount, onCleanup) as UseTimerHook;
