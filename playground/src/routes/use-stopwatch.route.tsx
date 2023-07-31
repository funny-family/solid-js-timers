// import { useStopwatch } from 'solid-js-timers';
import { useStopwatch } from '../../../lib';

export const UseStopwatchRoute = () => {
  // const stopwatch = useStopwatch();
  const stopwatch = useStopwatch({ initialMilliseconds: 45654 });
  const numberFormat_Arabic = Intl.NumberFormat('ar-EG');
  // console.log(stopwatch);

  // const stopwatch = useStopwatch({ autostart: true });
  // const stopwatch = useStopwatch({
  //   initialMilliseconds: 3595000,
  // });
  // const stopwatch = useStopwatch({
  //   autostart: true,
  //   initialMilliseconds: 3595000,
  // });

  // const stopwatch1 = useStopwatch();
  // console.log('stopwatch:', stopwatch);

  stopwatch.onStart((args) => {
    console.log('on start 1', args);
  });
  // stopwatch.onStart(() => {
  //   console.log('on start 2');
  // });

  // stopwatch.onStop((args) => {
  //   console.log('on stop 1', args);
  // });
  // stopwatch.onStop((args) => {
  //   console.log('on stop 2', args);
  // });

  // stopwatch.onReset((args) => {
  //   console.log('on reset 1', args);
  // });
  // // stopwatch.onReset(() => {
  // //   console.log('on reset 2');
  // // });

  // stopwatch.onUpdate((args) => {
  //   console.log('on update 1', args);
  // });
  // stopwatch.onUpdate((args) => {
  //   console.log('on update 2', args);
  // });

  return (
    <div>
      <section>
        {/* <div onClick={() => stopwatch1.start()}>{stopwatch1.value}</div> */}
        <h1>stopwatch hook</h1>
        <p>
          <button type="button" onClick={() => stopwatch.start()}>
            start
          </button>
          <button type="button" onClick={() => stopwatch.stop()}>
            stop
          </button>
          <button type="button" onClick={() => stopwatch.reset()}>
            reset
          </button>
        </p>
        <p> isRunning: {`${stopwatch.isRunning}`}</p>
        <p>stopwatch milliseconds: {stopwatch.milliseconds}</p>
        <div>
          <span>stopwatch time: </span>
          <span>
            {`${stopwatch.minutes}`.padStart(2, '0')}:
            {`${stopwatch.seconds}`.padStart(2, '0')}:
            {`${stopwatch.milliseconds}`.padStart(2, '0').slice(-2)}
          </span>
        </div>
        <br />
        <div>
          <span>"ar-EG" stopwatch time:</span>
          <span>
            &nbsp;{numberFormat_Arabic.format(stopwatch.minutes)}&nbsp; &nbsp;
            {numberFormat_Arabic.format(stopwatch.seconds)}&nbsp; &nbsp;
            {numberFormat_Arabic.format(stopwatch.milliseconds)}&nbsp;
          </span>
        </div>
      </section>
    </div>
  );
};
