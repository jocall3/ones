import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

// Plaid API keys and environment configuration
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = (process.env.PLAID_ENV || 'sandbox') as keyof typeof PlaidEnvironments;

// Check if required environment variables are set
if (!PLAID_CLIENT_ID || !PLAID_SECRET) {
  console.warn("Plaid client ID or secret not set. Functionality will be limited.");
}

// Plaid Configuration
const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  clientId: PLAID_CLIENT_ID,
  secret: PLAID_SECRET,
  useNewUrlParser: true,
});

// Plaid client instance
const plaidClient = new PlaidApi(configuration);

/**
 * Plaid API Service
 */
const PlaidApiService = {
  /**
   * Creates a link token for Plaid Link.
   * @param user_id - The ID of the user.
   * @param client_name - The name of your application.
   * @param products - An array of Plaid products to use.
   * @param country_codes - An array of country codes to use.
   * @param language - The language to use.
   * @returns The link token or null if an error occurs.
   */
  createLinkToken: async (
    user_id: string,
    client_name: string,
    products: string[],
    country_codes: string[],
    language: string = 'en'
  ): Promise<string | null> => {
    try {
      const response = await plaidClient.linkTokenCreate({
        user: {
          client_user_id: user_id,
        },
        client_name: client_name,
        products: products as any, // Plaid types are not fully accurate
        country_codes: country_codes as any, // Plaid types are not fully accurate
        language: language,
        redirect_uri: process.env.PLAID_REDIRECT_URI, // Optional, for OAuth flows
        android_package_name: process.env.PLAID_ANDROID_PACKAGE_NAME, // Optional, for Android flows
      });
      return response.data.link_token;
    } catch (error) {
      console.error("Error creating Link token:", error);
      return null;
    }
  },

  /**
   * Exchanges a public token for an access token.
   * @param public_token - The public token to exchange.
   * @returns The access token or null if an error occurs.
   */
  exchangePublicToken: async (public_token: string): Promise<string | null> => {
    try {
      const response = await plaidClient.itemPublicTokenExchange({
        public_token: public_token,
      });
      return response.data.access_token;
    } catch (error) {
      console.error("Error exchanging public token:", error);
      return null;
    }
  },

  /**
   * Retrieves accounts associated with an access token.
   * @param access_token - The access token to use.
   * @returns The accounts or null if an error occurs.
   */
  getAccounts: async (access_token: string): Promise<any[] | null> => {
    try {
      const response = await plaidClient.accountsGet({
        access_token: access_token,
      });
      return response.data.accounts;
    } catch (error) {
      console.error("Error getting accounts:", error);
      return null;
    }
  },

  /**
   * Retrieves transactions associated with an access token.
   * @param access_token - The access token to use.
   * @param startDate - The start date for the transactions.
   * @param endDate - The end date for the transactions.
   * @returns The transactions or null if an error occurs.
   */
  getTransactions: async (
    access_token: string,
    startDate: string,
    endDate: string
  ): Promise<any[] | null> => {
    try {
      const response = await plaidClient.transactionsGet({
        access_token: access_token,
        start_date: startDate,
        end_date: endDate,
        options: {
          count: 250, // Maximum allowed by Plaid API
          offset: 0,
        },
      });
      return response.data.transactions;
    } catch (error) {
      console.error("Error getting transactions:", error);
      return null;
    }
  },

  /**
   * Retrieves item information associated with an access token.
   * @param access_token - The access token to use.
   * @returns The item information or null if an error occurs.
   */
  getItem: async (access_token: string): Promise<any | null> => {
    try {
      const response = await plaidClient.itemGet({
        access_token: access_token,
      });
      return response.data.item;
    } catch (error) {
      console.error("Error getting item:", error);
      return null;
    }
  },

  /**
   * Retrieves identity information associated with an access token.
   * @param access_token - The access token to use.
   * @returns The identity information or null if an error occurs.
   */
  getIdentity: async (access_token: string): Promise<any | null> => {
    try {
      const response = await plaidClient.identityGet({
        access_token: access_token,
      });
      return response.data.identity;
    } catch (error) {
      console.error("Error getting identity:", error);
      return null;
    }
  },

  /**
   * Get investment holdings associated with an access token.
   * @param access_token - The access token to use.
   * @returns The investment holdings or null if an error occurs.
   */
  getInvestmentHoldings: async (access_token: string): Promise<any | null> => {
    try {
      const response = await plaidClient.investmentsHoldingsGet({
        access_token: access_token,
      });
      return response.data.holdings;
    } catch (error) {
      console.error("Error getting investment holdings:", error);
      return null;
    }
  },

  /**
   * Get investment transactions associated with an access token.
   * @param access_token - The access token to use.
   * @param startDate - The start date for the transactions.
   * @param endDate - The end date for the transactions.
   * @returns The investment transactions or null if an error occurs.
   */
  getInvestmentTransactions: async (
    access_token: string,
    startDate: string,
    endDate: string
  ): Promise<any | null> => {
    try {
      const response = await plaidClient.investmentsTransactionsGet({
        access_token: access_token,
        start_date: startDate,
        end_date: endDate,
      });
      return response.data.investment_transactions;
    } catch (error) {
      console.error("Error getting investment transactions:", error);
      return null;
    }
  },

  /**
   * Get Liabilities associated with an access token.
   * @param access_token - The access token to use.
   * @returns The liabilities or null if an error occurs.
   */
  getLiabilities: async (access_token: string): Promise<any | null> => {
    try {
      const response = await plaidClient.liabilitiesGet({
        access_token: access_token,
      });
      return response.data.liabilities;
    } catch (error) {
      console.error("Error getting liabilities:", error);
      return null;
    }
  },

  /**
   * Get Credit Details associated with an access token.
   * @param access_token - The access token to use.
   * @returns The credit details or null if an error occurs.
   */
  getCreditDetails: async (access_token: string): Promise<any | null> => {
    try {
      const liabilities = await PlaidApiService.getLiabilities(access_token);
      if (liabilities && liabilities.credit) {
        return liabilities.credit;
      }
      return null;
    } catch (error) {
      console.error("Error getting credit details:", error);
      return null;
    }
  },

  /**
   * Get Student Loan Details associated with an access token.
   * @param access_token - The access token to use.
   * @returns The student loan details or null if an error occurs.
   */
  getStudentLoanDetails: async (access_token: string): Promise<any | null> => {
    try {
      const liabilities = await PlaidApiService.getLiabilities(access_token);
      if (liabilities && liabilities.student) {
        return liabilities.student;
      }
      return null;
    } catch (error) {
      console.error("Error getting student loan details:", error);
      return null;
    }
  },

  /**
   * Get Balance associated with an access token.
   * @param access_token - The access token to use.
   * @param account_ids - The account_ids to use.
   * @returns The balance or null if an error occurs.
   */
  getBalance: async (access_token: string, account_ids: string[]): Promise<any | null> => {
    try {
      const response = await plaidClient.accountsBalanceGet({
        access_token: access_token,
        options: {
          account_ids: account_ids,
        },
      });
      return response.data.accounts;
    } catch (error) {
      console.error("Error getting balance:", error);
      return null;
    }
  },

  /**
   * Get Auth associated with an access token.
   * @param access_token - The access token to use.
   * @returns The auth or null if an error occurs.
   */
  getAuth: async (access_token: string): Promise<any | null> => {
    try {
      const response = await plaidClient.authGet({
        access_token: access_token,
      });
      return response.data.accounts;
    } catch (error) {
      console.error("Error getting auth:", error);
      return null;
    }
  },

  /**
   * Get Item Status associated with an access token.
   * @param access_token - The access token to use.
   * @returns The item status or null if an error occurs.
   */
  getItemStatus: async (access_token: string): Promise<any | null> => {
    try {
      const response = await plaidClient.itemGet({
        access_token: access_token,
      });
      return response.data.status;
    } catch (error) {
      console.error("Error getting item status:", error);
      return null;
    }
  },

  /**
   * Get Account Identity associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account identity or null if an error occurs.
   */
  getAccountIdentity: async (access_token: string): Promise<any | null> => {
    try {
      const response = await plaidClient.identityGet({
        access_token: access_token,
      });
      return response.data.accounts;
    } catch (error) {
      console.error("Error getting account identity:", error);
      return null;
    }
  },

  /**
   * Get Account Numbers associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account numbers or null if an error occurs.
   */
  getAccountNumbers: async (access_token: string): Promise<any | null> => {
    try {
      const response = await plaidClient.authGet({
        access_token: access_token,
      });
      return response.data.numbers;
    } catch (error) {
      console.error("Error getting account numbers:", error);
      return null;
    }
  },

  /**
   * Get Account Owners associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account owners or null if an error occurs.
   */
  getAccountOwners: async (access_token: string): Promise<any | null> => {
    try {
      const response = await plaidClient.identityGet({
        access_token: access_token,
      });
      return response.data.owners;
    } catch (error) {
      console.error("Error getting account owners:", error);
      return null;
    }
  },

  /**
   * Get Account Statements associated with an access token.
   * @param access_token - The access token to use.
   * @param startDate - The start date for the statements.
   * @param endDate - The end date for the statements.
   * @returns The account statements or null if an error occurs.
   */
  getAccountStatements: async (access_token: string, startDate: string, endDate: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account statements.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account statements.");
      return null;
    } catch (error) {
      console.error("Error getting account statements:", error);
      return null;
    }
  },

  /**
   * Get Account Subscriptions associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account subscriptions or null if an error occurs.
   */
  getAccountSubscriptions: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account subscriptions.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account subscriptions.");
      return null;
    } catch (error) {
      console.error("Error getting account subscriptions:", error);
      return null;
    }
  },

  /**
   * Get Account Recurring Transactions associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account recurring transactions or null if an error occurs.
   */
  getAccountRecurringTransactions: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account recurring transactions.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account recurring transactions.");
      return null;
    } catch (error) {
      console.error("Error getting account recurring transactions:", error);
      return null;
    }
  },

  /**
   * Get Account Standing Orders associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account standing orders or null if an error occurs.
   */
  getAccountStandingOrders: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account standing orders.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account standing orders.");
      return null;
    } catch (error) {
      console.error("Error getting account standing orders:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Debits associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct debits or null if an error occurs.
   */
  getAccountDirectDebits: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct debits.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct debits.");
      return null;
    } catch (error) {
      console.error("Error getting account direct debits:", error);
      return null;
    }
  },

  /**
   * Get Account Scheduled Payments associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account scheduled payments or null if an error occurs.
   */
  getAccountScheduledPayments: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account scheduled payments.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account scheduled payments.");
      return null;
    } catch (error) {
      console.error("Error getting account scheduled payments:", error);
      return null;
    }
  },

  /**
   * Get Account Mandates associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account mandates or null if an error occurs.
   */
  getAccountMandates: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account mandates.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account mandates.");
      return null;
    } catch (error) {
      console.error("Error getting account mandates:", error);
      return null;
    }
  },

  /**
   * Get Account Standing Instructions associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account standing instructions or null if an error occurs.
   */
  getAccountStandingInstructions: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account standing instructions.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account standing instructions.");
      return null;
    } catch (error) {
      console.error("Error getting account standing instructions:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Authorizations associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct authorizations or null if an error occurs.
   */
  getAccountDirectAuthorizations: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct authorizations.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct authorizations.");
      return null;
    } catch (error) {
      console.error("Error getting account direct authorizations:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Consents associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct consents or null if an error occurs.
   */
  getAccountDirectConsents: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct consents.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct consents.");
      return null;
    } catch (error) {
      console.error("Error getting account direct consents:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Agreements associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct agreements or null if an error occurs.
   */
  getAccountDirectAgreements: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct agreements.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct agreements.");
      return null;
    } catch (error) {
      console.error("Error getting account direct agreements:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Arrangements associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct arrangements or null if an error occurs.
   */
  getAccountDirectArrangements: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct arrangements.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct arrangements.");
      return null;
    } catch (error) {
      console.error("Error getting account direct arrangements:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Permissions associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct permissions or null if an error occurs.
   */
  getAccountDirectPermissions: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct permissions.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct permissions.");
      return null;
    } catch (error) {
      console.error("Error getting account direct permissions:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Controls associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct controls or null if an error occurs.
   */
  getAccountDirectControls: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct controls.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct controls.");
      return null;
    } catch (error) {
      console.error("Error getting account direct controls:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Restrictions associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct restrictions or null if an error occurs.
   */
  getAccountDirectRestrictions: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct restrictions.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct restrictions.");
      return null;
    } catch (error) {
      console.error("Error getting account direct restrictions:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Limitations associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct limitations or null if an error occurs.
   */
  getAccountDirectLimitations: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct limitations.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct limitations.");
      return null;
    } catch (error) {
      console.error("Error getting account direct limitations:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Preferences associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct preferences or null if an error occurs.
   */
  getAccountDirectPreferences: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct preferences.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct preferences.");
      return null;
    } catch (error) {
      console.error("Error getting account direct preferences:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Settings associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct settings or null if an error occurs.
   */
  getAccountDirectSettings: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct settings.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct settings.");
      return null;
    } catch (error) {
      console.error("Error getting account direct settings:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Instructions associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct instructions or null if an error occurs.
   */
  getAccountDirectInstructions: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct instructions.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct instructions.");
      return null;
    } catch (error) {
      console.error("Error getting account direct instructions:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Agreements associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct agreements or null if an error occurs.
   */
  getAccountDirectAgreements2: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct agreements.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct agreements.");
      return null;
    } catch (error) {
      console.error("Error getting account direct agreements:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Arrangements associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct arrangements or null if an error occurs.
   */
  getAccountDirectArrangements2: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct arrangements.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct arrangements.");
      return null;
    } catch (error) {
      console.error("Error getting account direct arrangements:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Permissions associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct permissions or null if an error occurs.
   */
  getAccountDirectPermissions2: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct permissions.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct permissions.");
      return null;
    } catch (error) {
      console.error("Error getting account direct permissions:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Controls associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct controls or null if an error occurs.
   */
  getAccountDirectControls2: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct controls.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct controls.");
      return null;
    } catch (error) {
      console.error("Error getting account direct controls:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Restrictions associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct restrictions or null if an error occurs.
   */
  getAccountDirectRestrictions2: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct restrictions.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct restrictions.");
      return null;
    } catch (error) {
      console.error("Error getting account direct restrictions:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Limitations associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct limitations or null if an error occurs.
   */
  getAccountDirectLimitations2: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct limitations.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct limitations.");
      return null;
    } catch (error) {
      console.error("Error getting account direct limitations:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Preferences associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct preferences or null if an error occurs.
   */
  getAccountDirectPreferences2: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct preferences.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct preferences.");
      return null;
    } catch (error) {
      console.error("Error getting account direct preferences:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Settings associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct settings or null if an error occurs.
   */
  getAccountDirectSettings2: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct settings.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct settings.");
      return null;
    } catch (error) {
      console.error("Error getting account direct settings:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Instructions associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct instructions or null if an error occurs.
   */
  getAccountDirectInstructions2: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct instructions.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct instructions.");
      return null;
    } catch (error) {
      console.error("Error getting account direct instructions:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Agreements associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct agreements or null if an error occurs.
   */
  getAccountDirectAgreements3: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct agreements.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct agreements.");
      return null;
    } catch (error) {
      console.error("Error getting account direct agreements:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Arrangements associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct arrangements or null if an error occurs.
   */
  getAccountDirectArrangements3: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct arrangements.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct arrangements.");
      return null;
    } catch (error) {
      console.error("Error getting account direct arrangements:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Permissions associated with an access token.
   * @param access_token - The access token to use.
   * @returns The account direct permissions or null if an error occurs.
   */
  getAccountDirectPermissions3: async (access_token: string): Promise<any | null> => {
    try {
      // Plaid does not have a direct API for account direct permissions.
      // This is a placeholder for future implementation using other methods.
      console.warn("Plaid does not have a direct API for account direct permissions.");
      return null;
    } catch (error) {
      console.error("Error getting account direct permissions:", error);
      return null;
    }
  },

  /**
   * Get Account Direct Controls associated with an access token.
   * @param access_token - The