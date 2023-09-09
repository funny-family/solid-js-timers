export interface EventsProviderInterface {
  onStartListener: VoidFunction | null;
  onStopListener: VoidFunction | null;
  onResetListener: VoidFunction | null;
  onUpdateListener: VoidFunction | null;
  on: (
    type: 'start' | 'stop' | 'reset' | 'update',
    listener: VoidFunction
  ) => void;
}

export interface EventsProviderConstructor {
  new (): EventsProviderInterface;
}

export class EventsProvider
  implements EventsProviderInterface
{
  onStartListener: EventsProviderInterface['onStartListener'] = null;
  onStopListener: EventsProviderInterface['onStopListener'] = null;
  onResetListener: EventsProviderInterface['onResetListener'] = null;
  onUpdateListener: EventsProviderInterface['onUpdateListener'] = null;

  on: EventsProviderInterface['on'] = (type, listener) => {
    if (type === 'start') {
      this.onStartListener = listener;

      return;
    }

    if (type === 'stop') {
      this.onStopListener = listener;

      return;
    }

    if (type === 'reset') {
      this.onResetListener = listener;

      return;
    }

    if (type === 'update') {
      this.onUpdateListener = listener;

      return;
    }
  };
}
