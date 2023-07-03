import type { Component } from 'solid-js';
import { useTime } from 'solid-js-timers';

export const UseTimeRoute: Component = () => {
  const time = useTime({ format: '24-hour' });

  const currentTime = (
    (time: ReturnType<typeof useTime>) => () =>
      `${time.hours}:${time.minutes}:${time.seconds}`
  )(time);

  return (
    <section>
      <h1>Time</h1>
      <p>
        Current time ({time.format}): {currentTime()}
      </p>
    </section>
  );
};
