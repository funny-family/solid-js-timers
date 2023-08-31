import { Show, type Component } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { UseStopwatchRoute } from './routes/use-stopwatch.route';
import { UseTimeRoute } from './routes/use-time.route';
import { UseTimerRoute } from './routes/use-timer.route';
// import * as sjt from 'solid-js-timers';
// import { useStopwatch, useTime, useTimer } from 'solid-js-timers';
import './app.styles.css';

// console.log('sjt:', sjt);

export const App: Component = () => {
  const v = createMutable({
    stopwatch: true,
    time: true,
    timer: true,
  });

  return (
    <main>
      <div>
        <button type="button" onClick={() => (v.stopwatch = !v.stopwatch)}>
          hide/show stopwatch
        </button>
        <button type="button" onClick={() => (v.time = !v.time)}>
          hide/show time
        </button>
        <button type="button" onClick={() => (v.timer = !v.timer)}>
          hide/show timer
        </button>
      </div>

      <Show when={v.stopwatch} fallback={null}>
        <UseStopwatchRoute />
      </Show>

      <br />

      <Show when={v.time} fallback={null}>
        <UseTimeRoute />
      </Show>

      <br />

      <Show when={v.timer} fallback={null}>
        <UseTimerRoute />
      </Show>
    </main>
  );
};
