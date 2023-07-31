import { createMutable } from 'solid-js/store';
import { useTimer } from '../../../lib';
import { Countdown } from '../../../lib/hooks/use-timer';

const C = () => {
  const countdown = new Countdown(Date.now() + 324353);

  const countdownStore = createMutable({
    localeTimeString: countdown.date.toLocaleTimeString(),
    milliseconds: countdown.milliseconds,
    state: countdown.state,
    isRunning: `${countdown.isRunning}`,
  });
  countdown.onStart(() => {
    countdownStore.localeTimeString = countdown.date.toLocaleTimeString();
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onStop(() => {
    countdownStore.localeTimeString = countdown.date.toLocaleTimeString();
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onEnd(() => {
    countdownStore.localeTimeString = countdown.date.toLocaleTimeString();
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onReset(() => {
    countdownStore.localeTimeString = countdown.date.toLocaleTimeString();
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onUpdate(() => {
    countdownStore.localeTimeString = countdown.date.toLocaleTimeString();
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
      <p>localeTimeString: {countdownStore.localeTimeString}</p>
      <p>milliseconds: {countdownStore.milliseconds}</p>
    </section>
  );
};

export const UseTimerRoute = () => {
  const timer = useTimer({
    // initialMilliseconds: new Date('Jul 20, 2025 18:49:00').getTime(),
    // initialMilliseconds: new Date(Date.now() + 2346827462864).getTime(),
    // initialMilliseconds: new Date('Jan 5, 2024 15:37:25').getTime(),
    // initialMilliseconds: Date.now() + 9457698,
    initialMilliseconds: Date.now() + 277153982,
    autostart: true,
  });
  // timer.onUpdate((args) => {
  //   console.log('timer update 1:', args);
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
