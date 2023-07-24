import type { WindowClearInterval, WindowSetInterval } from '../../types';

export interface CurrentTimeInterface {
  isRunning: boolean;
  intervalID: number | null;
  date: Date;
  start: () => void;
  stop: () => void;
  clearInterval: () => void;
  onStart: (callback: () => void) => void;
  onStop: (callback: () => void) => void;
  onUpdate: (callback: () => void) => void;
}

type C = {
  updateFrequency?: number;
};

export type CurrentTimeConstructor = {
  new (args?: C): CurrentTimeInterface;
};

export class CurrentTime implements CurrentTimeInterface {
  constructor(args: C = {}) {
    this.#updateFrequency = args.updateFrequency || 100;
  }

  isRunning: CurrentTimeInterface['isRunning'] = false;
  intervalID: CurrentTimeInterface['intervalID'] = null;
  date: CurrentTimeInterface['date'] = new Date();

  start: CurrentTimeInterface['start'] = () => {
    if (this.#state === 'running') {
      return;
    }

    this.isRunning = true;
    this.#state = 'running';
    // this.date.setTime(this.#getCurrentMilliseconds() );

    if (this.#onStartCallback != null) {
      this.#onStartCallback();
    }

    if (this.intervalID == null) {
      this.intervalID = (setInterval as WindowSetInterval)(
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
    if (this.intervalID != null) {
      (clearInterval as WindowClearInterval)(this.intervalID as number);
      this.intervalID = null;
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
  #onStartCallback: Parameters<CurrentTimeInterface['onStart']>[0] | null =
    null;
  #onStopCallback: Parameters<CurrentTimeInterface['onStop']>[0] | null = null;
  #onUpdateCallback: Parameters<CurrentTimeInterface['onUpdate']>[0] | null =
    null;

  #update: () => void = () => {
    this.date.setTime(this.#getCurrentMilliseconds());

    if (this.#onUpdateCallback != null) {
      this.#onUpdateCallback();
    }
  };

  #getCurrentMilliseconds: () => number = () =>
    performance.timeOrigin + performance.now();
}
