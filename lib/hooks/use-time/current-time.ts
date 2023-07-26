import type { WindowClearInterval, WindowSetInterval } from '../../types';

type CurrentTimeListenerCallback = () => void;
type CurrentTimeListener = (callback: CurrentTimeListenerCallback) => void;

export interface CurrentTimeInterface {
  isRunning: boolean;
  date: Date;
  start: () => void;
  stop: () => void;
  clearInterval: () => void;
  onStart: CurrentTimeListener;
  onStop: CurrentTimeListener;
  onUpdate: CurrentTimeListener;
}

type CurrentTimeConstructorArguments = {
  updateFrequency?: number;
};

export type CurrentTimeConstructor = {
  new (args?: CurrentTimeConstructorArguments): CurrentTimeInterface;
};

export class CurrentTime implements CurrentTimeInterface {
  constructor(args: CurrentTimeConstructorArguments = {}) {
    this.#updateFrequency = args.updateFrequency || 100;
  }

  isRunning: CurrentTimeInterface['isRunning'] = false;
  date: CurrentTimeInterface['date'] = new Date();

  start: CurrentTimeInterface['start'] = () => {
    if (this.#state === 'running') {
      return;
    }

    this.isRunning = true;
    this.#state = 'running';
    this.date.setTime(this.#getCurrentMilliseconds());

    if (this.#onStartCallback != null) {
      this.#onStartCallback();
    }

    if (this.#intervalID == null) {
      this.#intervalID = (setInterval as WindowSetInterval)(
        this.#update,
        this.#updateFrequency
      );
    }
  };

  stop: CurrentTimeInterface['start'] = () => {
    if (this.#state === 'stopped') {
      return;
    }

    this.isRunning = false;
    this.#state = 'stopped';
    this.clearInterval();

    if (this.#onStopCallback != null) {
      this.#onStopCallback();
    }
  };

  clearInterval: CurrentTimeInterface['clearInterval'] = () => {
    if (this.#intervalID != null) {
      (clearInterval as WindowClearInterval)(this.#intervalID as number);
      this.#intervalID = null;
    }
  };

  onStart: CurrentTimeInterface['onStart'] = (callback) => {
    this.#onStartCallback = callback;
  };

  onStop: CurrentTimeInterface['onStop'] = (callback) => {
    this.#onStopCallback = callback;
  };

  onUpdate: CurrentTimeInterface['onUpdate'] = (callback) => {
    this.#onUpdateCallback = callback;
  };

  #updateFrequency: number = 0;
  #state: 'idel' | 'running' | 'stopped' = 'idel';
  #intervalID: null | number = null;
  #onStartCallback: CurrentTimeListenerCallback | null = null;
  #onStopCallback: CurrentTimeListenerCallback | null = null;
  #onUpdateCallback: CurrentTimeListenerCallback | null = null;

  #update: () => void = () => {
    this.date.setTime(this.#getCurrentMilliseconds());

    if (this.#onUpdateCallback != null) {
      this.#onUpdateCallback();
    }
  };

  #getCurrentMilliseconds: () => number = () =>
    performance.timeOrigin + performance.now();
}
