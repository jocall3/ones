import axios from 'axios';

// In a real-world application, these would come from a secure configuration source
// or environment variables (e.g., process.env.REACT_APP_CITIBANK_API_URL).
const CITIBANK_API_BASE_URL = 'https://sandbox.apihub.citi.com/gcb/api';
const CITIBANK_CLIENT_ID = process.env.REACT_APP_CITIBANK_CLIENT_ID || 'your-client-id-here';

/**
 * =============================================================================
 * Type Definitions for Citibank API
 * =============================================================================
 * These are representative types. In a real project, they should match the
 * official Citibank API specification.
 */

export interface CitibankAccount {
  accountId: string;
  displayAccountNumber: string;
  currencyCode: string;
  currentBalance: number;
  productName: string;
  accountStatus: 'ACTIVE' | 'DORMANT' | 'CLOSED';
}

export interface AccountTransaction {
  transactionId: string;
  transactionDate: string;
  transactionDescription: string;
  transactionAmount: number;
  currencyCode: string;
  creditDebitIndicator: 'CREDIT' | 'DEBIT';
}

export interface Payee {
  payeeId: string;
  payeeName: string;
  payeeNickName: string;
  payeeType: 'INTERNAL' | 'DOMESTIC' | 'INTERNATIONAL';
}

export interface PaymentInitiationPayload {
  sourceAccountId: string;
  payeeId: string;
  transferAmount: number;
  transferCurrencyCode: string;
  chargeBearer: 'BENEFICIARY' | 'OUR' | 'SHARED';
  paymentMethod: 'GIRO' | 'INSTANTPAY' | 'TELEGRAPHIC_TRANSFER';
}

export interface PaymentInitiationResponse {
  transactionReferenceId: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  message?: string;
}

/**
 * =============================================================================
 * Axios API Client Configuration
 * =============================================================================
 * A dedicated axios instance for all Citibank API communications.
 * It includes an interceptor to dynamically add the Authorization header.
 */

const citibankApiClient = axios.create({
  baseURL: CITIBANK_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'client_id': CITIBANK_CLIENT_ID,
  },
});

// Interceptor to add the OAuth token to every request
citibankApiClient.interceptors.request.use(
  (config) => {
    // In a real app, the token would be retrieved from a secure state management
    // solution or context (e.g., AuthContext, Redux store).
    const token = localStorage.getItem('citibank_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * =============================================================================
 * API Service Methods
 * =============================================================================
 * A collection of functions that map to specific Citibank API endpoints.
 */

/**
 * Fetches a list of all accounts associated with the authenticated user.
 */
const getAccounts = async (): Promise<CitibankAccount[]> => {
  try {
    const response = await citibankApiClient.get('/v1/accounts');
    // The actual response structure may vary. Adjust `response.data.accounts` as needed.
    return response.data.accounts || [];
  } catch (error) {
    console.error('Citibank API Error: Failed to fetch accounts.', error);
    throw error;
  }
};

/**
 * Fetches detailed information for a single account.
 * @param accountId The unique identifier for the account.
 */
const getAccountDetails = async (accountId: string): Promise<CitibankAccount> => {
  if (!accountId) throw new Error('accountId is required.');
  try {
    const response = await citibankApiClient.get(`/v1/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error(`Citibank API Error: Failed to fetch details for account ${accountId}.`, error);
    throw error;
  }
};

/**
 * Fetches the transaction history for a specific account.
 * @param accountId The unique identifier for the account.
 * @param nextStartIndex Optional token for pagination.
 */
const getAccountTransactions = async (accountId: string, nextStartIndex?: string): Promise<AccountTransaction[]> => {
  if (!accountId) throw new Error('accountId is required.');
  try {
    const params = nextStartIndex ? { nextStartIndex } : {};
    const response = await citibankApiClient.get(`/v1/accounts/${accountId}/transactions`, { params });
    // The actual response structure may vary.
    return response.data.transactions || [];
  } catch (error) {
    console.error(`Citibank API Error: Failed to fetch transactions for account ${accountId}.`, error);
    throw error;
  }
};

/**
 * Fetches the list of pre-registered payees for the user.
 */
const getPayees = async (): Promise<Payee[]> => {
  try {
    const response = await citibankApiClient.get('/v1/payees');
    return response.data.payees || [];
  } catch (error) {
    console.error('Citibank API Error: Failed to fetch payees.', error);
    throw error;
  }
};

/**
 * Initiates a money transfer to a pre-registered payee.
 * @param payload The details of the payment to be made.
 */
const initiatePayment = async (payload: PaymentInitiationPayload): Promise<PaymentInitiationResponse> => {
  try {
    const response = await citibankApiClient.post('/v1/money-movement/payments', payload);
    return response.data;
  } catch (error) {
    console.error('Citibank API Error: Payment initiation failed.', error);
    throw error;
  }
};

/**
 * Checks the user's eligibility for a specific financial product.
 * @param productCode The code of the product to check (e.g., 'PERSONAL_LOAN').
 */
const checkProductEligibility = async (productCode: string): Promise<{ isEligible: boolean }> => {
  try {
    const response = await citibankApiClient.post('/v1/products/eligibility', { productCode });
    return response.data;
  } catch (error) {
    console.error(`Citibank API Error: Failed to check eligibility for product ${productCode}.`, error);
    throw error;
  }
};

/**
 * =============================================================================
 * Exported API Service
 * =============================================================================
 * A single object containing all the service methods for easy importation
 * and use throughout the application.
 */
export const citibankApi = {
  getAccounts,
  getAccountDetails,
  getAccountTransactions,
  getPayees,
  initiatePayment,
  checkProductEligibility,
};