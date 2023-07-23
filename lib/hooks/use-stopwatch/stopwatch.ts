import type { WindowClearInterval, WindowSetInterval } from '../../types';

type StopwatchListener = (callback: () => void) => void;

export interface StopwatchInterface {
  value: number;
  intervalID: number | null;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
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

  get intervalID(): StopwatchInterface['intervalID'] {
    return this.#intervalID;
  }

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
    this.#clearInterval();

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
    this.#clearInterval();

    if (this.#onResetCallback != null) {
      this.#onResetCallback();
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
  #onStartCallback: Parameters<StopwatchInterface['onStart']>[0] | null = null;
  #onStopCallback: Parameters<StopwatchInterface['onStop']>[0] | null = null;
  #onResetCallback: Parameters<StopwatchInterface['onReset']>[0] | null = null;
  #onUpdateCallback: Parameters<StopwatchInterface['onUpdate']>[0] | null =
    null;

  get #delta() {
    const now = Date.now();
    const newDelta = now - this.#offset;
    this.#offset = now;

    return newDelta;
  }

  #update = () => {
    this.value += this.#delta;

    if (this.#onUpdateCallback != null) {
      this.#onUpdateCallback();
    }
  };

  #clearInterval = () => {
    if (this.#intervalID != null) {
      (clearInterval as WindowClearInterval)(this.#intervalID as number);
      this.#intervalID = null;
    }
  };
}
