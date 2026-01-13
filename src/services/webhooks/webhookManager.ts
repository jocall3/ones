// src/services/webhooks/webhookManager.ts

import { WebSocket, WebSocketServer } from 'ws';

interface WebhookHandler {
  (data: any): Promise<void>;
}

interface WebhookRoute {
  event: string;
  handler: WebhookHandler;
}

class WebhookManager {
  private wss: WebSocketServer;
  private routes: WebhookRoute[] = [];

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });
    this.wss.on('connection', ws => this.handleConnection(ws));
    console.log(`WebhookManager listening on port ${port}`);
  }

  private handleConnection(ws: WebSocket): void {
    console.log('Client connected to WebhookManager');

    ws.on('message', message => {
      try {
        const data = JSON.parse(message.toString());
        this.processWebhook(data);
      } catch (error) {
        console.error('Error processing webhook message:', error);
        ws.send(JSON.stringify({ error: 'Invalid webhook format' }));
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebhookManager');
    });

    ws.on('error', error => {
      console.error('WebSocket error:', error);
    });
  }

  addRoute(event: string, handler: WebhookHandler): void {
    this.routes.push({ event, handler });
  }

  async processWebhook(data: any): Promise<void> {
    const eventType = data?.event;

    if (!eventType) {
      console.warn('Received webhook without event type:', data);
      return;
    }

    const route = this.routes.find(r => r.event === eventType);

    if (!route) {
      console.warn(`No handler registered for event type: ${eventType}`);
      return;
    }

    try {
      await route.handler(data);
      console.log(`Successfully processed webhook event: ${eventType}`);
    } catch (error) {
      console.error(`Error processing webhook event ${eventType}:`, error);
    }
  }

  start(): void {
    // Already started in the constructor
  }

  stop(): void {
    this.wss.close();
    console.log('WebhookManager stopped');
  }
}

export default WebhookManager;