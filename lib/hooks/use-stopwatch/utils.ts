import { type StopwatchTimerInterface } from './stopwatch-timer.class';

export const calculateMilliseconds = (
  stopwatchTimer: StopwatchTimerInterface
): string => `${stopwatchTimer.value || '00'}`.padStart(2, '0').slice(-2);
export type CalculateMillisecondsFunction = typeof calculateMilliseconds;

export const calculateSeconds = (
  stopwatchTimer: StopwatchTimerInterface
): string => `${~~((stopwatchTimer.value % 60000) / 1000)}`.padStart(2, '0');
export type CalculateSecondsFunction = typeof calculateSeconds;

export const calculateMinutes = (stopwatchTimer: StopwatchTimerInterface) =>
  `${~~(stopwatchTimer.value / 60000)}`.padStart(2, '0');
export type CalculateMinutesFunction = typeof calculateMinutes;
