import type { onCleanup, onMount } from 'solid-js';
import type { createMutable, createStore } from 'solid-js/store';

export type CreateStore = typeof createStore;
export type CreateMutable = typeof createMutable;
export type OnMountFunction = typeof onMount;
export type OnCleanupFunction = typeof onCleanup;

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

export type AutoStartable = {
  autostart: boolean;
};

export type AutoClearableListeners = {
  autoClearListeners: boolean;
};

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
