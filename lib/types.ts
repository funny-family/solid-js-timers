import type { onCleanup, onMount } from 'solid-js';
import type { createMutable, createStore } from 'solid-js/store';

export type CreateStore = typeof createStore;
export type CreateMutable = typeof createMutable;
export type OnMount = typeof onMount;
export type OnCleanup = typeof onCleanup;

export type WindowSetInterval = typeof window.setInterval;
export type WindowClearInterval = typeof window.clearInterval;

export type Startable = {
  start: () => void;
};
export type Stopable = {
  stop: () => void;
};
export type Resetable = {
  reset: () => void;
};

export type StartListener = {
  onStart: (callback: () => void) => void;
};
export type StopListener = {
  onStop: (callback: () => void) => void;
};
export type ResetListener = {
  onReset: (callback: () => void) => void;
};
export type UpdateListener = {
  onUpdate: (callback: () => void) => void;
};

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type Listener<T extends any> = (
  callback: (args: Readonly<T>) => void
) => void;

/**
 * @description
 * Start timer on mount.
 */
export type AutoStartable = {
  autostart: boolean;
};

/**
 * @description
 * Clear hook interval on cleanup.
 */
export type AutoClearableInterval = {
  autoClearInterval: boolean;
};

/**
 * @description
 * Clear timer on cleanup.
 */
export type AutoClearableTimer = {
  autoClearTimer: boolean;
};

/**
 * @description
 * Clear listeners on cleanup.
 */
export type AutoClearableListeners = {
  autoClearListeners: boolean;
};

/**
 * @description
 * Clear arguments of listeners on cleanup.
 */
export type AutoClearableListersArgs = {
  autoClearListersArgs: boolean;
};

/**
 * @description
 * Clear store inside hook on cleanup.
 */
export type AutoClearableStore = {
  autoClearStore: boolean;
};

export type Writable<T> = { -readonly [P in keyof T]: T[P] };

export type TimerCallBackListener = () => void;
export type TimerListener = (callback: TimerCallBackListener) => void;
