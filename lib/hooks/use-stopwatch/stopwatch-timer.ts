import type { WindowClearInterval, WindowSetInterval } from '../../types';

type StopwatchTimerListener = (callback: () => void) => void;

export interface StopwatchTimerInterface {
  value: number;
  intervalID: number | null;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  onStart: StopwatchTimerListener;
  onStop: StopwatchTimerListener;
  onReset: StopwatchTimerListener;
  onUpdate: StopwatchTimerListener;
}

export type StopwatchTimerConstructor = {
  new (delay?: number): StopwatchTimer;
};

export class StopwatchTimer implements StopwatchTimerInterface {
  constructor(delay?: number) {
    this.#delay = delay || 1;
  }

  value: StopwatchTimerInterface['value'] = 1;
  isRunning: StopwatchTimerInterface['isRunning'] = false;

  get intervalID(): StopwatchTimerInterface['intervalID'] {
    return this.#intervalID;
  }

  start: StopwatchTimerInterface['start'] = () => {
    if (this.#state === 'running') {
      return;
    }
    this.#state = 'running';
    this.isRunning = true;

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
    if (this.isRunning === false) {
      return;
    }
    this.#state = 'stopped';
    this.isRunning = false;

    if (this.#onStopCallBack != null) {
      this.#onStopCallBack();
    }

    this.#clearTimerInterval();
  };

  reset: StopwatchTimerInterface['reset'] = () => {
    if (this.#state === 'idel') {
      return;
    }
    this.#state = 'idel';
    this.isRunning = false;

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

  #delay: number = 0;
  #offset: number = 0;
  #intervalID: number | null = null;
  #state: 'idel' | 'running' | 'stopped' = 'idel';
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

// window.StopwatchTimer = StopwatchTimer
