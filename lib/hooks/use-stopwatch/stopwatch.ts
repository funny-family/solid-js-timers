import type { WindowClearInterval, WindowSetInterval } from '../../types';

type StopwatchListenerCallback = () => void;
type StopwatchListener = (callback: StopwatchListenerCallback) => void;

export interface StopwatchInterface {
  milliseconds: number;
  readonly isRunning: boolean;
  updateFrequency: number;
  readonly start: () => void;
  readonly stop: () => void;
  readonly reset: () => void;
  readonly clearInterval: () => void;
  readonly onStart: StopwatchListener;
  readonly onStop: StopwatchListener;
  readonly onReset: StopwatchListener;
  readonly onUpdate: StopwatchListener;
}

export type StopwatchConstructor = {
  new (): StopwatchInterface;
};

export class Stopwatch implements StopwatchInterface {
  milliseconds: StopwatchInterface['milliseconds'] = 0;
  isRunning: StopwatchInterface['isRunning'] = false;
  updateFrequency: StopwatchInterface['updateFrequency'] = 1;

  start: StopwatchInterface['start'] = () => {
    if (this.#state === 'running') {
      return;
    }

    this.#state = 'running';
    this.isRunning = true;

    if (this.#intervalID == null) {
      this.#offset = Date.now();
      this.#intervalID = (setInterval as WindowSetInterval)(
        this.#update,
        this.updateFrequency
      );
    }

    if (this.#onStartCallback != null) {
      this.#onStartCallback();
    }
  };

  stop: StopwatchInterface['stop'] = () => {
    if (this.isRunning === false) {
      return;
    }

    this.clearInterval();
    this.#state = 'stopped';
    this.isRunning = false;

    if (this.#onStopCallback != null) {
      this.#onStopCallback();
    }
  };

  reset: StopwatchInterface['reset'] = () => {
    if (this.#state === 'idel' && this.milliseconds <= 0) {
      return;
    }

    this.clearInterval();
    this.#state = 'idel';
    this.isRunning = false;
    this.milliseconds = 0;

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
    this.milliseconds += this.#delta;

    if (this.#onUpdateCallback != null) {
      this.#onUpdateCallback();
    }
  };
}
