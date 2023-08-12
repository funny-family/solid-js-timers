import type { WindowClearInterval, WindowSetInterval } from '../../types';

type CountdownListerCallback = () => void;
type CountdownLister = (callback: CountdownListerCallback) => void;

export interface CountdownInterface {
  milliseconds: number;
  isRunning: boolean;
  state: 'idel' | 'running' | 'stopped';
  intervalID: number | null;
  start: () => void;
  resume: () => void;
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
  }

  milliseconds: CountdownInterface['milliseconds'] = 0;
  state: CountdownInterface['state'] = 'idel';
  isRunning: CountdownInterface['isRunning'] = false;
  intervalID: CountdownInterface['intervalID'] = null;

  start: CountdownInterface['start'] = () => {
    if (this.state === 'running' || this.milliseconds <= 0) {
      return;
    }

    this.state = 'running';
    this.isRunning = true;
    this.#startTime = this.milliseconds + Date.now();

    if (this.intervalID == null) {
      this.intervalID = (setInterval as WindowSetInterval)(this.#update, 100);
    }

    if (this.#onStartCallback != null) {
      this.#onStartCallback();
    }

    console.log('start:', this);
  };

  resume: CountdownInterface['resume'] = () => {
    if (this.isRunning === false) {
      return;
    }

    this.state = 'running';
    this.isRunning = true;

    if (this.intervalID == null) {
      this.intervalID = (setInterval as WindowSetInterval)(this.#update, 1000);
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

    console.log('stop:', this);
  };

  reset: CountdownInterface['reset'] = () => {
    // if (this.state === 'idel') {
    //   return;
    // }

    this.clearInterval();
    this.milliseconds = this.#initialMilliseconds;
    this.state = 'idel';
    this.isRunning = false;
    // this.#startTime = this.#initialMilliseconds + Date.now();

    if (this.#onResetCallback != null) {
      this.#onResetCallback();
    }

    console.log('reset:', this);
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

  #startTime: number = 0;
  #initialMilliseconds: number = 0;
  #onStartCallback: Parameters<CountdownInterface['onStart']>[0] | null = null;
  #onEndCallback: Parameters<CountdownInterface['onEnd']>[0] | null = null;
  #onStopCallback: Parameters<CountdownInterface['onStop']>[0] | null = null;
  #onResetCallback: Parameters<CountdownInterface['onReset']>[0] | null = null;
  #onUpdateCallback: Parameters<CountdownInterface['onUpdate']>[0] | null =
    null;

  #update = () => {
    this.milliseconds = this.#startTime - Date.now();
    console.log('this.milliseconds:', this.milliseconds, this);

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
