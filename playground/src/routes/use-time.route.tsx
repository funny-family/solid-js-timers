import { useTime } from 'solid-js-timers';

export const UseTimeRoute = () => {
  // const time = useTime();
  const time = useTime({ format: '12-hour' });
  // const time = useTime({ format: '24-hour' });

  const currentTime = (
    (time: ReturnType<typeof useTime>) => () =>
      `${time.hours}:${time.minutes}:${time.seconds} ${time.ampm}`
  )(time);

  return (
    <section>
      <h1>Time</h1>
      <p>Current time: {currentTime()}</p>
    </section>
  );
};
