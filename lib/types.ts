import type { batch, onCleanup, onMount } from 'solid-js';
import type { createMutable, createStore } from 'solid-js/store';

export type CreateStore = typeof createStore;
export type CreateMutable = typeof createMutable;
export type OnMount = typeof onMount;
export type OnCleanup = typeof onCleanup;
export type Batch = typeof batch;

export type WindowSetInterval = typeof window.setInterval;
export type WindowClearInterval = typeof window.clearInterval;

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type Writable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * @description
 * Clear timer's interval on cleanup method.
 */
export type AutoClearableInterval = {
  autoClearInterval: boolean;
};

/**
 * @description
 * Clear timer on cleanup method.
 */
export type AutoClearableTimer = {
  autoClearTimer: boolean;
};

/**
 * @description
 * Clear timer's listeners on cleanup method.
 */
export type AutoClearableListeners = {
  autoClearListeners: boolean;
};

/**
 * @description
 * Clear arguments of timer's listeners on cleanup method.
 */
export type AutoClearableListersArgs = {
  autoClearListersArgs: boolean;
};

/**
 * @description
 * Clear timer store on cleanup method.
 */
export type AutoClearableStore = {
  autoClearStore: boolean;
};
