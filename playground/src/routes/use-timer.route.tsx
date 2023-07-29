import { createMutable } from 'solid-js/store';
import { useTimer } from '../../../lib';
import { Countdown } from '../../../lib/hooks/use-timer';

const C = () => {
  const countdown = new Countdown(new Date('Jul 28, 2023 20:24:00').getTime());
  console.log(1, countdown);

  const countdownStore = createMutable({
    milliseconds: countdown.milliseconds,
    state: countdown.state,
    isRunning: `${countdown.isRunning}`,
  });
  countdown.onStart(() => {
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onStop(() => {
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onEnd(() => {
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onReset(() => {
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.state = countdown.state;
    countdownStore.isRunning = `${countdown.isRunning}`;
  });
  countdown.onUpdate(() => {
    countdownStore.milliseconds = countdown.milliseconds;
    countdownStore.isRunning = `${countdown.isRunning}`;
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
      <p>milliseconds: {countdownStore.milliseconds}</p>
    </section>
  );
};

export const UseTimerRoute = () => {
  const timer = useTimer({
    // milliseconds: new Date('Jul 20, 2025 18:49:00').getTime(),
    milliseconds: new Date(Date.now() + 2346827462864).getTime(),
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
        <div>value: {timer.value}</div>
        <div>
          <span>time to: </span>
          <span>
            <b>years:</b> {timer.years}&nbsp;|&nbsp;
          </span>
          <span>
            <b>mount:</b> {timer.month}&nbsp;|&nbsp;
          </span>
          <span>
            <b>weeks:</b> {timer.weeks}&nbsp;|&nbsp;
          </span>
          <span>
            <b>days:</b> {timer.days}&nbsp;|&nbsp;
          </span>
          <span>
            <b>hours:</b> {timer.hours}&nbsp;|&nbsp;
          </span>
          <span>
            <b>minutes:</b> {timer.minutes}&nbsp;|&nbsp;
          </span>
          <span>
            <b>seconds:</b> {timer.seconds}
          </span>
        </div>
      </section>
    </div>
  );
};
