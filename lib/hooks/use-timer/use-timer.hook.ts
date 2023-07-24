import { onCleanup, onMount } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { Countdown, CountdownConstructor } from './countdown';
import type {
  AutoClearableListeners,
  CreateMutable,
  OnCleanupFunction,
  OnMountFunction,
  AutoStartable,
  AutoClearableInterval,
  Writeable,
} from '../../types';

type UseTimerHookArgs = { milliseconds: number } & Partial<AutoStartable> &
  Partial<AutoClearableListeners> &
  Partial<AutoClearableInterval>;

type UseTimerHookCallbackArgs = Readonly<
  Pick<
    UseTimerHookReturnValue,
    | 'seconds'
    | 'minutes'
    | 'hours'
    | 'days'
    | 'weeks'
    | 'month'
    | 'value'
    | 'isRunning'
  >
>;

type UseTimerHookListenerCallback = (args: UseTimerHookCallbackArgs) => void;

type UseTimerHookListener = (callback: UseTimerHookListenerCallback) => void;

type UseTimerHookReturnValue = {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  weeks: string;
  month: string;
  years: string;
  value: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  isRunning: boolean;
  onStart: UseTimerHookListener;
  onEnd: UseTimerHookListener;
  onStop: UseTimerHookListener;
  onReset: UseTimerHookListener;
  onUpdate: UseTimerHookListener;
};
type UseTimerHook = (args: UseTimerHookArgs) => UseTimerHookReturnValue;

export const useTimer = (
  (
    Countdown: CountdownConstructor,
    createMutable: CreateMutable,
    onMount: OnMountFunction,
    onCleanup: OnCleanupFunction
  ) =>
  (args: Required<UseTimerHookArgs>) => {
    if (args.autostart == null) {
      args.autostart = true;
    }

    if (args.autoClearListeners == null) {
      args.autoClearListeners = true;
    }

    let startListeners = Array<UseTimerHookListenerCallback>();
    let stopListeners = Array<UseTimerHookListenerCallback>();
    let resetListeners = Array<UseTimerHookListenerCallback>();
    let endListeners = Array<UseTimerHookListenerCallback>();
    let updateListeners = Array<UseTimerHookListenerCallback>();

    const countdown = new Countdown(args.milliseconds);
    const timerStore = createMutable<UseTimerHookReturnValue>({
      seconds: '00',
      minutes: '00',
      hours: '00',
      days: '00',
      weeks: '00',
      month: '00',
      years: '00',
      value: 0,
      start: countdown.start,
      stop: countdown.stop,
      reset: countdown.reset,
      isRunning: false,
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

    const listenerArgs: Writeable<UseTimerHookCallbackArgs> = {
      seconds: timerStore.seconds,
      minutes: timerStore.minutes,
      hours: timerStore.hours,
      days: timerStore.days,
      weeks: timerStore.weeks,
      month: timerStore.month,
      value: timerStore.value,
      isRunning: timerStore.isRunning,
    };

    /* ----------------- register start listeners ----------------- */
    countdown.onStart(() => {
      timerStore.isRunning = countdown.isRunning;

      listenerArgs.seconds = timerStore.seconds;
      listenerArgs.minutes = timerStore.minutes;
      listenerArgs.hours = timerStore.hours;
      listenerArgs.days = timerStore.days;
      listenerArgs.weeks = timerStore.weeks;
      listenerArgs.month = timerStore.month;
      listenerArgs.value = timerStore.value;
      listenerArgs.isRunning = timerStore.isRunning;

      if (startListeners.length === 1) {
        startListeners[0](listenerArgs);
      }

      if (startListeners.length > 1) {
        for (let i = 0; i < startListeners.length; i++) {
          startListeners[i](listenerArgs);
        }
      }
    });
    /* ----------------- register start listeners ----------------- */

    /* ----------------- register end listeners ----------------- */
    countdown.onEnd(() => {
      timerStore.isRunning = countdown.isRunning;

      listenerArgs.seconds = timerStore.seconds;
      listenerArgs.minutes = timerStore.minutes;
      listenerArgs.hours = timerStore.hours;
      listenerArgs.days = timerStore.days;
      listenerArgs.weeks = timerStore.weeks;
      listenerArgs.month = timerStore.month;
      listenerArgs.value = timerStore.value;
      listenerArgs.isRunning = timerStore.isRunning;

      if (endListeners.length === 1) {
        endListeners[0](listenerArgs);
      }

      if (endListeners.length > 1) {
        for (let i = 0; i < endListeners.length; i++) {
          endListeners[i](listenerArgs);
        }
      }
    });
    /* ----------------- register end listeners ----------------- */

    /* ----------------- register stop listeners ----------------- */
    countdown.onStop(() => {
      timerStore.isRunning = countdown.isRunning;

      listenerArgs.seconds = timerStore.seconds;
      listenerArgs.minutes = timerStore.minutes;
      listenerArgs.hours = timerStore.hours;
      listenerArgs.days = timerStore.days;
      listenerArgs.weeks = timerStore.weeks;
      listenerArgs.month = timerStore.month;
      listenerArgs.value = timerStore.value;
      listenerArgs.isRunning = timerStore.isRunning;

      if (stopListeners.length === 1) {
        stopListeners[0](listenerArgs);
      }

      if (stopListeners.length > 1) {
        for (let i = 0; i < stopListeners.length; i++) {
          stopListeners[i](listenerArgs);
        }
      }
    });
    /* ----------------- register stop listeners ----------------- */

    /* ----------------- register reset listeners ----------------- */
    countdown.onReset(() => {
      console.log('reset');

      timerStore.seconds = '00';
      timerStore.minutes = '00';
      timerStore.hours = '00';
      timerStore.days = '00';
      timerStore.weeks = '00';
      timerStore.month = '00';
      timerStore.value = 0;
      timerStore.isRunning = countdown.isRunning;

      listenerArgs.seconds = timerStore.seconds;
      listenerArgs.minutes = timerStore.minutes;
      listenerArgs.hours = timerStore.hours;
      listenerArgs.days = timerStore.days;
      listenerArgs.weeks = timerStore.weeks;
      listenerArgs.month = timerStore.month;
      listenerArgs.value = timerStore.value;
      listenerArgs.isRunning = timerStore.isRunning;

      if (resetListeners.length === 1) {
        resetListeners[0](listenerArgs);
      }

      if (resetListeners.length > 1) {
        for (let i = 0; i < resetListeners.length; i++) {
          resetListeners[i](listenerArgs);
        }
      }
    });
    /* ----------------- register reset listeners ----------------- */

    /* ----------------- register update listeners ----------------- */
    countdown.onUpdate(() => {
      // timerStore.seconds = `${~~(
      //   (countdown.value % (1000 * 60)) /
      //   1000
      // )}`.padStart(2, '0');
      // timerStore.minutes = `${~~(
      //   (countdown.value % (1000 * 60 * 60)) /
      //   (1000 * 60)
      // )}`.padStart(2, '0');
      // timerStore.hours = `${~~(
      //   (countdown.value % (1000 * 60 * 60 * 24)) /
      //   (1000 * 60 * 60)
      // )}`.padStart(2, '0');
      // timerStore.days = `${~~(
      //   countdown.value /
      //   (1000 * 60 * 60 * 24)
      // )}`.padStart(2, '0');
      // timerStore.weeks = `${~~(
      //   countdown.value /
      //   (1000 * 60 * 60 * 24 * 7)
      // )}`.padStart(2, '0');
      // timerStore.month = '00';
      // timerStore.value = countdown.value;
      // timerStore.isRunning = countdown.isRunning;
      const value = Math.ceil(countdown.value / 1000);
      timerStore.seconds = `${value % 60}`.padStart(2, '0');
      timerStore.minutes = `${Math.floor(value / 60) % 60}`.padStart(2, '0');
      timerStore.hours = `${Math.floor(value / 60 / 60) % 24}`.padStart(2, '0');
      timerStore.days = `${Math.floor(value / 60 / 60 / 24) % 7}`.padStart(
        2,
        '0'
      );
      timerStore.weeks = `${Math.floor(value / 60 / 60 / 24) % 7}`.padStart(
        2,
        '0'
      );
      timerStore.month = `${Math.floor(
        value / 60 / 60 / 24 / 30.4368
      )}`.padStart(2, '0');
      timerStore.years = `${Math.abs(
        new Date(countdown.value).getFullYear() - new Date().getFullYear()
      )}`.padStart(2, '0');
      // timerStore.years = '00';
      timerStore.value = countdown.value;
      timerStore.isRunning = countdown.isRunning;

      listenerArgs.seconds = timerStore.seconds;
      listenerArgs.minutes = timerStore.minutes;
      listenerArgs.hours = timerStore.hours;
      listenerArgs.days = timerStore.days;
      listenerArgs.weeks = timerStore.weeks;
      listenerArgs.month = timerStore.month;
      listenerArgs.value = timerStore.value;
      listenerArgs.isRunning = timerStore.isRunning;

      if (updateListeners.length === 1) {
        updateListeners[0](listenerArgs);
      }

      if (updateListeners.length > 1) {
        for (let i = 0; i < updateListeners.length; i++) {
          updateListeners[i](listenerArgs);
        }
      }

      // console.log(1111, countdown);
    });
    /* ----------------- register update listeners ----------------- */

    onMount(() => {
      if (args.autostart) {
        countdown.start();
      }
    });

    onCleanup(() => {
      if (args.autoClearListeners) {
        startListeners = Array();
        stopListeners = Array();
        resetListeners = Array();
        endListeners = Array();
        updateListeners = Array();
      }

      if (args.autoClearInterval && countdown.intervalID != null) {
        clearInterval(countdown.intervalID);
      }
    });

    return timerStore;
  }
)(Countdown, createMutable, onMount, onCleanup) as UseTimerHook;
