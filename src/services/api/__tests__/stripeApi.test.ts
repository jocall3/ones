import { getStripeData } from '../stripeApi';
import { mockStripeBalance, mockStripeCharges, mockStripeCustomers, mockStripePayouts, mockStripeProducts, mockStripeSubscriptions } from './mockStripeData';
import { Stripe } from 'stripe';

// Mock the Stripe library
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    balance: {
      retrieve: jest.fn().mockResolvedValue(mockStripeBalance),
    },
    charges: {
      list: jest.fn().mockResolvedValue({ data: mockStripeCharges }),
    },
    customers: {
      list: jest.fn().mockResolvedValue({ data: mockStripeCustomers }),
    },
    payouts: {
      list: jest.fn().mockResolvedValue({ data: mockStripePayouts }),
    },
    products: {
      list: jest.fn().mockResolvedValue({ data: mockStripeProducts }),
    },
    subscriptions: {
      list: jest.fn().mockResolvedValue({ data: mockStripeSubscriptions }),
    },
  }));
});

describe('Stripe API Service', () => {
  const mockStripeSecretKey = 'sk_test_123';

  it('should retrieve and transform Stripe data correctly', async () => {
    const stripeData = await getStripeData(mockStripeSecretKey);

    expect(Stripe).toHaveBeenCalledWith(mockStripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    expect(stripeData).toEqual({
      balance: {
        available: mockStripeBalance.available,
        connectReserved: mockStripeBalance.connect_reserved,
        livemode: mockStripeBalance.livemode,
        pending: mockStripeBalance.pending,
      },
      charges: mockStripeCharges.map(charge => ({
        id: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        created: charge.created,
        status: charge.status,
      })),
      customers: mockStripeCustomers.map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        created: customer.created,
      })),
      payouts: mockStripePayouts.map(payout => ({
        id: payout.id,
        amount: payout.amount,
        currency: payout.currency,
        created: payout.created,
        status: payout.status,
      })),
      products: mockStripeProducts.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        created: product.created,
      })),
      subscriptions: mockStripeSubscriptions.map(subscription => ({
        id: subscription.id,
        status: subscription.status,
        created: subscription.created,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
      })),
    });
  });

  it('should handle errors when retrieving Stripe data', async () => {
    (Stripe as jest.Mock).mockImplementationOnce(() => ({
      balance: {
        retrieve: jest.fn().mockRejectedValue(new Error('Failed to retrieve balance')),
      },
      charges: {
        list: jest.fn().mockResolvedValue({ data: mockStripeCharges }),
      },
      customers: {
        list: jest.fn().mockResolvedValue({ data: mockStripeCustomers }),
      },
      payouts: {
        list: jest.fn().mockResolvedValue({ data: mockStripePayouts }),
      },
      products: {
        list: jest.fn().mockResolvedValue({ data: mockStripeProducts }),
      },
      subscriptions: {
        list: jest.fn().mockResolvedValue({ data: mockStripeSubscriptions }),
      },
    }));

    await expect(getStripeData(mockStripeSecretKey)).rejects.toThrow('Failed to retrieve balance');
  });
});