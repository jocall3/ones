// src/services/realtime/websocketManager.ts

interface WebSocketConfig {
  url: string;
  onOpen?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  reconnectInterval?: number; // in milliseconds
}

class WebSocketManager {
  private socket: WebSocket | null = null;
  private config: WebSocketConfig;
  private reconnectTimeoutId: number | null = null;

  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectInterval: 5000, // Default reconnect interval
      ...config,
    };
  }

  public connect(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.warn("WebSocket is already connected.");
      return;
    }

    this.socket = new WebSocket(this.config.url);

    this.socket.onopen = (event: Event) => {
      console.log("WebSocket connected to:", this.config.url);
      if (this.config.onOpen) {
        this.config.onOpen(event);
      }
      if (this.reconnectTimeoutId) {
        clearTimeout(this.reconnectTimeoutId);
        this.reconnectTimeoutId = null;
      }
    };

    this.socket.onmessage = (event: MessageEvent) => {
      if (this.config.onMessage) {
        this.config.onMessage(event);
      }
    };

    this.socket.onerror = (event: Event) => {
      console.error("WebSocket error:", event);
      if (this.config.onError) {
        this.config.onError(event);
      }
    };

    this.socket.onclose = (event: CloseEvent) => {
      console.log("WebSocket disconnected:", event.code, event.reason);
      if (this.config.onClose) {
        this.config.onClose(event);
      }
      this.reconnect();
    };
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      if (this.reconnectTimeoutId) {
        clearTimeout(this.reconnectTimeoutId);
        this.reconnectTimeoutId = null;
      }
    }
  }

  public send(data: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    } else {
      console.warn("WebSocket is not connected. Cannot send data.");
    }
  }

  private reconnect(): void {
    if (this.reconnectTimeoutId) {
      return; // Already attempting to reconnect
    }

    this.reconnectTimeoutId = window.setTimeout(() => {
      console.log("Attempting to reconnect to WebSocket...");
      this.connect();
      this.reconnectTimeoutId = null;
    }, this.config.reconnectInterval);
  }
}

export default WebSocketManager;