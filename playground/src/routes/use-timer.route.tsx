import { createMutable } from 'solid-js/store';
import { useTimer } from '../../../lib';
import { Countdown } from '../../../lib/hooks/use-timer';

const C = () => {
  const countdown = new Countdown(Date.now() + 12000);

  const countdownStore = createMutable({
    // localeTimeString: countdown.date.toLocaleTimeString(),
    milliseconds: countdown.milliseconds,
    state: countdown.state,
    isRunning: `${countdown.isRunning}`,
  });
  countdown.onStart(() => {
    // countdownStore.localeTimeString = countdown.date.toLocaleTimeString();
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onStop(() => {
    // countdownStore.localeTimeString = countdown.date.toLocaleTimeString();
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onEnd(() => {
    // countdownStore.localeTimeString = countdown.date.toLocaleTimeString();
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onReset(() => {
    // countdownStore.localeTimeString = countdown.date.toLocaleTimeString();
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onUpdate(() => {
    // countdownStore.localeTimeString = countdown.date.toLocaleTimeString();
    countdownStore.milliseconds = countdown.milliseconds;
  });

  return (
    <section>
      <h1>Countdown</h1>
      <div>
        <button type="button" onClick={() => countdown.start()}>
          start
        </button>
        <button type="button" onClick={() => countdown.stop()}>
          stop
        </button>
        <button type="button" onClick={() => countdown.reset()}>
          reset
        </button>
      </div>
      <p>isRunning: {countdownStore.isRunning}</p>
      {/* <p>localeTimeString: {countdownStore.localeTimeString}</p> */}
      <p>milliseconds: {countdownStore.milliseconds}</p>
    </section>
  );
};

export const UseTimerRoute = () => {
  const timer = useTimer({
    // initialMilliseconds: Date.now() + 27715,
    initialMilliseconds: 27715,
    // initialMilliseconds: 5000,
    // initialMilliseconds: 0,
    // initialMilliseconds: Date.now() + 12000,
    // initialMilliseconds: new Date('Jan 1, 2024 15:37:25').getTime(),
    // autostart: true,
  });

  timer.onStart((args) => {
    console.log('timer start 1:', args);
  });
  timer.onStart((args) => {
    console.log('timer start 2:', args);
  });

  timer.onEnd((args) => {
    console.log('timer end 1:', args);
  });
  timer.onEnd((args) => {
    console.log('timer end 2:', args);
  });

  timer.onStop((args) => {
    console.log('timer stop 1:', args);
  });
  timer.onStop((args) => {
    console.log('timer stop 2:', args);
  });

  timer.onReset((args) => {
    console.log('timer reset 1:', args);
  });
  timer.onReset((args) => {
    console.log('timer reset 2:', args);
  });

  // timer.onUpdate((args) => {
  //   console.log('timer update 1:', args);
  // });
  // timer.onUpdate((args) => {
  //   console.log('timer update 2:', args);
  // });

  // console.log('timer:', timer);

  return (
    <div>
      <C />
      <br />
      <section>
        <h1>timer</h1>
        <div>
          <button type="button" onClick={() => timer.start()}>
            start
          </button>
          <button type="button" onClick={() => timer.stop()}>
            stop
          </button>
          <button type="button" onClick={() => timer.reset()}>
            restart
          </button>
        </div>
        <p>isRunning: {`${timer.isRunning}`}</p>
        {/* <div>value: {timer.milliseconds}</div> */}
        <div>
          <span>time to: </span>
          {/* <span>
            <b>y:</b> {timer.years.toString().padStart(2, '0')}&nbsp;|&nbsp;
          </span> */}
          {/* <span>
            <b>m:</b> {timer.month.toString().padStart(2, '0')}&nbsp;|&nbsp;
          </span> */}
          {/* <span>
            <b>w:</b> {timer.weeks.toString().padStart(2, '0')}&nbsp;|&nbsp;
          </span> */}
          <span>
            <b>d:</b> {timer.days.toString().padStart(2, '0')}&nbsp;|&nbsp;
          </span>
          <span>
            <b>h:</b> {timer.hours.toString().padStart(2, '0')}&nbsp;|&nbsp;
          </span>
          <span>
            <b>m:</b> {timer.minutes.toString().padStart(2, '0')}&nbsp;|&nbsp;
          </span>
          <span>
            <b>s:</b> {timer.seconds.toString().padStart(2, '0')}&nbsp;|&nbsp;
          </span>
        </div>
      </section>
    </div>
  );
};
