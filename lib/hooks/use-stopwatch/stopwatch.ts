import {
  type EventsProviderInterface,
  EventsProvider,
} from './events-provider';
import { type WindowClearInterval, type WindowSetInterval } from '../../types';

export interface StopwatchInterface {
  milliseconds: number;
  readonly isRunning: boolean;
  readonly start: VoidFunction;
  readonly stop: VoidFunction;
  readonly reset: VoidFunction;
  readonly on: EventsProviderInterface['on'];
  readonly clearInterval: VoidFunction;
}

export type StopwatchConstructor = {
  new (): StopwatchInterface;
};

export class Stopwatch implements StopwatchInterface {
  constructor() {
    this.#eventsProvider = new EventsProvider();
  }

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
      this.#intervalID = (setInterval as WindowSetInterval)(this.#update, 90);
    }

    if (this.#eventsProvider.onStartListener != null) {
      this.#eventsProvider.onStartListener();
    }
  };

  stop: StopwatchInterface['stop'] = () => {
    if (this.isRunning === false) {
      return;
    }

    this.clearInterval();
    this.#state = 'stopped';
    this.isRunning = false;

    if (this.#eventsProvider.onStopListener != null) {
      this.#eventsProvider.onStopListener();
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

    if (this.#eventsProvider.onResetListener != null) {
      this.#eventsProvider.onResetListener();
    }
  };

  on: StopwatchInterface['on'] = (type, listener) => {
    this.#eventsProvider.on(type, listener);
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
  #eventsProvider: EventsProviderInterface;

  get #delta(): number {
    const now = Date.now();
    const newDelta = now - this.#offset;
    this.#offset = now;

    return newDelta;
  }

  #update: VoidFunction = () => {
    this.milliseconds += this.#delta;

    if (this.#eventsProvider.onUpdateListener != null) {
      this.#eventsProvider.onUpdateListener();
    }
  };
}
