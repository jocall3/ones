import React from 'react';
import WebhookSimulator from '../../../components/WebhookSimulator';

const WebhookSimulatorPage: React.FC = () => {
  return (
    <div>
      <h1>Webhook Simulator</h1>
      <p>Use this tool to simulate and test webhook events.</p>
      <WebhookSimulator />
    </div>
  );
};

export default WebhookSimulatorPage;