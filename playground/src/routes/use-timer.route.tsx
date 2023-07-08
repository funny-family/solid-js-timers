import { useTimer } from 'solid-js-timers';

export const UseTimerRoute = () => {
  const timer = useTimer({
    ms: 34658736,
  });

  console.log('timer:', timer);

  return <div>timer</div>;
};
