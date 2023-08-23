import { onCleanup, onMount } from 'solid-js';
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
import type { CreateMutable, OnCleanup, OnMount, Writable } from '../../types';

export const useTimerSetup = (
  Countdown: CountdownConstructor,
  createMutable: CreateMutable,
  onMount: OnMount,
  onCleanup: OnCleanup
) =>
  ((args: Required<UseTimerHookArgs>) => {
    (args as unknown) = {};
    args.autostart ||= false;
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
      setMilliseconds(milliseconds) {
        countdown.setMilliseconds(milliseconds);

        this.milliseconds = milliseconds;
        this.seconds = calculateSeconds(milliseconds);
        this.minutes = calculateMinutes(milliseconds);
        this.hours = calculateHours(milliseconds);
        this.days = calculateDays(milliseconds);
      },
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

    let lArgs: Writable<UseTimerHookCallbackArgs> = {
      milliseconds: timerStore.milliseconds,
      seconds: timerStore.seconds,
      minutes: timerStore.minutes,
      hours: timerStore.hours,
      days: timerStore.days,
      isRunning: timerStore.isRunning,
    };

    countdown.onStart(() => {
      timerStore.isRunning = countdown.isRunning;

      lArgs.milliseconds = timerStore.milliseconds;
      lArgs.seconds = timerStore.seconds;
      lArgs.minutes = timerStore.minutes;
      lArgs.hours = timerStore.hours;
      lArgs.days = timerStore.days;
      lArgs.isRunning = timerStore.isRunning;

      if (startListeners.length === 1) {
        startListeners[0](lArgs);
      }

      if (startListeners.length > 1) {
        for (let i = 0; i < startListeners.length; i++) {
          startListeners[i](lArgs);
        }
      }
    });

    countdown.onEnd(() => {
      timerStore.milliseconds = 0;
      timerStore.minutes = 0;
      timerStore.hours = 0;
      timerStore.days = 0;
      timerStore.isRunning = countdown.isRunning;

      lArgs.milliseconds = timerStore.milliseconds;
      lArgs.seconds = timerStore.seconds;
      lArgs.minutes = timerStore.minutes;
      lArgs.hours = timerStore.hours;
      lArgs.days = timerStore.days;
      lArgs.isRunning = timerStore.isRunning;

      if (endListeners.length === 1) {
        endListeners[0](lArgs);
      }

      if (endListeners.length > 1) {
        for (let i = 0; i < endListeners.length; i++) {
          endListeners[i](lArgs);
        }
      }
    });

    countdown.onStop(() => {
      timerStore.isRunning = countdown.isRunning;

      lArgs.milliseconds = timerStore.milliseconds;
      lArgs.seconds = timerStore.seconds;
      lArgs.minutes = timerStore.minutes;
      lArgs.hours = timerStore.hours;
      lArgs.days = timerStore.days;
      lArgs.isRunning = timerStore.isRunning;

      if (stopListeners.length === 1) {
        stopListeners[0](lArgs);
      }

      if (stopListeners.length > 1) {
        for (let i = 0; i < stopListeners.length; i++) {
          stopListeners[i](lArgs);
        }
      }
    });

    countdown.onReset(() => {
      timerStore.milliseconds = 0;
      timerStore.seconds = 0;
      timerStore.minutes = 0;
      timerStore.hours = 0;
      timerStore.days = 0;
      timerStore.isRunning = countdown.isRunning;

      lArgs.milliseconds = timerStore.milliseconds;
      lArgs.seconds = timerStore.seconds;
      lArgs.minutes = timerStore.minutes;
      lArgs.hours = timerStore.hours;
      lArgs.days = timerStore.days;
      lArgs.isRunning = timerStore.isRunning;

      if (resetListeners.length === 1) {
        resetListeners[0](lArgs);
      }

      if (resetListeners.length > 1) {
        for (let i = 0; i < resetListeners.length; i++) {
          resetListeners[i](lArgs);
        }
      }
    });

    countdown.onUpdate(() => {
      timerStore.milliseconds = countdown.milliseconds;
      timerStore.seconds = calculateSeconds(countdown.milliseconds);
      timerStore.minutes = calculateMinutes(countdown.milliseconds);
      timerStore.hours = calculateHours(countdown.milliseconds);
      timerStore.days = calculateDays(countdown.milliseconds);

      lArgs.milliseconds = timerStore.milliseconds;
      lArgs.seconds = timerStore.seconds;
      lArgs.minutes = timerStore.minutes;
      lArgs.hours = timerStore.hours;
      lArgs.days = timerStore.days;

      if (updateListeners.length === 1) {
        updateListeners[0](lArgs);
      }

      if (updateListeners.length > 1) {
        for (let i = 0; i < updateListeners.length; i++) {
          updateListeners[i](lArgs);
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
        (endListeners as unknown) = null;
        (stopListeners as unknown) = null;
        (resetListeners as unknown) = null;
        (updateListeners as unknown) = null;
      }

      if (args.autoClearListersArgs) {
        (lArgs as unknown) = null;
      }

      if (args.autoClearStore) {
        (timerStore as unknown) = null;
      }
    });

    return timerStore;
  }) as UseTimerHook;

export const useTimer = useTimerSetup(
  Countdown,
  createMutable,
  onMount,
  onCleanup
);
