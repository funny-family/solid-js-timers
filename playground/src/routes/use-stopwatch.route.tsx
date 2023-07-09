import { createSignal } from 'solid-js';
import { useStopwatch } from 'solid-js-timers';
// import { useStopwatch } from '../../../lib/hooks/use-stopwatch.hook';

interface StopwatchTimerInterface {
  start: () => void;
  stop: () => void;
  reset: () => void;
  onUpdate: (callback: () => void) => void;
}

class StopwatchTimer implements StopwatchTimerInterface {
  clock: number = 0;

  start: StopwatchTimerInterface['start'] = () => {
    if (this.#intervalID == null) {
      this.#offset = Date.now();
      this.#intervalID = window.setInterval(() => {
        this.#update();

        if (this.#onUpdateCallBack != null) {
          this.#onUpdateCallBack();
        }
      }, 1);
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

  onUpdate: StopwatchTimerInterface['onUpdate'] = (callback) => {
    this.#onUpdateCallBack = callback;
  };

  #onUpdateCallBack: Parameters<StopwatchTimerInterface['onUpdate']>[0] | null =
    null;
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
  };
}

export const UseStopwatchRoute = () => {
  const stopwatch = useStopwatch();
  // const stopwatch = useStopwatch({ autoStart: true });

  // console.log('stopwatch:'i, stopwatch);

  const sw = new StopwatchTimer();
  const [ms, setMs] = createSignal(sw.clock);
  sw.onUpdate(() => {
    setMs(sw.clock);
  });

  // console.log('sw:', sw);

  return (
    <div>
      <section>
        <h1>stopwatch hook</h1>
        <div>
          <button type="button" onClick={() => stopwatch.start()}>
            start
          </button>
          <button type="button" onClick={() => stopwatch.stop()}>
            stop
          </button>
          <button type="button" onClick={() => stopwatch.reset()}>
            reset
          </button>
        </div>
        <div>stopwatch value: {stopwatch.value}</div>
      </section>

      <section>
        <h1>stopwatch 1</h1>
        <div>
          <button
            type="button"
            onClick={() => {
              sw.start();
              setMs(sw.clock);
              console.log('start', sw);
            }}
          >
            start
          </button>
          <button
            type="button"
            onClick={() => {
              sw.stop();
              setMs(sw.clock);
              console.log('stop', sw);
            }}
          >
            stop
          </button>
          <button
            type="button"
            onClick={() => {
              sw.reset();
              setMs(sw.clock);
              console.log('reset', sw);
            }}
          >
            reset
          </button>
          <div>clock: {ms()}</div>
        </div>
      </section>
    </div>
  );
};
