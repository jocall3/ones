import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // or the latest version you want to use
});

/**
 * Stripe API Service
 */
const stripeApi = {
  /**
   * Creates a new customer in Stripe.
   * @param {Stripe.CustomerCreateParams} params - Customer creation parameters.
   * @returns {Promise<Stripe.Customer>} - The created customer object.
   */
  createCustomer: async (params: Stripe.CustomerCreateParams): Promise<Stripe.Customer> => {
    try {
      const customer = await stripe.customers.create(params);
      return customer;
    } catch (error: any) {
      console.error('Error creating customer:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a customer from Stripe.
   * @param {string} customerId - The ID of the customer to retrieve.
   * @returns {Promise<Stripe.Customer>} - The retrieved customer object.
   */
  getCustomer: async (customerId: string): Promise<Stripe.Customer> => {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      return customer as Stripe.Customer; // Explicitly cast to Stripe.Customer
    } catch (error: any) {
      console.error('Error retrieving customer:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Updates a customer in Stripe.
   * @param {string} customerId - The ID of the customer to update.
   * @param {Stripe.CustomerUpdateParams} params - Customer update parameters.
   * @returns {Promise<Stripe.Customer>} - The updated customer object.
   */
  updateCustomer: async (
    customerId: string,
    params: Stripe.CustomerUpdateParams
  ): Promise<Stripe.Customer> => {
    try {
      const customer = await stripe.customers.update(customerId, params);
      return customer;
    } catch (error: any) {
      console.error('Error updating customer:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a new charge in Stripe.
   * @param {Stripe.ChargeCreateParams} params - Charge creation parameters.
   * @returns {Promise<Stripe.Charge>} - The created charge object.
   */
  createCharge: async (params: Stripe.ChargeCreateParams): Promise<Stripe.Charge> => {
    try {
      const charge = await stripe.charges.create(params);
      return charge;
    } catch (error: any) {
      console.error('Error creating charge:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a charge from Stripe.
   * @param {string} chargeId - The ID of the charge to retrieve.
   * @returns {Promise<Stripe.Charge>} - The retrieved charge object.
   */
  getCharge: async (chargeId: string): Promise<Stripe.Charge> => {
    try {
      const charge = await stripe.charges.retrieve(chargeId);
      return charge;
    } catch (error: any) {
      console.error('Error retrieving charge:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a new PaymentIntent in Stripe.
   * @param {Stripe.PaymentIntentCreateParams} params - PaymentIntent creation parameters.
   * @returns {Promise<Stripe.PaymentIntent>} - The created PaymentIntent object.
   */
  createPaymentIntent: async (
    params: Stripe.PaymentIntentCreateParams
  ): Promise<Stripe.PaymentIntent> => {
    try {
      const paymentIntent = await stripe.paymentIntents.create(params);
      return paymentIntent;
    } catch (error: any) {
      console.error('Error creating PaymentIntent:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a PaymentIntent from Stripe.
   * @param {string} paymentIntentId - The ID of the PaymentIntent to retrieve.
   * @returns {Promise<Stripe.PaymentIntent>} - The retrieved PaymentIntent object.
   */
  getPaymentIntent: async (paymentIntentId: string): Promise<Stripe.PaymentIntent> => {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error: any) {
      console.error('Error retrieving PaymentIntent:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Confirms a PaymentIntent in Stripe.
   * @param {string} paymentIntentId - The ID of the PaymentIntent to confirm.
   * @param {Stripe.PaymentIntentConfirmParams} params - PaymentIntent confirmation parameters.
   * @returns {Promise<Stripe.PaymentIntent>} - The confirmed PaymentIntent object.
   */
  confirmPaymentIntent: async (
    paymentIntentId: string,
    params?: Stripe.PaymentIntentConfirmParams
  ): Promise<Stripe.PaymentIntent> => {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, params);
      return paymentIntent;
    } catch (error: any) {
      console.error('Error confirming PaymentIntent:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Cancels a PaymentIntent in Stripe.
   * @param {string} paymentIntentId - The ID of the PaymentIntent to cancel.
   * @param {Stripe.PaymentIntentCancelParams} params - PaymentIntent cancellation parameters.
   * @returns {Promise<Stripe.PaymentIntent>} - The cancelled PaymentIntent object.
   */
  cancelPaymentIntent: async (
    paymentIntentId: string,
    params?: Stripe.PaymentIntentCancelParams
  ): Promise<Stripe.PaymentIntent> => {
    try {
      const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId, params);
      return paymentIntent;
    } catch (error: any) {
      console.error('Error cancelling PaymentIntent:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a new SetupIntent in Stripe.
   * @param {Stripe.SetupIntentCreateParams} params - SetupIntent creation parameters.
   * @returns {Promise<Stripe.SetupIntent>} - The created SetupIntent object.
   */
  createSetupIntent: async (params: Stripe.SetupIntentCreateParams): Promise<Stripe.SetupIntent> => {
    try {
      const setupIntent = await stripe.setupIntents.create(params);
      return setupIntent;
    } catch (error: any) {
      console.error('Error creating SetupIntent:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a SetupIntent from Stripe.
   * @param {string} setupIntentId - The ID of the SetupIntent to retrieve.
   * @returns {Promise<Stripe.SetupIntent>} - The retrieved SetupIntent object.
   */
  getSetupIntent: async (setupIntentId: string): Promise<Stripe.SetupIntent> => {
    try {
      const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);
      return setupIntent;
    } catch (error: any) {
      console.error('Error retrieving SetupIntent:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Confirms a SetupIntent in Stripe.
   * @param {string} setupIntentId - The ID of the SetupIntent to confirm.
   * @param {Stripe.SetupIntentConfirmParams} params - SetupIntent confirmation parameters.
   * @returns {Promise<Stripe.SetupIntent>} - The confirmed SetupIntent object.
   */
  confirmSetupIntent: async (
    setupIntentId: string,
    params?: Stripe.SetupIntentConfirmParams
  ): Promise<Stripe.SetupIntent> => {
    try {
      const setupIntent = await stripe.setupIntents.confirm(setupIntentId, params);
      return setupIntent;
    } catch (error: any) {
      console.error('Error confirming SetupIntent:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a new subscription in Stripe.
   * @param {Stripe.SubscriptionCreateParams} params - Subscription creation parameters.
   * @returns {Promise<Stripe.Subscription>} - The created subscription object.
   */
  createSubscription: async (
    params: Stripe.SubscriptionCreateParams
  ): Promise<Stripe.Subscription> => {
    try {
      const subscription = await stripe.subscriptions.create(params);
      return subscription;
    } catch (error: any) {
      console.error('Error creating subscription:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a subscription from Stripe.
   * @param {string} subscriptionId - The ID of the subscription to retrieve.
   * @returns {Promise<Stripe.Subscription>} - The retrieved subscription object.
   */
  getSubscription: async (subscriptionId: string): Promise<Stripe.Subscription> => {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      return subscription;
    } catch (error: any) {
      console.error('Error retrieving subscription:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Updates a subscription in Stripe.
   * @param {string} subscriptionId - The ID of the subscription to update.
   * @param {Stripe.SubscriptionUpdateParams} params - Subscription update parameters.
   * @returns {Promise<Stripe.Subscription>} - The updated subscription object.
   */
  updateSubscription: async (
    subscriptionId: string,
    params: Stripe.SubscriptionUpdateParams
  ): Promise<Stripe.Subscription> => {
    try {
      const subscription = await stripe.subscriptions.update(subscriptionId, params);
      return subscription;
    } catch (error: any) {
      console.error('Error updating subscription:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Cancels a subscription in Stripe.
   * @param {string} subscriptionId - The ID of the subscription to cancel.
   * @returns {Promise<Stripe.Subscription>} - The cancelled subscription object.
   */
  cancelSubscription: async (subscriptionId: string): Promise<Stripe.Subscription> => {
    try {
      const subscription = await stripe.subscriptions.cancel(subscriptionId);
      return subscription;
    } catch (error: any) {
      console.error('Error cancelling subscription:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Lists prices from Stripe.
   * @param {Stripe.PriceListParams} params - Parameters for listing prices.
   * @returns {Promise<Stripe.ApiList<Stripe.Price>>} - A list of prices.
   */
  listPrices: async (params?: Stripe.PriceListParams): Promise<Stripe.ApiList<Stripe.Price>> => {
    try {
      const prices = await stripe.prices.list(params);
      return prices;
    } catch (error: any) {
      console.error('Error listing prices:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Lists products from Stripe.
   * @param {Stripe.ProductListParams} params - Parameters for listing products.
   * @returns {Promise<Stripe.ApiList<Stripe.Product>>} - A list of products.
   */
  listProducts: async (
    params?: Stripe.ProductListParams
  ): Promise<Stripe.ApiList<Stripe.Product>> => {
    try {
      const products = await stripe.products.list(params);
      return products;
    } catch (error: any) {
      console.error('Error listing products:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a product in Stripe.
   * @param {Stripe.ProductCreateParams} params - Parameters for creating a product.
   * @returns {Promise<Stripe.Product>} - The created product.
   */
  createProduct: async (params: Stripe.ProductCreateParams): Promise<Stripe.Product> => {
    try {
      const product = await stripe.products.create(params);
      return product;
    } catch (error: any) {
      console.error('Error creating product:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a product from Stripe.
   * @param {string} productId - The ID of the product to retrieve.
   * @returns {Promise<Stripe.Product>} - The retrieved product.
   */
  getProduct: async (productId: string): Promise<Stripe.Product> => {
    try {
      const product = await stripe.products.retrieve(productId);
      return product as Stripe.Product;
    } catch (error: any) {
      console.error('Error retrieving product:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Updates a product in Stripe.
   * @param {string} productId - The ID of the product to update.
   * @param {Stripe.ProductUpdateParams} params - Parameters for updating a product.
   * @returns {Promise<Stripe.Product>} - The updated product.
   */
  updateProduct: async (
    productId: string,
    params: Stripe.ProductUpdateParams
  ): Promise<Stripe.Product> => {
    try {
      const product = await stripe.products.update(productId, params);
      return product;
    } catch (error: any) {
      console.error('Error updating product:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a price in Stripe.
   * @param {Stripe.PriceCreateParams} params - Parameters for creating a price.
   * @returns {Promise<Stripe.Price>} - The created price.
   */
  createPrice: async (params: Stripe.PriceCreateParams): Promise<Stripe.Price> => {
    try {
      const price = await stripe.prices.create(params);
      return price;
    } catch (error: any) {
      console.error('Error creating price:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a price from Stripe.
   * @param {string} priceId - The ID of the price to retrieve.
   * @returns {Promise<Stripe.Price>} - The retrieved price.
   */
  getPrice: async (priceId: string): Promise<Stripe.Price> => {
    try {
      const price = await stripe.prices.retrieve(priceId);
      return price as Stripe.Price;
    } catch (error: any) {
      console.error('Error retrieving price:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Updates a price in Stripe.  Note: Prices are generally not updated, but this is included for completeness.
   * @param {string} priceId - The ID of the price to update.
   * @param {Stripe.PriceUpdateParams} params - Parameters for updating a price.
   * @returns {Promise<Stripe.Price>} - The updated price.
   */
  updatePrice: async (
    priceId: string,
    params: Stripe.PriceUpdateParams
  ): Promise<Stripe.Price> => {
    try {
      const price = await stripe.prices.update(priceId, params);
      return price;
    } catch (error: any) {
      console.error('Error updating price:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a customer portal session.
   * @param {Stripe.BillingPortal.SessionCreateParams} params - Parameters for creating a customer portal session.
   * @returns {Promise<Stripe.BillingPortal.Session>} - The created session.
   */
  createBillingPortalSession: async (
    params: Stripe.BillingPortal.SessionCreateParams
  ): Promise<Stripe.BillingPortal.Session> => {
    try {
      const session = await stripe.billingPortal.sessions.create(params);
      return session;
    } catch (error: any) {
      console.error('Error creating billing portal session:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a checkout session.
   * @param {Stripe.Checkout.SessionCreateParams} params - Parameters for creating a checkout session.
   * @returns {Promise<Stripe.Checkout.Session>} - The created session.
   */
  createCheckoutSession: async (
    params: Stripe.Checkout.SessionCreateParams
  ): Promise<Stripe.Checkout.Session> => {
    try {
      const session = await stripe.checkout.sessions.create(params);
      return session;
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a checkout session.
   * @param {string} sessionId - The ID of the checkout session to retrieve.
   * @returns {Promise<Stripe.Checkout.Session>} - The retrieved session.
   */
  getCheckoutSession: async (sessionId: string): Promise<Stripe.Checkout.Session> => {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return session;
    } catch (error: any) {
      console.error('Error retrieving checkout session:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a refund.
   * @param {Stripe.RefundCreateParams} params - Parameters for creating a refund.
   * @returns {Promise<Stripe.Refund>} - The created refund.
   */
  createRefund: async (params: Stripe.RefundCreateParams): Promise<Stripe.Refund> => {
    try {
      const refund = await stripe.refunds.create(params);
      return refund;
    } catch (error: any) {
      console.error('Error creating refund:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a refund.
   * @param {string} refundId - The ID of the refund to retrieve.
   * @returns {Promise<Stripe.Refund>} - The retrieved refund.
   */
  getRefund: async (refundId: string): Promise<Stripe.Refund> => {
    try {
      const refund = await stripe.refunds.retrieve(refundId);
      return refund;
    } catch (error: any) {
      console.error('Error retrieving refund:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Lists refunds.
   * @param {Stripe.RefundListParams} params - Parameters for listing refunds.
   * @returns {Promise<Stripe.ApiList<Stripe.Refund>>} - A list of refunds.
   */
  listRefunds: async (params?: Stripe.RefundListParams): Promise<Stripe.ApiList<Stripe.Refund>> => {
    try {
      const refunds = await stripe.refunds.list(params);
      return refunds;
    } catch (error: any) {
      console.error('Error listing refunds:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a dispute.
   * @param {Stripe.DisputeCreateParams} params - Parameters for creating a dispute.
   * @returns {Promise<Stripe.Dispute>} - The created dispute.
   */
  createDispute: async (params: Stripe.DisputeCreateParams): Promise<Stripe.Dispute> => {
    try {
      const dispute = await stripe.disputes.create(params);
      return dispute;
    } catch (error: any) {
      console.error('Error creating dispute:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a dispute.
   * @param {string} disputeId - The ID of the dispute to retrieve.
   * @returns {Promise<Stripe.Dispute>} - The retrieved dispute.
   */
  getDispute: async (disputeId: string): Promise<Stripe.Dispute> => {
    try {
      const dispute = await stripe.disputes.retrieve(disputeId);
      return dispute;
    } catch (error: any) {
      console.error('Error retrieving dispute:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Updates a dispute.
   * @param {string} disputeId - The ID of the dispute to update.
   * @param {Stripe.DisputeUpdateParams} params - Parameters for updating a dispute.
   * @returns {Promise<Stripe.Dispute>} - The updated dispute.
   */
  updateDispute: async (
    disputeId: string,
    params: Stripe.DisputeUpdateParams
  ): Promise<Stripe.Dispute> => {
    try {
      const dispute = await stripe.disputes.update(disputeId, params);
      return dispute;
    } catch (error: any) {
      console.error('Error updating dispute:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Closes a dispute.
   * @param {string} disputeId - The ID of the dispute to close.
   * @returns {Promise<Stripe.Dispute>} - The closed dispute.
   */
  closeDispute: async (disputeId: string): Promise<Stripe.Dispute> => {
    try {
      const dispute = await stripe.disputes.close(disputeId);
      return dispute;
    } catch (error: any) {
      console.error('Error closing dispute:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Lists disputes.
   * @param {Stripe.DisputeListParams} params - Parameters for listing disputes.
   * @returns {Promise<Stripe.ApiList<Stripe.Dispute>>} - A list of disputes.
   */
  listDisputes: async (
    params?: Stripe.DisputeListParams
  ): Promise<Stripe.ApiList<Stripe.Dispute>> => {
    try {
      const disputes = await stripe.disputes.list(params);
      return disputes;
    } catch (error: any) {
      console.error('Error listing disputes:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a payout.
   * @param {Stripe.PayoutCreateParams} params - Parameters for creating a payout.
   * @returns {Promise<Stripe.Payout>} - The created payout.
   */
  createPayout: async (params: Stripe.PayoutCreateParams): Promise<Stripe.Payout> => {
    try {
      const payout = await stripe.payouts.create(params);
      return payout;
    } catch (error: any) {
      console.error('Error creating payout:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a payout.
   * @param {string} payoutId - The ID of the payout to retrieve.
   * @returns {Promise<Stripe.Payout>} - The retrieved payout.
   */
  getPayout: async (payoutId: string): Promise<Stripe.Payout> => {
    try {
      const payout = await stripe.payouts.retrieve(payoutId);
      return payout;
    } catch (error: any) {
      console.error('Error retrieving payout:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Cancels a payout.
   * @param {string} payoutId - The ID of the payout to cancel.
   * @returns {Promise<Stripe.Payout>} - The cancelled payout.
   */
  cancelPayout: async (payoutId: string): Promise<Stripe.Payout> => {
    try {
      const payout = await stripe.payouts.cancel(payoutId);
      return payout;
    } catch (error: any) {
      console.error('Error cancelling payout:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Lists payouts.
   * @param {Stripe.PayoutListParams} params - Parameters for listing payouts.
   * @returns {Promise<Stripe.ApiList<Stripe.Payout>>} - A list of payouts.
   */
  listPayouts: async (
    params?: Stripe.PayoutListParams
  ): Promise<Stripe.ApiList<Stripe.Payout>> => {
    try {
      const payouts = await stripe.payouts.list(params);
      return payouts;
    } catch (error: any) {
      console.error('Error listing payouts:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a transfer.
   * @param {Stripe.TransferCreateParams} params - Parameters for creating a transfer.
   * @returns {Promise<Stripe.Transfer>} - The created transfer.
   */
  createTransfer: async (params: Stripe.TransferCreateParams): Promise<Stripe.Transfer> => {
    try {
      const transfer = await stripe.transfers.create(params);
      return transfer;
    } catch (error: any) {
      console.error('Error creating transfer:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a transfer.
   * @param {string} transferId - The ID of the transfer to retrieve.
   * @returns {Promise<Stripe.Transfer>} - The retrieved transfer.
   */
  getTransfer: async (transferId: string): Promise<Stripe.Transfer> => {
    try {
      const transfer = await stripe.transfers.retrieve(transferId);
      return transfer;
    } catch (error: any) {
      console.error('Error retrieving transfer:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Updates a transfer.
   * @param {string} transferId - The ID of the transfer to update.
   * @param {Stripe.TransferUpdateParams} params - Parameters for updating a transfer.
   * @returns {Promise<Stripe.Transfer>} - The updated transfer.
   */
  updateTransfer: async (
    transferId: string,
    params: Stripe.TransferUpdateParams
  ): Promise<Stripe.Transfer> => {
    try {
      const transfer = await stripe.transfers.update(transferId, params);
      return transfer;
    } catch (error: any) {
      console.error('Error updating transfer:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Lists transfers.
   * @param {Stripe.TransferListParams} params - Parameters for listing transfers.
   * @returns {Promise<Stripe.ApiList<Stripe.Transfer>>} - A list of transfers.
   */
  listTransfers: async (
    params?: Stripe.TransferListParams
  ): Promise<Stripe.ApiList<Stripe.Transfer>> => {
    try {
      const transfers = await stripe.transfers.list(params);
      return transfers;
    } catch (error: any) {
      console.error('Error listing transfers:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a transfer reversal.
   * @param {string} transferId - The ID of the transfer to reverse.
   * @param {Stripe.TransferReversalCreateParams} params - Parameters for creating a transfer reversal.
   * @returns {Promise<Stripe.TransferReversal>} - The created transfer reversal.
   */
  createTransferReversal: async (
    transferId: string,
    params: Stripe.TransferReversalCreateParams
  ): Promise<Stripe.TransferReversal> => {
    try {
      const transferReversal = await stripe.transferReversals.create(transferId, params);
      return transferReversal;
    } catch (error: any) {
      console.error('Error creating transfer reversal:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a transfer reversal.
   * @param {string} transferId - The ID of the transfer.
   * @param {string} reversalId - The ID of the transfer reversal to retrieve.
   * @returns {Promise<Stripe.TransferReversal>} - The retrieved transfer reversal.
   */
  getTransferReversal: async (transferId: string, reversalId: string): Promise<Stripe.TransferReversal> => {
    try {
      const transferReversal = await stripe.transferReversals.retrieve(reversalId, {transfer: transferId});
      return transferReversal;
    } catch (error: any) {
      console.error('Error retrieving transfer reversal:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Updates a transfer reversal.
   * @param {string} transferId - The ID of the transfer.
   * @param {string} reversalId - The ID of the transfer reversal to update.
   * @param {Stripe.TransferReversalUpdateParams} params - Parameters for updating a transfer reversal.
   * @returns {Promise<Stripe.TransferReversal>} - The updated transfer reversal.
   */
  updateTransferReversal: async (
    transferId: string,
    reversalId: string,
    params: Stripe.TransferReversalUpdateParams
  ): Promise<Stripe.TransferReversal> => {
    try {
      const transferReversal = await stripe.transferReversals.update(reversalId, params, {transfer: transferId});
      return transferReversal;
    } catch (error: any) {
      console.error('Error updating transfer reversal:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Lists transfer reversals.
   * @param {string} transferId - The ID of the transfer.
   * @param {Stripe.TransferReversalListParams} params - Parameters for listing transfer reversals.
   * @returns {Promise<Stripe.ApiList<Stripe.TransferReversal>>} - A list of transfer reversals.
   */
  listTransferReversals: async (
    transferId: string,
    params?: Stripe.TransferReversalListParams
  ): Promise<Stripe.ApiList<Stripe.TransferReversal>> => {
    try {
      const transferReversals = await stripe.transferReversals.list({transfer: transferId, ...params});
      return transferReversals;
    } catch (error: any) {
      console.error('Error listing transfer reversals:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a topup.
   * @param {Stripe.TopupCreateParams} params - Parameters for creating a topup.
   * @returns {Promise<Stripe.Topup>} - The created topup.
   */
  createTopup: async (params: Stripe.TopupCreateParams): Promise<Stripe.Topup> => {
    try {
      const topup = await stripe.topups.create(params);
      return topup;
    } catch (error: any) {
      console.error('Error creating topup:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Retrieves a topup.
   * @param {string} topupId - The ID of the topup to retrieve.
   * @returns {Promise<Stripe.Topup>} - The retrieved topup.
   */
  getTopup: async (topupId: string): Promise<Stripe.Topup> => {
    try {
      const topup = await stripe.topups.retrieve(topupId);
      return topup;
    } catch (error: any) {
      console.error('Error retrieving topup:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Updates a topup.
   * @param {string} topupId - The ID of the topup to update.
   * @param {Stripe.TopupUpdateParams} params - Parameters for updating a topup.
   * @returns {Promise<Stripe.Topup>} - The updated topup.
   */
  updateTopup: async (
    topupId: string,
    params: Stripe.TopupUpdateParams
  ): Promise<Stripe.Topup> => {
    try {
      const topup = await stripe.topups.update(topupId, params);
      return topup;
    } catch (error: any) {
      console.error('Error updating topup:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Cancels a topup.
   * @param {string} topupId - The ID of the topup to cancel.
   * @returns {Promise<Stripe.Topup>} - The cancelled topup.
   */
  cancelTopup: async (topupId: string): Promise<Stripe.Topup> => {
    try {
      const topup = await stripe.topups.cancel(topupId);
      return topup;
    } catch (error: any) {
      console.error('Error cancelling topup:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Lists topups.
   * @param {Stripe.TopupListParams} params - Parameters for listing topups.
   * @returns {Promise<Stripe.ApiList<Stripe.Topup>>} - A list of topups.
   */
  listTopups: async (params?: Stripe.TopupListParams): Promise<Stripe.ApiList<Stripe.Topup>> => {
    try {
      const topups = await stripe.topups.list(params);
      return topups;
    } catch (error: any) {
      console.error('Error listing topups:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Creates a tax rate.
   * @param {Stripe.TaxRateCreateParams} params - Parameters for creating a tax rate.
   * @returns {Promise<Stripe