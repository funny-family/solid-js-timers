import type { WindowClearInterval, WindowSetInterval } from '../../types';

type StopwatchListenerCallback = () => void;
type StopwatchListener = (callback: StopwatchListenerCallback) => void;

export interface StopwatchInterface {
  value: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  clearInterval: () => void;
  onStart: StopwatchListener;
  onStop: StopwatchListener;
  onReset: StopwatchListener;
  onUpdate: StopwatchListener;
}

export type StopwatchConstructor = {
  new (initialMilliseconds?: number, delay?: number): StopwatchTimer;
};

export class StopwatchTimer implements StopwatchInterface {
  constructor(initialMilliseconds?: number, delay?: number) {
    this.value = initialMilliseconds || 0;
    this.#delay = delay || 1;
  }

  value: StopwatchInterface['value'] = 1;
  isRunning: StopwatchInterface['isRunning'] = false;

  start: StopwatchInterface['start'] = () => {
    if (this.#state === 'running') {
      return;
    }

    this.#state = 'running';
    this.isRunning = true;

    if (this.#onStartCallback != null) {
      this.#onStartCallback();
    }

    if (this.#intervalID == null) {
      this.#offset = Date.now();
      this.#intervalID = (setInterval as WindowSetInterval)(
        this.#update,
        this.#delay
      );
    }
  };

  stop: StopwatchInterface['stop'] = () => {
    if (this.isRunning === false) {
      return;
    }

    this.#state = 'stopped';
    this.isRunning = false;
    this.clearInterval();

    if (this.#onStopCallback != null) {
      this.#onStopCallback();
    }
  };

  reset: StopwatchInterface['reset'] = () => {
    if (this.#state === 'idel' && this.value === 0) {
      return;
    }

    this.#state = 'idel';
    this.isRunning = false;
    this.value = 0;
    this.clearInterval();

    if (this.#onResetCallback != null) {
      this.#onResetCallback();
    }
  };

  clearInterval: StopwatchInterface['clearInterval'] = () => {
    if (this.#intervalID != null) {
      (clearInterval as WindowClearInterval)(this.#intervalID as number);
      this.#intervalID = null;
    }
  };

  onStart: StopwatchInterface['onStart'] = (callback) => {
    this.#onStartCallback = callback;
  };

  onStop: StopwatchInterface['onStop'] = (callback) => {
    this.#onStopCallback = callback;
  };

  onReset: StopwatchInterface['onReset'] = (callback) => {
    this.#onResetCallback = callback;
  };

  onUpdate: StopwatchInterface['onUpdate'] = (callback) => {
    this.#onUpdateCallback = callback;
  };

  #delay: number = 0;
  #offset: number = 0;
  #intervalID: number | null = null;
  #state: 'idel' | 'running' | 'stopped' = 'idel';
  #onStartCallback: StopwatchListenerCallback | null = null;
  #onStopCallback: StopwatchListenerCallback | null = null;
  #onResetCallback: StopwatchListenerCallback | null = null;
  #onUpdateCallback: StopwatchListenerCallback | null = null;

  get #delta(): number {
    const now = Date.now();
    const newDelta = now - this.#offset;
    this.#offset = now;

    return newDelta;
  }

  #update: () => void = () => {
    this.value += this.#delta;

    if (this.#onUpdateCallback != null) {
      this.#onUpdateCallback();
    }
  };
}
