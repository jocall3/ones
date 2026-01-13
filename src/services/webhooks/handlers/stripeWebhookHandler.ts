import Stripe from 'stripe';
// Assuming a central event bus or state management dispatcher exists for the application.
// This decouples the webhook handler from the specific state management implementation (e.g., Redux, Zustand, EventEmitter).
import { appEventBus } from '../../eventBus';

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripeApiKey = process.env.STRIPE_SECRET_KEY;

if (!stripeWebhookSecret) {
  console.error('CRITICAL: STRIPE_WEBHOOK_SECRET environment variable not set.');
  // In a real application, you might want to prevent the service from starting.
}

if (!stripeApiKey) {
    console.error('CRITICAL: STRIPE_SECRET_KEY environment variable not set.');
}

const stripe = new Stripe(stripeApiKey!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

/**
 * Verifies and handles an incoming Stripe webhook event.
 * This function is designed to be used in a secure server-side environment
 * (e.g., a serverless function, an API route) that receives the webhook from Stripe.
 *
 * @param rawBody The raw request body buffer from Stripe.
 * @param signature The value of the 'stripe-signature' header from the request.
 * @returns A promise that resolves when the event has been processed.
 * @throws An error if the signature is invalid or if another processing error occurs.
 */
export const handleStripeWebhook = async (rawBody: Buffer, signature: string): Promise<void> => {
  if (!stripeWebhookSecret) {
    throw new Error('Stripe webhook secret is not configured.');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);
  } catch (err: any) {
    console.error(`❌ Error verifying Stripe webhook signature: ${err.message}`);
    // This error should be returned to Stripe with a 400 status code.
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }

  console.log(`[Stripe Webhook] Received event: ${event.type} (${event.id})`);

  // Use a generic dispatcher for any event, but also handle specific ones for detailed logic.
  appEventBus.dispatch(`stripe:${event.type}`, event.data.object);

  // Handle specific, critical events with more detailed logic or data transformation.
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      appEventBus.dispatch('app:purchase.completed', {
        sessionId: session.id,
        customerId: session.customer,
        subscriptionId: session.subscription,
        paymentStatus: session.payment_status,
        amountTotal: session.amount_total,
        currency: session.currency,
      });
      break;

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      appEventBus.dispatch('app:payment.succeeded', {
        paymentIntentId: paymentIntent.id,
        customerId: paymentIntent.customer,
        amount: paymentIntent.amount_received,
        currency: paymentIntent.currency,
      });
      break;

    case 'payment_intent.payment_failed':
      const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
      appEventBus.dispatch('app:payment.failed', {
        paymentIntentId: paymentIntentFailed.id,
        customerId: paymentIntentFailed.customer,
        error: paymentIntentFailed.last_payment_error?.message,
      });
      break;

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      appEventBus.dispatch('app:subscription.statusChanged', {
        subscriptionId: subscription.id,
        customerId: subscription.customer,
        status: subscription.status,
        planId: subscription.items.data[0]?.plan.id,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      });
      break;

    case 'invoice.paid':
      const invoicePaid = event.data.object as Stripe.Invoice;
      appEventBus.dispatch('app:invoice.paid', {
        invoiceId: invoicePaid.id,
        customerId: invoicePaid.customer,
        subscriptionId: invoicePaid.subscription,
        amountPaid: invoicePaid.amount_paid,
        currency: invoicePaid.currency,
        invoicePdfUrl: invoicePaid.invoice_pdf,
      });
      break;

    case 'invoice.payment_failed':
      const invoiceFailed = event.data.object as Stripe.Invoice;
      appEventBus.dispatch('app:invoice.paymentFailed', {
        invoiceId: invoiceFailed.id,
        customerId: invoiceFailed.customer,
        subscriptionId: invoiceFailed.subscription,
        nextPaymentAttempt: invoiceFailed.next_payment_attempt,
      });
      break;

    // Add more event handlers as the application's needs grow.
    // For example, handling disputes, refunds, etc.
    // case 'charge.dispute.created':
    //   // ...
    //   break;

    default:
      // This is just a log for unhandled events. We've already dispatched it generically.
      console.log(`[Stripe Webhook] Unhandled specific event type: ${event.type}`);
  }
};