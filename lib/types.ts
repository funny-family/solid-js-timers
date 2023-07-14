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