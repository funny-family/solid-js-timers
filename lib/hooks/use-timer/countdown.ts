import type { WindowClearInterval, WindowSetInterval } from '../../types';

type CountdownListerCallback = () => void;
type CountdownLister = (callback: CountdownListerCallback) => void;

export interface CountdownInterface {
  readonly milliseconds: number;
  readonly isRunning: boolean;
  readonly state: 'idel' | 'running' | 'stopped';
  readonly intervalID: number | null;
  readonly setMilliseconds: (
    milliseconds: CountdownInterface['milliseconds']
  ) => void;
  readonly start: () => void;
  readonly stop: () => void;
  readonly reset: () => void;
  readonly on: (
    type:
      | keyof Pick<CountdownInterface, 'start' | 'stop' | 'reset'>
      | 'end'
      | 'update',
    listener: VoidFunction
  ) => void;
  readonly clearInterval: () => void;
}

export type CountdownConstructor = {
  new (): Countdown;
};

export class Countdown implements CountdownInterface {
  milliseconds: CountdownInterface['milliseconds'] = 0;
  state: CountdownInterface['state'] = 'idel';
  isRunning: CountdownInterface['isRunning'] = false;
  intervalID: CountdownInterface['intervalID'] = null;

  setMilliseconds: CountdownInterface['setMilliseconds'] = (milliseconds) => {
    this.milliseconds = milliseconds;
    this.#offsetTime = this.milliseconds + Date.now();
  };

  start: CountdownInterface['start'] = () => {
    if (this.state === 'running' || this.milliseconds <= 0) {
      return;
    }

    this.state = 'running';
    this.isRunning = true;
    this.#offsetTime = this.milliseconds + Date.now();

    if (this.intervalID == null) {
      this.intervalID = (setInterval as WindowSetInterval)(this.#update, 90);
    }

    if (this.#onStartListener != null) {
      this.#onStartListener();
    }
  };

  stop: CountdownInterface['stop'] = () => {
    if (this.isRunning === false) {
      return;
    }

    this.clearInterval();
    this.state = 'stopped';
    this.isRunning = false;

    if (this.#onStopListener != null) {
      this.#onStopListener();
    }
  };

  reset: CountdownInterface['reset'] = () => {
    if (this.milliseconds <= 0) {
      return;
    }

    this.clearInterval();
    this.milliseconds = 0;
    this.state = 'idel';
    this.isRunning = false;

    if (this.#onResetListener != null) {
      this.#onResetListener();
    }
  };

  on: CountdownInterface['on'] = (type, listener) => {
    if (type === 'start') {
      this.#onStartListener = listener;

      return;
    }

    if (type === 'end') {
      this.#onEndListener = listener;

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

  clearInterval: CountdownInterface['clearInterval'] = () => {
    if (this.intervalID != null) {
      (clearInterval as WindowClearInterval)(this.intervalID as number);
      this.intervalID = null;
    }
  };

  #offsetTime: number = 0;
  #onStartListener: CountdownListerCallback | null = null;
  #onEndListener: CountdownListerCallback | null = null;
  #onStopListener: CountdownListerCallback | null = null;
  #onResetListener: CountdownListerCallback | null = null;
  #onUpdateListener: CountdownListerCallback | null = null;

  #update = () => {
    this.milliseconds = this.#offsetTime - Date.now();

    if (this.milliseconds <= 0) {
      this.clearInterval();
      this.milliseconds = 0;
      this.state = 'idel';
      this.isRunning = false;

      if (this.#onEndListener != null) {
        this.#onEndListener();
      }

      return;
    }

    if (this.#onUpdateListener != null) {
      this.#onUpdateListener();
    }
  };
}
