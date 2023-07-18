// import { useTime } from 'solid-js-timers';
import { useTime } from '../../../lib/hooks/use-time/use-time.hook';

export const UseTimeRoute = () => {
  // const time = useTime();
  const time = useTime({ format: '12-hour' });
  // const time = useTime({ format: '24-hour' });

  // time.onUpdate((args) => {
  //   console.log('updating time', args);
  // });
  // time.onUpdate(() => {
  //   console.log('updating time 1');
  // });

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
