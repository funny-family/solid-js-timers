import type { WindowClearInterval, WindowSetInterval } from '../../types';

export interface StopwatchTimerInterface {
  start: () => void;
  stop: () => void;
  reset: () => void;
  onUpdate: (callback: () => void) => void;
}

export class StopwatchTimer implements StopwatchTimerInterface {
  clock: number = 0;

  start: StopwatchTimerInterface['start'] = () => {
    if (this.#intervalID == null) {
      this.#offset = Date.now();
      this.#intervalID = (setInterval as WindowSetInterval)(() => {
        this.#update();

        if (this.#onUpdateCallBack != null) {
          this.#onUpdateCallBack();
        }
      }, 1);
    }
  };

  stop: StopwatchTimerInterface['stop'] = () => {
    this.#clearTimerInterval();
  };

  reset: StopwatchTimerInterface['reset'] = () => {
    this.#clearTimerInterval();

    this.clock = 0;
  };

  onUpdate: StopwatchTimerInterface['onUpdate'] = (callback) => {
    this.#onUpdateCallBack = callback;
  };

  get intervalID() {
    return this.#intervalID;
  }

  #offset: number = 0;
  #intervalID: number | null = null;
  #onUpdateCallBack: Parameters<StopwatchTimerInterface['onUpdate']>[0] | null =
    null;

  get #delta() {
    const now = Date.now();
    const newDelta = now - this.#offset;
    this.#offset = now;

    return newDelta;
  }

  #update = () => {
    this.clock += this.#delta;
  };

  #clearTimerInterval = () => {
    if (this.#intervalID != null) {
      (clearInterval as WindowClearInterval)(this.#intervalID as number);
      this.#intervalID = null;
    }
  };
}
