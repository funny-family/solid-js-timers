import { createSignal } from 'solid-js';
import { useStopwatch } from 'solid-js-timers';
// import { useStopwatch } from '../../../lib/hooks/use-stopwatch.hook';

interface StopwatchTimerInterface {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

class StopwatchTimer implements StopwatchTimerInterface {
  clock: number = 0;

  constructor() {
    console.log('this', this);
  }

  start: StopwatchTimerInterface['start'] = () => {
    if (this.#intervalID == null) {
      this.#offset = Date.now();
      this.#intervalID = window.setInterval(this.#update, 1);
    }
  };

  stop: StopwatchTimerInterface['stop'] = () => {
    if (this.#intervalID != null) {
      window.clearInterval(this.#intervalID as number);
      this.#intervalID = null;
    }
  };

  reset: StopwatchTimerInterface['reset'] = () => {
    this.stop();

    this.clock = 0;
  };

  onUpdate = () => {
    //
  }

  #offset: number = 0;
  #intervalID: number | null = null;

  get #delta() {
    const now = Date.now();
    const newDelta = now - this.#offset;
    this.#offset = now;

    return newDelta;
  }

  #update = () => {
    this.clock += this.#delta;
  }
}

export const UseStopwatchRoute = () => {
  const stopwatch = useStopwatch({
    ms: 34658736,
  });

  const sw = new StopwatchTimer();
  const [ms, setMs] = createSignal(0);

  // console.log('stopwatch:', stopwatch);

  return (
    <section>
      <h1>stopwatch</h1>

      <div>
        <button
          type="button"
          onClick={() => {
            sw.start();
            setMs(sw.clock);
          }}
        >
          start
        </button>
        <button
          type="button"
          onClick={() => {
            sw.stop();
            setMs(sw.clock);
          }}
        >
          stop
        </button>
        <button
          type="button"
          onClick={() => {
            sw.reset();
            setMs(sw.clock);
          }}
        >
          reset
        </button>
        <div>clock: {ms()}</div>
      </div>
    </section>
  );
};
