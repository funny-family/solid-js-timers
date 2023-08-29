import type { WindowClearInterval, WindowSetInterval } from '../../types';

export interface StopwatchInterface {
  milliseconds: number;
  readonly isRunning: boolean;
  readonly start: VoidFunction;
  readonly stop: VoidFunction;
  readonly reset: VoidFunction;
  readonly on: (
    type: keyof Pick<StopwatchInterface, 'start' | 'stop' | 'reset'> | 'update',
    listener: VoidFunction
  ) => void;
  readonly clearInterval: VoidFunction;
}

export type StopwatchConstructor = {
  new (): StopwatchInterface;
};

export class Stopwatch implements StopwatchInterface {
  milliseconds: StopwatchInterface['milliseconds'] = 0;
  isRunning: StopwatchInterface['isRunning'] = false;

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
        90
      );
    }

    if (this.#onStartListener != null) {
      this.#onStartListener();
    }
  };

  stop: StopwatchInterface['stop'] = () => {
    if (this.isRunning === false) {
      return;
    }

    this.clearInterval();
    this.#state = 'stopped';
    this.isRunning = false;

    if (this.#onStopListener != null) {
      this.#onStopListener();
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

    if (this.#onResetListener != null) {
      this.#onResetListener();
    }
  };

  on: StopwatchInterface['on'] = (type, listener) => {
    if (type === 'start') {
      this.#onStartListener = listener;

      return;
    }

    if (type === 'stop') {
      this.#onStopListener = listener;

      return;
    }

    if (type === 'reset') {
      this.#onResetListener = listener;

      return;
    }

    if (type === 'update') {
      this.#onUpdateListener = listener;

      return;
    }
  };

  clearInterval: StopwatchInterface['clearInterval'] = () => {
    if (this.#intervalID != null) {
      (clearInterval as WindowClearInterval)(this.#intervalID as number);
      this.#intervalID = null;
    }
  };

  #offset: number = 0;
  #intervalID: number | null = null;
  #state: 'idel' | 'running' | 'stopped' = 'idel';
  #onStartListener: VoidFunction | null = null;
  #onStopListener: VoidFunction | null = null;
  #onResetListener: VoidFunction | null = null;
  #onUpdateListener: VoidFunction | null = null;

  get #delta(): number {
    const now = Date.now();
    const newDelta = now - this.#offset;
    this.#offset = now;

    return newDelta;
  }

  #update: VoidFunction = () => {
    this.milliseconds += this.#delta;

    if (this.#onUpdateListener != null) {
      this.#onUpdateListener();
    }
  };
}
