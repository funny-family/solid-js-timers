import { createMemo } from 'solid-js';

type UseStopwatchHookArgs = { ms: number; autoStart?: boolean };
type UseStopwatchHookReturnValue = any;
type UseStopwatchHook = (
  args: UseStopwatchHookArgs
) => UseStopwatchHookReturnValue;

export const useStopwatch = ((args: Required<UseStopwatchHookArgs>) => {
  if (args.autoStart == null) {
    args.autoStart = false;
  }

  const cachedMs = createMemo(() => args.ms + Date.now());

  const tick = () => {
    //
  };

  const intervalId = setInterval(tick, 1);

}) as UseStopwatchHook;
