// import { useTime } from 'solid-js-timers';
import { useTime } from '../../../lib/hooks/use-time';

export const UseTimeRoute = () => {
  const time = useTime({
    localesArgument: 'ko-KR',
  });

  // time.onStart((args) => {
  //   console.log('start 1', args);
  // });
  // time.onStart((args) => {
  //   console.log('start 2', args);
  // });

  // time.onStop((args) => {
  //   console.log('stop 1', args);
  // });
  // time.onStop((args) => {
  //   console.log('stop 2', args);
  // });

  // time.onUpdate((args) => {
  //   console.log('updating 1', args);
  // });
  // time.onUpdate((args) => {
  //   console.log('updating 2', args);
  // });

  // const currentTime = () =>
  //   `${time.currentDate.getHours()}:${time.currentDate.getMinutes()}:${time.currentDate.getSeconds()} ${
  //     time.ampm
  //   }`;

  return (
    <section>
      <h1>Time</h1>
      <p>
        <button type="button" onClick={() => time.start()}>
          start
        </button>
        <button type="button" onClick={() => time.stop()}>
          stop
        </button>
      </p>
      <p>isRunning: {`${time.isRunning}`}</p>
      {/* <p>Current time: {currentTime()}</p> */}
      <p>
        localeTimeString: {time.localeTimeString} (<b>{time.ampm}</b>)
      </p>
    </section>
  );
};
