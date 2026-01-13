import { renderHook, act } from '@testing-library/react-hooks';
import { useEventBus } from '../useEventBus';
import { EventBus } from '../../lib/utils'; // Adjust path as necessary

describe('useEventBus Hook', () => {
  const eventBus = new EventBus();
  const eventName = 'test-event';

  it('should subscribe to an event on mount and unsubscribe on unmount', () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useEventBus(eventBus, eventName, callback));

    // Simulate event being triggered
    act(() => {
      eventBus.publish(eventName, 'test-data');
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('test-data');

    // Unmount the hook
    unmount();

    // Simulate event being triggered again after unmount
    act(() => {
      eventBus.publish(eventName, 'test-data');
    });

    // Callback should not be called again
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple subscriptions to the same event', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { result: result1, unmount: unmount1 } = renderHook(() => useEventBus(eventBus, eventName, callback1));
    const { result: result2, unmount: unmount2 } = renderHook(() => useEventBus(eventBus, eventName, callback2));

    act(() => {
      eventBus.publish(eventName, 'test-data');
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);

    unmount1();

    act(() => {
      eventBus.publish(eventName, 'test-data');
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(2);

    unmount2();

    act(() => {
      eventBus.publish(eventName, 'test-data');
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(2);
  });

  it('should not subscribe if eventBus or eventName is null or undefined', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useEventBus(null as any, eventName, callback));

    act(() => {
      eventBus.publish(eventName, 'test-data');
    });

    expect(callback).not.toHaveBeenCalled();
    unmount();

    const callback2 = jest.fn();
    const { unmount: unmount2 } = renderHook(() => useEventBus(eventBus, null as any, callback2));

    act(() => {
      eventBus.publish(eventName, 'test-data');
    });

    expect(callback2).not.toHaveBeenCalled();
    unmount2();
  });

  it('should handle different event names', () => {
    const eventName1 = 'event-1';
    const eventName2 = 'event-2';
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { unmount: unmount1 } = renderHook(() => useEventBus(eventBus, eventName1, callback1));
    const { unmount: unmount2 } = renderHook(() => useEventBus(eventBus, eventName2, callback2));

    act(() => {
      eventBus.publish(eventName1, 'data-1');
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith('data-1');
    expect(callback2).not.toHaveBeenCalled();

    act(() => {
      eventBus.publish(eventName2, 'data-2');
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith('data-2');

    unmount1();
    unmount2();
  });
});