import type { WindowClearInterval, WindowSetInterval } from '../../types';

export interface CurrentDateInterface {
  readonly isRunning: boolean;
  readonly date: Date;
  readonly start: VoidFunction;
  readonly stop: VoidFunction;
  readonly on: (
    type: keyof Pick<CurrentDateInterface, 'start' | 'stop'> | 'update',
    listener: VoidFunction
  ) => void;
  readonly clearInterval: VoidFunction;
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

    if (this.#onStartListener != null) {
      this.#onStartListener();
    }
  };

  stop: CurrentDateInterface['start'] = () => {
    if (this.#state === 'stopped') {
      return;
    }

    this.clearInterval();
    this.isRunning = false;
    this.#state = 'stopped';

    if (this.#onStopListener != null) {
      this.#onStopListener();
    }
  };

  on: CurrentDateInterface['on'] = (type, listener) => {
    if (type === 'start') {
      this.#onStartListener = listener;

      return;
    }

    if (type === 'stop') {
      this.#onStopListener = listener;

      return;
    }

    if (type === 'update') {
      this.#onUpdateListener = listener;

      return;
    }
  };

  clearInterval: CurrentDateInterface['clearInterval'] = () => {
    if (this.#intervalID != null) {
      (clearInterval as WindowClearInterval)(this.#intervalID as number);
      this.#intervalID = null;
    }
  };

  #state: 'idel' | 'running' | 'stopped' = 'idel';
  #intervalID: null | number = null;
  #onStartListener: VoidFunction | null = null;
  #onStopListener: VoidFunction | null = null;
  #onUpdateListener: VoidFunction | null = null;

  #update: VoidFunction = () => {
    this.date.setTime(Date.now());

    if (this.#onUpdateListener != null) {
      this.#onUpdateListener();
    }
  };
}
