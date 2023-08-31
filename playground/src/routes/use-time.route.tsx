// import { useTime } from 'solid-js-timers';
import { useTime } from '../lib';

export const UseTimeRoute = () => {
  const time = useTime();
  // @ts-ignore
  window.time = time;
  time.start();
  const koKR_DateTimeFormat = Intl.DateTimeFormat('ko-KR', {
    second: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
  });

  time.on('start', (args) => {
    console.log('start 1', args);
  });
  time.on('start', (args) => {
    console.log('start 2', args);
  });

  time.on('stop', (args) => {
    console.log('stop 1', args);
  });
  time.on('stop', (args) => {
    console.log('stop 2', args);
  });

  // time.on('update', (args) => {
  //   console.log('updating 1', args);
  // });
  // time.on('update', (args) => {
  //   console.log('updating 2', args);
  // });

  // const CurrentDate = () =>
  //   `${time.currentDate.getHours()}:${time.currentDate.getMinutes()}:${time.currentDate.getSeconds()} ${
  //     time.ampm
  //   }`;

  return (
    <section>
      {/* <div>
        "time.getCurrentDate:" {time.getCurrentDate().toLocaleTimeString()}
      </div> */}

      <div>"time.currentDate:" {time.currentDate.toLocaleTimeString()}</div>

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
      {/* <p>Current time: {CurrentDate()}</p> */}
      <p>{time.currentDate.getTime()}</p>
      <p>
        localeTimeString:{' '}
        {koKR_DateTimeFormat.format(time.currentDate)} (
        <b>{time.ampm}</b>)
      </p>
    </section>
  );
};
