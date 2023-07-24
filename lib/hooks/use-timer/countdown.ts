import type { WindowClearInterval, WindowSetInterval } from '../../types';

type CountdownLister = (callback: () => void) => void;

export interface CountdownInterface {
  value: number;
  intervalID: number | null;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  onStart: CountdownLister;
  onEnd: CountdownLister;
  onStop: CountdownLister;
  onReset: CountdownLister;
  onUpdate: CountdownLister;
}

export type CountdownConstructor = {
  new (milliseconds: number): Countdown;
};

export class Countdown implements CountdownInterface {
  constructor(milliseconds: number) {
    this.#milliseconds = milliseconds;
  }

  value: CountdownInterface['value'] = 0;
  isRunning: CountdownInterface['isRunning'] = false;

  get intervalID(): CountdownInterface['intervalID'] {
    return this.#intervalID;
  }

  start: CountdownInterface['start'] = () => {
    if (this.#state === 'running') {
      return;
    }
    this.#state = 'running';
    this.isRunning = true;

    if (this.#onStartCallback != null) {
      this.#onStartCallback();
    }

    if (this.#intervalID == null) {
      this.#intervalID = (setInterval as WindowSetInterval)(this.#update, 1000);
    }
  };

  stop: CountdownInterface['stop'] = () => {
    if (this.isRunning === false) {
      return;
    }
    this.#state = 'stopped';
    this.isRunning = false;

    if (this.#onStopCallback != null) {
      this.#onStopCallback();
    }

    this.#clearInterval();
  };

  reset: CountdownInterface['reset'] = () => {
    if (this.#state === 'idel') {
      return;
    }
    this.#state = 'idel';
    this.isRunning = false;

    if (this.#onResetCallback != null) {
      this.#onResetCallback();
    }

    this.#clearInterval();

    this.value = 0;
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

  #intervalID: number | null = null;
  #state: 'idel' | 'running' | 'stopped' = 'idel';
  #milliseconds: number = 0;
  #onStartCallback: Parameters<CountdownInterface['onStart']>[0] | null = null;
  #onEndCallback: Parameters<CountdownInterface['onEnd']>[0] | null = null;
  #onStopCallback: Parameters<CountdownInterface['onStop']>[0] | null = null;
  #onResetCallback: Parameters<CountdownInterface['onReset']>[0] | null = null;
  #onUpdateCallback: Parameters<CountdownInterface['onUpdate']>[0] | null =
    null;

  #update = () => {
    if (this.value < 0) {
      this.#clearInterval();
      this.value = 0;

      if (this.#onEndCallback != null && this.#state === 'running') {
        this.#onEndCallback();
      }

      this.#state = 'idel';

      return;
    }

    this.value = this.#milliseconds - Date.now();

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

/*
  TODO: add usage of https://github.com/mckamey/countdownjs/tree/master to support more
*/
