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
  readonly clearInterval: () => void;
  readonly start: () => void;
  readonly stop: () => void;
  readonly reset: () => void;
  readonly onStart: CountdownLister;
  readonly onEnd: CountdownLister;
  readonly onStop: CountdownLister;
  readonly onReset: CountdownLister;
  readonly onUpdate: CountdownLister;
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
      this.intervalID = (setInterval as WindowSetInterval)(this.#update, 100);
    }

    if (this.#onStartCallback != null) {
      this.#onStartCallback();
    }
  };

  stop: CountdownInterface['stop'] = () => {
    if (this.isRunning === false) {
      return;
    }

    this.clearInterval();
    this.state = 'stopped';
    this.isRunning = false;

    if (this.#onStopCallback != null) {
      this.#onStopCallback();
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

    if (this.#onResetCallback != null) {
      this.#onResetCallback();
    }
  };

  clearInterval: CountdownInterface['clearInterval'] = () => {
    if (this.intervalID != null) {
      (clearInterval as WindowClearInterval)(this.intervalID as number);
      this.intervalID = null;
    }
  };

  onStart: CountdownInterface['onStart'] = (callback) => {
    this.#onStartCallback = callback;
  };

  onEnd: CountdownInterface['onEnd'] = (callback) => {
    this.#onEndCallback = callback;
  };

  onStop: CountdownInterface['onStop'] = (callback) => {
    this.#onStopCallback = callback;
  };

  onReset: CountdownInterface['onReset'] = (callback) => {
    this.#onResetCallback = callback;
  };

  onUpdate: CountdownInterface['onUpdate'] = (callback) => {
    this.#onUpdateCallback = callback;
  };

  #offsetTime: number = 0;
  #onStartCallback: CountdownListerCallback | null = null;
  #onEndCallback: CountdownListerCallback | null = null;
  #onStopCallback: CountdownListerCallback | null = null;
  #onResetCallback: CountdownListerCallback | null = null;
  #onUpdateCallback: CountdownListerCallback | null = null;

  #update = () => {
    this.milliseconds = this.#offsetTime - Date.now();

    if (this.milliseconds <= 0) {
      this.clearInterval();
      this.milliseconds = 0;
      this.state = 'idel';
      this.isRunning = false;

      if (this.#onEndCallback != null) {
        this.#onEndCallback();
      }

      return;
    }

    if (this.#onUpdateCallback != null) {
      this.#onUpdateCallback();
    }
  };
}
