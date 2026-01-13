import { useState, useEffect } from 'react';
import { EventBus } from '../utils/eventBus'; // Adjust path if necessary

interface EventBusHookResult<T> {
  subscribe: (eventName: string, callback: (data: T) => void) => void;
  unsubscribe: (eventName: string, callback: (data: T) => void) => void;
}

export function useEventBus<T>(): EventBusHookResult<T> {
  const [eventBus] = useState(() => new EventBus());

  const subscribe = (eventName: string, callback: (data: T) => void) => {
    eventBus.subscribe(eventName, callback);
  };

  const unsubscribe = (eventName: string, callback: (data: T) => void) => {
    eventBus.unsubscribe(eventName, callback);
  };

  useEffect(() => {
    return () => {
      // Clean up all subscriptions on unmount to prevent memory leaks
      eventBus.unsubscribeAll();
    };
  }, [eventBus]);

  return { subscribe, unsubscribe };
}