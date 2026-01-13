// src/services/webhooks/handlers/plaidWebhookHandler.ts

import { Request, Response } from 'express';
import { PlaidClient } from 'plaid';
import { PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV } from '../../../constants';

const plaidClient = new PlaidClient({
  clientId: PLAID_CLIENT_ID,
  secret: PLAID_SECRET,
  env: PLAID_ENV,
});

interface PlaidWebhookRequest extends Request {
  body: {
    webhook_type: string;
    webhook_code: string;
    item_id: string;
    error?: {
      error_type: string;
      error_code: string;
      error_message: string;
    };
    new_transactions?: number;
  };
}

export const plaidWebhookHandler = async (req: PlaidWebhookRequest, res: Response) => {
  const { webhook_type, webhook_code, item_id } = req.body;

  console.log(`Received Plaid webhook: type=${webhook_type}, code=${webhook_code}, item_id=${item_id}`);

  try {
    switch (webhook_type) {
      case 'ITEM':
        await handleItemWebhook(req.body);
        break;
      case 'TRANSACTIONS':
        await handleTransactionsWebhook(req.body);
        break;
      case 'AUTH':
        await handleAuthWebhook(req.body);
        break;
      default:
        console.warn(`Unhandled Plaid webhook type: ${webhook_type}`);
        return res.status(200).json({ status: 'ok', message: `Unhandled webhook type: ${webhook_type}` });
    }

    return res.status(200).json({ status: 'ok', message: 'Webhook processed successfully' });

  } catch (error: any) {
    console.error('Error processing Plaid webhook:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to process webhook', error: error.message });
  }
};

async function handleItemWebhook(body: PlaidWebhookRequest['body']) {
  const { webhook_code, item_id, error } = body;

  switch (webhook_code) {
    case 'ERROR':
      console.error(`Plaid ITEM webhook ERROR for item_id ${item_id}:`, error);
      // TODO: Implement error handling, potentially disabling the item or alerting the user.
      break;
    case 'PENDING_EXPIRATION':
      console.warn(`Plaid ITEM webhook PENDING_EXPIRATION for item_id ${item_id}`);
      // TODO: Implement logic to proactively refresh the item before expiration.
      break;
    case 'WEBHOOK_UPDATE_SUCCEEDED':
      console.log(`Plaid ITEM webhook WEBHOOK_UPDATE_SUCCEEDED for item_id ${item_id}`);
      // TODO: Log the webhook update event.
      break;
    case 'WEBHOOK_UPDATE_FAILED':
      console.error(`Plaid ITEM webhook WEBHOOK_UPDATE_FAILED for item_id ${item_id}:`, error);
      // TODO: Implement retry logic or alert the user.
      break;
    case 'ITEM_LOGIN_REQUIRED':
      console.warn(`Plaid ITEM webhook ITEM_LOGIN_REQUIRED for item_id ${item_id}`);
      // TODO: Implement logic to prompt the user to re-authenticate.
      break;
    case 'NEW_ACCOUNTS_AVAILABLE':
      console.log(`Plaid ITEM webhook NEW_ACCOUNTS_AVAILABLE for item_id ${item_id}`);
      // TODO: Implement logic to fetch and process the new accounts.
      break;
    default:
      console.warn(`Unhandled Plaid ITEM webhook code: ${webhook_code}`);
  }
}

async function handleTransactionsWebhook(body: PlaidWebhookRequest['body']) {
  const { webhook_code, item_id, new_transactions } = body;

  switch (webhook_code) {
    case 'DEFAULT_UPDATE':
      console.log(`Plaid TRANSACTIONS webhook DEFAULT_UPDATE for item_id ${item_id}, new_transactions=${new_transactions}`);
      // TODO: Fetch and process the new transactions.
      try {
        const { added, modified, removed } = await plaidClient.getTransactions(
          item_id,
          '2023-01-01', // Replace with your desired start date
          new Date().toISOString().slice(0, 10), // Today's date
          {
            count: new_transactions,
          }
        );

        console.log(`Fetched ${added.length} added, ${modified.length} modified, and ${removed.length} removed transactions.`);
        // TODO: Save the transactions to your database.
      } catch (error) {
        console.error("Error fetching transactions after webhook:", error);
        // TODO: Handle the error appropriately (retry, alert, etc.)
      }
      break;
    case 'INITIAL_UPDATE':
      console.log(`Plaid TRANSACTIONS webhook INITIAL_UPDATE for item_id ${item_id}, new_transactions=${new_transactions}`);
      // TODO: Fetch and process the initial transactions.
      break;
    case 'HISTORICAL_UPDATE':
      console.log(`Plaid TRANSACTIONS webhook HISTORICAL_UPDATE for item_id ${item_id}, new_transactions=${new_transactions}`);
      // TODO: Fetch and process the historical transactions.
      break;
    case 'TRANSACTIONS_REMOVED':
      console.log(`Plaid TRANSACTIONS webhook TRANSACTIONS_REMOVED for item_id ${item_id}`);
      // TODO: Handle removed transactions.
      break;
    default:
      console.warn(`Unhandled Plaid TRANSACTIONS webhook code: ${webhook_code}`);
  }
}

async function handleAuthWebhook(body: PlaidWebhookRequest['body']) {
  const { webhook_code, item_id } = body;

  switch (webhook_code) {
    case 'AUTH_UPDATE':
      console.log(`Plaid AUTH webhook AUTH_UPDATE for item_id ${item_id}`);
      // TODO: Implement logic to refetch and update the auth details.
      try {
        const authGetResponse = await plaidClient.getAuth(item_id);
        console.log("Auth details updated:", authGetResponse.data);
        // TODO: Update your database with the new auth details.
      } catch (error) {
        console.error("Error fetching auth details after webhook:", error);
        // TODO: Handle the error appropriately.
      }
      break;
    default:
      console.warn(`Unhandled Plaid AUTH webhook code: ${webhook_code}`);
  }
}