import { createSignal, type Component } from 'solid-js';
import { UseStopwatchRoute } from './routes/use-stopwatch.route';
import { UseTimeRoute } from './routes/use-time.route';
// import { UseTimerRoute } from './routes/use-timer.route';
import './app.styles.css';

export const App: Component = () => {
  const [dateString, setDateString] = createSignal('');

  // setInterval(() => {
  //   const string = new Date().toLocaleTimeString('en-US', {
  //     hour12: false,
  //   });

  //   setDateString(string);
  // }, 1000);

  return (
    <main>
      <UseStopwatchRoute />
      <br />
      <UseTimeRoute />
      <br />
      {/* <UseTimerRoute /> */}

      {/* <div>dateString: {dateString()}</div> */}
    </main>
  );
};
