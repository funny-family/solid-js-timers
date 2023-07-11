import type { onCleanup, onMount } from 'solid-js';
import type { createMutable, createStore } from 'solid-js/store';

export type CreateStore = typeof createStore;
export type CreateMutable = typeof createMutable;
export type OnMountFunction = typeof onMount;
export type OnCleanupFunction = typeof onCleanup;

export type WindowSetInterval = typeof window.setInterval;
export type WindowClearInterval = typeof window.clearInterval;
