<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-js-timers&background=tiles&project=%20" alt="solid-js-timers">
</p>

# solid-js-timers

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

Timer hooks for solid-js.

## Quick start

### Installation

```bash
npm i solid-js-timers
# or
yarn add solid-js-timers
# or
pnpm add solid-js-timers
```

### [Demo here!](https://funny-family.github.io/solid-js-timers/)

### Examples

#### `useStopwatch`

```tsx
import { useStopwatch } from 'solid-js-timers';

const App = () => {
  const stopwatch = useStopwatch();
  stopwatch.setMilliseconds(() => 69_000);

  return (
    <div>
      <div>
        <button type="button" onClick={() => stopwatch.start()}>
          start
        </button>
        <button type="button" onClick={() => stopwatch.stop()}>
          stop
        </button>
        <button type="button" onClick={() => stopwatch.reset()}>
          reset
        </button>
      </div>
      <div>
        <span>
          {`${stopwatch.minutes}`.padStart(2, '0')}:
          {`${stopwatch.seconds}`.padStart(2, '0')}:
          {`${stopwatch.milliseconds}`.padStart(2, '0').slice(-2)}
        </span>
      </div>
    </div>
  );
};
```

#### Options

|Option | Description |
| ----- | ----------- |
| milliseconds | Current number of milliseconds. |
| seconds | Current amount of seconds. |
| minutes | Current amount of minutes. |
| isRunning | Indicates whether the timer is running or not. |
| setMilliseconds | Sets the number of milliseconds. |
| start | Start timer. |
| stop | Stop timer. |
| reset | Reset timer. |
| on | Listener method that fires on the specified timer event. |

**NOTE**

`useStopwatch` resets after reaching 3600000 milliseconds (60 minutes or 1 hour).

---

#### `useTime`

```tsx
import { useTime } from 'solid-js-timers';

const App = () => {
  const time = useTime();
  time.start();
  const enUS_DateTimeFormat = Intl.DateTimeFormat('en-US', {
    second: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
    hour12: false,
  });

  return (
    <div>
      <div>
        <button type="button" onClick={() => time.start()}>
          start
        </button>
        <button type="button" onClick={() => time.stop()}>
          stop
        </button>
      </div>
      <div>
        <span>
          {enUS_DateTimeFormat.format(time.currentDate)}
        </span>
        <span>
          {time.ampm}
        </span>
      </div>
    </div>
  );
};
```

#### Options

|Option | Description |
| ----- | ----------- |
| currentDate | Current date object. |
| ampm | 'AM' or 'PM' depends on time. |
| isRunning | Indicates whether the timer is running or not. |
| start | Start timer. |
| stop | Stop timer. |
| on | Listener method that fires on the specified timer event. |

---

#### `useTimer`

```tsx
import { useTimer } from 'solid-js-timers';

const App = () => {
  const timer = useTimer();
  timer.setMilliseconds(() => 69_000);

  return (
    <div>
      <div>
        <button type="button" onClick={() => timer.start()}>
          start
        </button>
        <button type="button" onClick={() => timer.stop()}>
          stop
        </button>
        <button type="button" onClick={() => timer.reset()}>
          reset
        </button>
      </div>
      <div>
        <span>
          {`${stopwatch.days}`.padStart(2, '0')}:
          {`${stopwatch.hours}`.padStart(2, '0')}:
          {`${stopwatch.minutes}`.padStart(2, '0')}:
          {`${stopwatch.seconds}`.padStart(2, '0')}:
          {`${stopwatch.milliseconds}`.padStart(2, '0').slice(-2)}
        </span>
      </div>
    </div>
  );
};
```

#### Options

|Option | Description |
| ----- | ----------- |
| milliseconds | Current number of milliseconds left. |
| seconds | Current amount of seconds left. |
| minutes | Current amount of minutes left. |
| hours | Current amount of hours left. |
| days | Current amount of days left. |
| isRunning | Indicates whether the timer is running or not. |
| setMilliseconds | Sets the number of milliseconds. |
| start | Start timer. |
| stop | Stop timer. |
| reset | Reset timer. |
| on | Listener method that fires on the specified timer event. |

---

**NOTE**

`useStopwatch`, `useTime`, `useTimer` have the following arguments.

| Name | Description | Default value |
| ----- | ---------- | ------------- |
| autoClearInterval | Clear timer's interval on cleanup method. | `true` |
| autoClearTimer | Clear timer on cleanup method. | `true` |
| autoClearListeners | Clear timer's listeners on cleanup method. | `true` |
| autoClearListersArgs | Clear arguments of timer's listeners on cleanup method. | `true` |
| autoClearStore | Clear timer store on cleanup method. | `true` |

---
