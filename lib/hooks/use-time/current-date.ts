import type { WindowClearInterval, WindowSetInterval } from '../../types';

type CurrentDateListenerCallback = () => void;
type CurrentDateListener = (callback: CurrentDateListenerCallback) => void;

export interface CurrentDateInterface {
  readonly isRunning: boolean;
  readonly date: Date;
  readonly start: () => void;
  readonly stop: () => void;
  readonly clearInterval: () => void;
  readonly onStart: CurrentDateListener;
  readonly onStop: CurrentDateListener;
  readonly onUpdate: CurrentDateListener;
}

export type CurrentDateConstructor = {
  new (): CurrentDateInterface;
};

export class CurrentDate implements CurrentDateInterface {
  isRunning: CurrentDateInterface['isRunning'] = false;
  date: CurrentDateInterface['date'] = new Date();

  start: CurrentDateInterface['start'] = () => {
    if (this.#state === 'running') {
      return;
    }

    this.isRunning = true;
    this.#state = 'running';
    this.date.setTime(Date.now());

    if (this.#intervalID == null) {
      this.#intervalID = (setInterval as WindowSetInterval)(this.#update, 300);
    }

    if (this.#onStartCallback != null) {
      this.#onStartCallback();
    }
  };

  stop: CurrentDateInterface['start'] = () => {
    if (this.#state === 'stopped') {
      return;
    }

    this.clearInterval();
    this.isRunning = false;
    this.#state = 'stopped';

    if (this.#onStopCallback != null) {
      this.#onStopCallback();
    }
  };

  clearInterval: CurrentDateInterface['clearInterval'] = () => {
    if (this.#intervalID != null) {
      (clearInterval as WindowClearInterval)(this.#intervalID as number);
      this.#intervalID = null;
    }
  };

  onStart: CurrentDateInterface['onStart'] = (callback) => {
    this.#onStartCallback = callback;
  };

  onStop: CurrentDateInterface['onStop'] = (callback) => {
    this.#onStopCallback = callback;
  };

  onUpdate: CurrentDateInterface['onUpdate'] = (callback) => {
    this.#onUpdateCallback = callback;
  };

  #state: 'idel' | 'running' | 'stopped' = 'idel';
  #intervalID: null | number = null;
  #onStartCallback: CurrentDateListenerCallback | null = null;
  #onStopCallback: CurrentDateListenerCallback | null = null;
  #onUpdateCallback: CurrentDateListenerCallback | null = null;

  #update: () => void = () => {
    this.date.setTime(Date.now());

    if (this.#onUpdateCallback != null) {
      this.#onUpdateCallback();
    }
  };
}
