import type { WindowClearInterval, WindowSetInterval } from '../../types';

export interface StopwatchTimerInterface {
  value: number;
  intervalID: number | null;
  start: () => void;
  stop: () => void;
  reset: () => void;
  onStart: (callback: () => void) => void;
  onStop: (callback: () => void) => void;
  onReset: (callback: () => void) => void;
  onUpdate: (callback: () => void) => void;
}

export type StopwatchTimerConstructor = {
  new (delay?: number): StopwatchTimer;
};

export class StopwatchTimer implements StopwatchTimerInterface {
  value: StopwatchTimerInterface['value'] = 0;

  constructor(delay?: number) {
    this.#delay = delay || 1;
  }

  start: StopwatchTimerInterface['start'] = () => {
    if (this.#onStartCallBack != null) {
      this.#onStartCallBack();
    }

    if (this.#intervalID == null) {
      this.#offset = Date.now();
      this.#intervalID = (setInterval as WindowSetInterval)(() => {
        this.#update();

        if (this.#onUpdateCallBack != null) {
          this.#onUpdateCallBack();
        }
      }, this.#delay);
    }
  };

  stop: StopwatchTimerInterface['stop'] = () => {
    if (this.#onStopCallBack != null) {
      this.#onStopCallBack();
    }

    this.#clearTimerInterval();
  };

  reset: StopwatchTimerInterface['reset'] = () => {
    if (this.#onResetCallBack != null) {
      this.#onResetCallBack();
    }

    this.#clearTimerInterval();

    this.value = 0;
  };

  onStart: StopwatchTimerInterface['onStart'] = (callback) => {
    this.#onStartCallBack = callback;
  };

  onStop: StopwatchTimerInterface['onStop'] = (callback) => {
    this.#onStopCallBack = callback;
  };

  onReset: StopwatchTimerInterface['onReset'] = (callback) => {
    this.#onResetCallBack = callback;
  };

  onUpdate: StopwatchTimerInterface['onUpdate'] = (callback) => {
    this.#onUpdateCallBack = callback;
  };

  get intervalID(): StopwatchTimerInterface['intervalID'] {
    return this.#intervalID;
  }

  #delay: number = 0;
  #offset: number = 0;
  #intervalID: number | null = null;
  #onStartCallBack: Parameters<StopwatchTimerInterface['onStart']>[0] | null =
    null;
  #onStopCallBack: Parameters<StopwatchTimerInterface['onStop']>[0] | null =
    null;
  #onResetCallBack: Parameters<StopwatchTimerInterface['onReset']>[0] | null =
    null;
  #onUpdateCallBack: Parameters<StopwatchTimerInterface['onUpdate']>[0] | null =
    null;

  get #delta() {
    const now = Date.now();
    const newDelta = now - this.#offset;
    this.#offset = now;

    return newDelta;
  }

  #update = () => {
    this.value += this.#delta;
  };

  #clearTimerInterval = () => {
    if (this.#intervalID != null) {
      (clearInterval as WindowClearInterval)(this.#intervalID as number);
      this.#intervalID = null;
    }
  };
}
