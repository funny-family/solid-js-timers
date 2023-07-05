import { useStopwatch } from 'solid-js-timers';

export const UseStopwatchRoute = () => {
  const stopwatch = useStopwatch({
    ms: 34658736,
  });

  return (
    <section>
      <h1>stopwatch</h1>
      <p>
        <pre>{JSON.stringify(stopwatch, null, 2)}</pre>
      </p>
    </section>
  );
};
