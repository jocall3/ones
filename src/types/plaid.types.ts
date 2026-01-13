// src/types/plaid.types.ts

export interface PlaidLinkTokenCreateResponse {
  link_token: string;
  expiration: string;
  request_id: string;
}

export interface PlaidPublicTokenExchangeResponse {
  access_token: string;
  item_id: string;
  request_id: string;
}

export interface PlaidAccount {
  account_id: string;
  balances: PlaidBalance;
  mask: string | null;
  name: string;
  official_name: string | null;
  subtype: string;
  type: string;
}

export interface PlaidBalance {
  available: number | null;
  current: number | null;
  iso_currency_code: string;
  limit: number | null;
  unofficial_currency_code: string | null;
}

export interface PlaidItem {
  item_id: string;
  institution_id: string;
  webhook: string;
  error: string | null;
}

export interface PlaidInstitution {
  institution_id: string;
  name: string;
  products: string[];
  country_codes: string[];
}

export interface PlaidTransaction {
  account_id: string;
  account_owner: string | null;
  amount: number;
  iso_currency_code: string;
  unofficial_currency_code: string | null;
  category: string[];
  category_id: string;
  date: string;
  location: PlaidLocation;
  name: string;
  merchant_name: string | null;
  payment_meta: PlaidPaymentMeta;
  pending: boolean;
  pending_transaction_id: string | null;
  transaction_id: string;
  transaction_type: string;
}

export interface PlaidLocation {
  address: string | null;
  city: string | null;
  country: string | null;
  lat: number | null;
  lon: number | null;
  postal_code: string | null;
  region: string | null;
  store_number: string | null;
}

export interface PlaidPaymentMeta {
  by_order_of: string | null;
  payment_method: string | null;
  payer: string | null;
  ppd_id: string | null;
  reason: string | null;
  reference_number: string | null;
}

export interface PlaidIdentity {
  accounts: PlaidAccount[];
  item: PlaidItem;
  request_id: string;
}

export interface PlaidOwner {
  addresses: PlaidAddress[];
  emails: PlaidEmail[];
  names: string[];
  phone_numbers: PlaidPhoneNumber[];
}

export interface PlaidAddress {
  data: PlaidAddressData;
  primary: boolean | null;
}

export interface PlaidAddressData {
  city: string | null;
  country: string | null;
  postal_code: string | null;
  region: string | null;
  street: string | null;
}

export interface PlaidEmail {
  data: string;
  primary: boolean | null;
  type: string;
}

export interface PlaidPhoneNumber {
  data: string;
  primary: boolean | null;
  type: string;
}

export interface PlaidError {
  error_type: string;
  error_code: string;
  error_message: string;
  display_message: string | null;
  request_id: string | null;
  suggested_action: string | null;
}

export interface PlaidWebhook {
  webhook_type: string;
  webhook_code: string;
  item_id: string;
  error?: PlaidError;
  new_transactions?: number;
  // Add other webhook fields as needed based on Plaid's documentation
}