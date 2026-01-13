type EventCallback<T> = (data: T) => void;

interface EventBus {
  subscribe<T>(event: string, callback: EventCallback<T>): void;
  unsubscribe<T>(event: string, callback: EventCallback<T>): void;
  publish<T>(event: string, data: T): void;
}

class SimpleEventBus implements EventBus {
  private subscriptions: { [event: string]: EventCallback<any>[] } = {};

  subscribe<T>(event: string, callback: EventCallback<T>): void {
    if (!this.subscriptions[event]) {
      this.subscriptions[event] = [];
    }
    this.subscriptions[event].push(callback);
  }

  unsubscribe<T>(event: string, callback: EventCallback<T>): void {
    if (this.subscriptions[event]) {
      this.subscriptions[event] = this.subscriptions[event].filter(
        (cb) => cb !== callback
      );
    }
  }

  publish<T>(event: string, data: T): void {
    if (this.subscriptions[event]) {
      this.subscriptions[event].forEach((callback) => {
        callback(data);
      });
    }
  }
}

const eventBus: EventBus = new SimpleEventBus();

export default eventBus;