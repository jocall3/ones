// src/services/webhooks/handlers/modernTreasuryWebhookHandler.ts

import { Request, Response } from 'express';

// Define types for Modern Treasury webhook events (adjust based on actual MT schema)
interface ModernTreasuryEvent {
  type: string;
  data: {
    id: string;
    object: string;
    live_mode: boolean;
    created_at: string;
    resource: string;
    resource_id: string;
    event_type: string;
    payload: any; // Adjust based on expected payload structure
  };
}

// Function to handle Modern Treasury webhooks
export const modernTreasuryWebhookHandler = async (req: Request, res: Response) => {
  try {
    const event: ModernTreasuryEvent = req.body;

    console.log('Received Modern Treasury webhook:', event);

    // Validate the event (e.g., check signature, event type)
    if (!isValidModernTreasuryEvent(event, req.headers['x-signature'])) {
      console.error('Invalid Modern Treasury webhook signature.');
      return res.status(400).send('Invalid signature');
    }

    // Process the event based on its type
    switch (event.data.event_type) {
      case 'payment_order.completed':
        await handlePaymentOrderCompleted(event);
        break;
      case 'payment_order.failed':
        await handlePaymentOrderFailed(event);
        break;
      case 'incoming_payment.reconciled':
        await handleIncomingPaymentReconciled(event);
        break;
      // Add more cases for other event types as needed
      default:
        console.log('Unhandled Modern Treasury event type:', event.data.event_type);
    }

    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Error processing Modern Treasury webhook:', error);
    res.status(500).send('Webhook processing failed');
  }
};

// Placeholder function for signature validation (replace with actual implementation)
function isValidModernTreasuryEvent(event: ModernTreasuryEvent, signature: any): boolean {
  // Implement signature verification logic here using your Modern Treasury API key
  // This is a crucial security step to ensure the webhook is legitimate.
  // Example (replace with your actual verification):
  // const expectedSignature = computeSignature(JSON.stringify(event), yourModernTreasuryApiKey);
  // return signature === expectedSignature;

  // For now, just return true for testing purposes (DO NOT DO THIS IN PRODUCTION)
  return true;
}

// Placeholder function to handle payment order completion
async function handlePaymentOrderCompleted(event: ModernTreasuryEvent) {
  console.log('Payment Order Completed:', event.data.payload);
  // Implement logic to update your database, trigger notifications, etc.
  // Example:
  // await updatePaymentOrderStatus(event.data.payload.id, 'completed');
  // await sendPaymentConfirmationNotification(event.data.payload.recipient_id);
}

// Placeholder function to handle payment order failure
async function handlePaymentOrderFailed(event: ModernTreasuryEvent) {
  console.log('Payment Order Failed:', event.data.payload);
  // Implement logic to handle payment failure (e.g., retry, notify user)
  // Example:
  // await updatePaymentOrderStatus(event.data.payload.id, 'failed');
  // await sendPaymentFailureNotification(event.data.payload.recipient_id, event.data.payload.failure_reason);
}

// Placeholder function to handle incoming payment reconciliation
async function handleIncomingPaymentReconciled(event: ModernTreasuryEvent) {
  console.log('Incoming Payment Reconciled:', event.data.payload);
  // Implement logic to reconcile the incoming payment with your records
  // Example:
  // await matchIncomingPaymentToInvoice(event.data.payload.id, event.data.payload.invoice_id);
}