import type { WindowClearInterval, WindowSetInterval } from '../../types';

type CountdownListerCallback = () => void;
type CountdownLister = (callback: CountdownListerCallback) => void;

export interface CountdownInterface {
  milliseconds: number;
  isRunning: boolean;
  state: 'idel' | 'running' | 'stopped';
  intervalID: number | null;
  start: () => void;
  stop: () => void;
  reset: () => void;
  clearInterval: () => void;
  onStart: CountdownLister;
  onEnd: CountdownLister;
  onStop: CountdownLister;
  onReset: CountdownLister;
  onUpdate: CountdownLister;
}

export type CountdownConstructor = {
  new (initialMilliseconds: number): Countdown;
};

export class Countdown implements CountdownInterface {
  constructor(initialMilliseconds: number) {
    this.milliseconds = initialMilliseconds;
    this.#initialMilliseconds = initialMilliseconds;
    this.#startTime = initialMilliseconds + this.#getCurrentMilliseconds();
  }

  milliseconds: CountdownInterface['milliseconds'] = 0;
  isRunning: CountdownInterface['isRunning'] = false;
  state: CountdownInterface['state'] = 'idel';
  intervalID: CountdownInterface['intervalID'] = null;

  start: CountdownInterface['start'] = () => {
    if (this.state === 'running') {
      return;
    }

    this.state = 'running';
    this.isRunning = true;
    this.#startTime =
      this.#initialMilliseconds + this.#getCurrentMilliseconds();

    if (this.#onStartCallback != null) {
      this.#onStartCallback();
    }

    if (this.intervalID == null) {
      this.intervalID = (setInterval as WindowSetInterval)(this.#update, 100);
    }
  };

  stop: CountdownInterface['stop'] = () => {
    if (this.isRunning === false) {
      return;
    }

    this.state = 'stopped';
    this.isRunning = false;
    this.clearInterval();

    if (this.#onStopCallback != null) {
      this.#onStopCallback();
    }
  };

  reset: CountdownInterface['reset'] = () => {
    if (this.state === 'idel' && this.milliseconds >= 0) {
      return;
    }

    this.milliseconds = this.#initialMilliseconds;
    this.state = 'idel';
    this.isRunning = false;
    this.#startTime =
      this.#initialMilliseconds + this.#getCurrentMilliseconds();
    this.clearInterval();

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

  #initialMilliseconds: number = 0;
  #startTime: number = 0;
  #onStartCallback: Parameters<CountdownInterface['onStart']>[0] | null = null;
  #onEndCallback: Parameters<CountdownInterface['onEnd']>[0] | null = null;
  #onStopCallback: Parameters<CountdownInterface['onStop']>[0] | null = null;
  #onResetCallback: Parameters<CountdownInterface['onReset']>[0] | null = null;
  #onUpdateCallback: Parameters<CountdownInterface['onUpdate']>[0] | null =
    null;

  #update = () => {
    if (this.milliseconds <= 0) {
      // if (this.milliseconds < 1000) {
      this.milliseconds = 0;
      this.state = 'idel';
      this.isRunning = false;
      this.clearInterval();

      if (this.#onEndCallback != null) {
        this.#onEndCallback();
      }

      return;
    }

    // /* ---- hacky hacky stuff ---- */
    // this.milliseconds = 0;
    // /* ---- hacky hacky stuff ---- */
    this.milliseconds = this.#startTime - this.#getCurrentMilliseconds();
    console.log('this.milliseconds:', this.milliseconds);

    if (this.#onUpdateCallback != null) {
      this.#onUpdateCallback();
    }
  };

  #getCurrentMilliseconds: () => number = () =>
    performance.timeOrigin + performance.now();
}
