import { onCleanup, batch, createSignal } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { type CurrentDateConstructor, CurrentDate } from './current-date';
import { type GetAMPM, getAMPM } from './use-time.utils';
import type {
  UseTimeHook,
  UseTimeHookArgs,
  UseTimeHookHookListenerArgs,
  UseTimeHookListenerCallback,
  UseTimeHookReturnValue,
} from './use-time.types';
import type {
  OnCleanup,
  CreateMutable,
  Writable,
  OnMount,
  Batch,
} from '../../types';

export const useTimeSetup = (
  CurrentDate: CurrentDateConstructor,
  getAMPM: GetAMPM,
  createMutable: CreateMutable,
  batch: Batch,
  onCleanup: OnCleanup
) =>
  ((args: Required<UseTimeHookArgs> = {} as any) => {
    (args as unknown) = {};
    args.autoClearInterval ||= true;
    args.autoClearTimer ||= true;
    args.autoClearListeners ||= true;
    args.autoClearListersArgs ||= true;
    args.autoClearStore ||= true;

    let startListeners = Array<UseTimeHookListenerCallback>();
    let stopListeners = Array<UseTimeHookListenerCallback>();
    let updateListeners = Array<UseTimeHookListenerCallback>();

    let currentDate = new CurrentDate();
    let currDate = null as unknown as () => Date;
    const currentDateSignal = createSignal(currentDate.date, {
      equals: false,
    });
    let timeStore = createMutable<UseTimeHookReturnValue>({
      get currentDate() {
        return currDate();
      },
      ampm: getAMPM(currentDate.date),
      isRunning: currentDate.isRunning,
      start: currentDate.start,
      stop: currentDate.stop,
      onStart: (callback) => {
        startListeners.push(callback);
      },
      onStop: (callback) => {
        stopListeners.push(callback);
      },
      onUpdate: (callback) => {
        updateListeners.push(callback);
      },
    });
    currDate = () => currentDateSignal[0]();

    let startListenerArgs: Writable<UseTimeHookHookListenerArgs> = {
      currentDate: null as unknown as Date,
      ampm: 'AM',
      isRunning: false,
    };

    let stopListenerArgs: Writable<UseTimeHookHookListenerArgs> = {
      currentDate: null as unknown as Date,
      ampm: 'AM',
      isRunning: false,
    };

    let updateListenerArgs: Writable<UseTimeHookHookListenerArgs> = {
      currentDate: null as unknown as Date,
      ampm: 'AM',
      isRunning: false,
    };

    currentDate.onStart(() => {
      batch(() => {
        currentDateSignal[1](currentDate.date);
        timeStore.ampm = getAMPM(currentDate.date);
        timeStore.isRunning = currentDate.isRunning;
      });

      startListenerArgs.currentDate = timeStore.currentDate;
      startListenerArgs.ampm = timeStore.ampm;
      startListenerArgs.isRunning = timeStore.isRunning;

      if (startListeners.length === 1) {
        startListeners[0](startListenerArgs);
      }

      if (startListeners.length > 1) {
        for (let i = 0; i < startListeners.length; i++) {
          startListeners[i](startListenerArgs);
        }
      }
    });

    currentDate.onStop(() => {
      batch(() => {
        currentDateSignal[1](currentDate.date);
        timeStore.ampm = getAMPM(currentDate.date);
        timeStore.isRunning = currentDate.isRunning;
      });

      stopListenerArgs.currentDate = timeStore.currentDate;
      stopListenerArgs.ampm = timeStore.ampm;
      stopListenerArgs.isRunning = timeStore.isRunning;

      if (stopListeners.length === 1) {
        stopListeners[0](stopListenerArgs);
      }

      if (stopListeners.length > 1) {
        for (let i = 0; i < stopListeners.length; i++) {
          stopListeners[i](stopListenerArgs);
        }
      }
    });

    currentDate.onUpdate(() => {
      batch(() => {
        currentDateSignal[1](currentDate.date);
        timeStore.ampm = getAMPM(currentDate.date);
      });

      updateListenerArgs.currentDate = timeStore.currentDate;
      updateListenerArgs.ampm = timeStore.ampm;
      updateListenerArgs.isRunning = timeStore.isRunning;

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
        currentDate.clearInterval();
      }

      if (args.autoClearTimer) {
        (CurrentDate as unknown) = null;
      }

      if (args.autoClearListeners) {
        (startListeners as unknown) = null;
        (stopListeners as unknown) = null;
        (updateListeners as unknown) = null;
      }

      if (args.autoClearListersArgs) {
        (startListenerArgs as unknown) = null;
        (stopListenerArgs as unknown) = null;
        (updateListenerArgs as unknown) = null;
      }

      if (args.autoClearStore) {
        (timeStore as unknown) = null;
      }
    });

    console.log({ timeStore, currentDate });

    return timeStore;
  }) as UseTimeHook;

export const useTime = useTimeSetup(
  CurrentDate,
  getAMPM,
  createMutable,
  batch,
  onCleanup
);
