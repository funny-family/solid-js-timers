import { type Component } from 'solid-js';
import { UseStopwatchRoute } from './routes/use-stopwatch.route';
import { UseTimeRoute } from './routes/use-time.route';
import { UseTimerRoute } from './routes/use-timer.route';
import './app.styles.css';

export const App: Component = () => {
  return (
    <main>
      <UseStopwatchRoute />
      <br />
      <UseTimeRoute />
      <br />
      <UseTimerRoute />
    </main>
  );
};
