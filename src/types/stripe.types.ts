// src/types/stripe.types.ts

/**
 * This file contains TypeScript definitions for various Stripe API objects.
 * These types are based on the official Stripe API documentation and are intended
 * to provide type safety when working with Stripe data within the application.
 * Not all fields for every object are included, only the most commonly used ones.
 * For a complete reference, see the Stripe API documentation.
 */

export interface StripeObject {
  id: string;
  object: string;
  livemode: boolean;
  metadata: { [key: string]: string };
}

export interface StripeList<T> {
  object: 'list';
  data: T[];
  has_more: boolean;
  url: string;
  total_count?: number;
}

export interface Address {
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}

export interface Customer extends StripeObject {
  object: 'customer';
  address: Address | null;
  balance: number;
  created: number;
  currency: string | null;
  default_source: string | Card['id'] | null;
  delinquent: boolean | null;
  description: string | null;
  discount: any | null; // Replace 'any' with a specific Discount type if needed
  email: string | null;
  invoice_prefix: string;
  invoice_settings: {
    custom_fields: any | null;
    default_payment_method: string | PaymentMethod['id'] | null;
    footer: string | null;
  };
  name: string | null;
  phone: string | null;
  preferred_locales: string[];
  shipping: {
    address: Address;
    name: string;
    phone: string | null;
  } | null;
  subscriptions: StripeList<Subscription>;
  tax_exempt: 'none' | 'exempt' | 'reverse';
}

export interface Card extends StripeObject {
  object: 'card';
  address_city: string | null;
  address_country: string | null;
  address_line1: string | null;
  address_line1_check: 'pass' | 'fail' | 'unavailable' | 'unchecked' | null;
  address_line2: string | null;
  address_state: string | null;
  address_zip: string | null;
  address_zip_check: 'pass' | 'fail' | 'unavailable' | 'unchecked' | null;
  brand: string;
  country: string;
  customer: string | Customer['id'] | null;
  cvc_check: 'pass' | 'fail' | 'unavailable' | 'unchecked' | null;
  dynamic_last4: string | null;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: 'credit' | 'debit' | 'prepaid' | 'unknown';
  last4: string;
  name: string | null;
  tokenization_method: string | null;
}

export interface PaymentMethod extends StripeObject {
  object: 'payment_method';
  billing_details: {
    address: Address | null;
    email: string | null;
    name: string | null;
    phone: string | null;
  };
  card: {
    brand: string;
    checks: {
      address_line1_check: string | null;
      address_postal_code_check: string | null;
      cvc_check: string | null;
    };
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: any | null;
    last4: string;
    networks: {
      available: string[];
      preferred: string | null;
    };
    three_d_secure_usage: {
      supported: boolean;
    };
    wallet: any | null;
  } | null;
  created: number;
  customer: string | Customer['id'] | null;
  type: 'card' | 'alipay' | 'au_becs_debit' | 'bacs_debit' | 'bancontact' | 'eps' | 'fpx' | 'giropay' | 'grabpay' | 'ideal' | 'p24' | 'sepa_debit' | 'sofort' | 'wechat_pay';
}

export interface Charge extends StripeObject {
  object: 'charge';
  amount: number;
  amount_captured: number;
  amount_refunded: number;
  balance_transaction: string | BalanceTransaction['id'] | null;
  billing_details: PaymentMethod['billing_details'];
  calculated_statement_descriptor: string;
  captured: boolean;
  created: number;
  currency: string;
  customer: string | Customer['id'] | null;
  description: string | null;
  disputed: boolean;
  failure_code: string | null;
  failure_message: string | null;
  invoice: string | Invoice['id'] | null;
  paid: boolean;
  payment_intent: string | PaymentIntent['id'] | null;
  payment_method: string | PaymentMethod['id'] | null;
  payment_method_details: any; // Can be complex, use 'any' for simplicity
  receipt_email: string | null;
  receipt_number: string | null;
  receipt_url: string | null;
  refunded: boolean;
  refunds: StripeList<Refund>;
  status: 'succeeded' | 'pending' | 'failed';
}

export interface Refund extends StripeObject {
  object: 'refund';
  amount: number;
  balance_transaction: string | BalanceTransaction['id'] | null;
  charge: string | Charge['id'] | null;
  created: number;
  currency: string;
  reason: 'duplicate' | 'fraudulent' | 'requested_by_customer' | null;
  receipt_number: string | null;
  status: 'pending' | 'succeeded' | 'failed' | 'canceled';
}

export interface PaymentIntent extends StripeObject {
  object: 'payment_intent';
  amount: number;
  amount_capturable: number;
  amount_received: number;
  application: string | null;
  application_fee_amount: number | null;
  canceled_at: number | null;
  cancellation_reason: 'duplicate' | 'fraudulent' | 'requested_by_customer' | 'abandoned' | null;
  capture_method: 'automatic' | 'manual';
  client_secret: string;
  confirmation_method: 'automatic' | 'manual';
  created: number;
  currency: string;
  customer: string | Customer['id'] | null;
  description: string | null;
  invoice: string | Invoice['id'] | null;
  last_payment_error: {
    charge: string;
    code: string;
    decline_code: string;
    doc_url: string;
    message: string;
    param: string;
    payment_method: PaymentMethod;
    type: string;
  } | null;
  next_action: any | null;
  payment_method: string | PaymentMethod['id'] | null;
  payment_method_options: any;
  payment_method_types: string[];
  receipt_email: string | null;
  setup_future_usage: 'on_session' | 'off_session' | null;
  shipping: {
    address: Address;
    carrier: string | null;
    name: string;
    phone: string | null;
    tracking_number: string | null;
  } | null;
  statement_descriptor: string | null;
  statement_descriptor_suffix: string | null;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
  transfer_data: {
    amount: number;
    destination: string;
  } | null;
  transfer_group: string | null;
}

export interface Product extends StripeObject {
  object: 'product';
  active: boolean;
  created: number;
  description: string | null;
  images: string[];
  name: string;
  package_dimensions: {
    height: number;
    length: number;
    weight: number;
    width: number;
  } | null;
  shippable: boolean | null;
  statement_descriptor: string | null;
  unit_label: string | null;
  updated: number;
  url: string | null;
}

export interface Price extends StripeObject {
  object: 'price';
  active: boolean;
  billing_scheme: 'per_unit' | 'tiered';
  created: number;
  currency: string;
  product: string | Product['id'];
  recurring: {
    aggregate_usage: 'sum' | 'last_during_period' | 'last_ever' | 'max' | null;
    interval: 'day' | 'week' | 'month' | 'year';
    interval_count: number;
    usage_type: 'metered' | 'licensed';
  } | null;
  tax_behavior: 'inclusive' | 'exclusive' | 'unspecified';
  tiers_mode: 'graduated' | 'volume' | null;
  transform_quantity: {
    divide_by: number;
    round: 'up' | 'down';
  } | null;
  type: 'one_time' | 'recurring';
  unit_amount: number | null;
  unit_amount_decimal: string | null;
}

export interface SubscriptionItem extends StripeObject {
  object: 'subscription_item';
  billing_thresholds: {
    usage_gte: number;
  } | null;
  created: number;
  price: Price;
  quantity: number;
  subscription: string;
  tax_rates: any[] | null;
}

export interface Subscription extends StripeObject {
  object: 'subscription';
  application_fee_percent: number | null;
  billing_cycle_anchor: number;
  billing_thresholds: {
    amount_gte: number | null;
    reset_billing_cycle_anchor: boolean | null;
  } | null;
  cancel_at: number | null;
  cancel_at_period_end: boolean;
  canceled_at: number | null;
  collection_method: 'charge_automatically' | 'send_invoice';
  created: number;
  current_period_end: number;
  current_period_start: number;
  customer: string | Customer['id'];
  days_until_due: number | null;
  default_payment_method: string | PaymentMethod['id'] | null;
  default_source: string | Card['id'] | null;
  default_tax_rates: any[];
  discount: any | null;
  ended_at: number | null;
  items: StripeList<SubscriptionItem>;
  latest_invoice: string | Invoice['id'] | null;
  pending_setup_intent: string | SetupIntent['id'] | null;
  pending_update: {
    billing_cycle_anchor: number | null;
    expires_at: number;
    subscription_items: StripeList<SubscriptionItem> | null;
    trial_end: number | null;
    trial_from_plan: boolean | null;
  } | null;
  plan: Price | null; // Plan is a legacy object, often represented by a Price object now
  quantity: number;
  start_date: number;
  status: 'active' | 'past_due' | 'unpaid' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'trialing';
  trial_end: number | null;
  trial_start: number | null;
}

export interface InvoiceItem extends StripeObject {
  object: 'invoiceitem';
  amount: number;
  currency: string;
  customer: string | Customer['id'];
  date: number;
  description: string | null;
  discountable: boolean;
  invoice: string | Invoice['id'] | null;
  period: {
    end: number;
    start: number;
  };
  price: Price | null;
  proration: boolean;
  quantity: number;
  subscription: string | Subscription['id'] | null;
  subscription_item?: string;
  unit_amount: number | null;
  unit_amount_decimal: string | null;
}

export interface Invoice extends StripeObject {
  object: 'invoice';
  account_country: string;
  account_name: string | null;
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  application_fee_amount: number | null;
  attempt_count: number;
  attempted: boolean;
  auto_advance: boolean;
  billing_reason: 'subscription_cycle' | 'subscription_create' | 'subscription_update' | 'subscription' | 'manual' | 'upcoming' | 'subscription_threshold';
  charge: string | Charge['id'] | null;
  collection_method: 'charge_automatically' | 'send_invoice';
  created: number;
  currency: string;
  customer: string | Customer['id'];
  customer_address: Address | null;
  customer_email: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  customer_shipping: any | null;
  default_payment_method: string | PaymentMethod['id'] | null;
  default_source: string | Card['id'] | null;
  description: string | null;
  discount: any | null;
  due_date: number | null;
  ending_balance: number | null;
  footer: string | null;
  hosted_invoice_url: string | null;
  invoice_pdf: string | null;
  lines: StripeList<InvoiceItem>;
  next_payment_attempt: number | null;
  number: string | null;
  paid: boolean;
  payment_intent: string | PaymentIntent['id'] | null;
  period_end: number;
  period_start: number;
  post_payment_credit_notes_amount: number;
  pre_payment_credit_notes_amount: number;
  receipt_number: string | null;
  starting_balance: number;
  statement_descriptor: string | null;
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
  subscription: string | Subscription['id'] | null;
  subtotal: number;
  tax: number | null;
  total: number;
  webhooks_delivered_at: number | null;
}

export interface BalanceTransaction extends StripeObject {
  object: 'balance_transaction';
  amount: number;
  available_on: number;
  created: number;
  currency: string;
  description: string | null;
  exchange_rate: number | null;
  fee: number;
  fee_details: {
    amount: number;
    application: string | null;
    currency: string;
    description: string;
    type: string;
  }[];
  net: number;
  source: string | StripeObject['id'] | null;
  status: 'available' | 'pending';
  type: 'charge' | 'refund' | 'adjustment' | 'payout' | 'payout_failure' | 'transfer' | 'transfer_refund' | string; // string for other types
}

export interface SetupIntent extends StripeObject {
  object: 'setup_intent';
  application: string | null;
  cancellation_reason: 'abandoned' | 'requested_by_customer' | 'duplicate' | null;
  client_secret: string;
  created: number;
  customer: string | Customer['id'] | null;
  description: string | null;
  last_setup_error: any | null;
  next_action: any | null;
  on_behalf_of: string | null;
  payment_method: string | PaymentMethod['id'] | null;
  payment_method_options: any;
  payment_method_types: string[];
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'canceled' | 'succeeded';
  usage: 'off_session' | 'on_session';
}

export interface WebhookEvent<T = any> {
  id: string;
  object: 'event';
  api_version: string;
  created: number;
  data: {
    object: T;
    previous_attributes?: Partial<T>;
  };
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string | null;
    idempotency_key: string | null;
  };
  type: string; // e.g., 'customer.created', 'invoice.paid'
}