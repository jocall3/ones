export interface ModernTreasuryAccount {
  id: string;
  object: "account";
  account_details: ModernTreasuryAccountDetail[];
  account_type: "checking" | "savings" | "other";
  created_at: string;
  ledger_account_id: string | null;
  live_mode: boolean;
  name: string;
  party_address: ModernTreasuryAddress;
  party_name: string;
  party_type: "individual" | "business";
  routing_details: ModernTreasuryRoutingDetail[];
  updated_at: string;
}

export interface ModernTreasuryAccountDetail {
  id: string;
  object: "account_detail";
  account_number: string;
  account_number_safe: string;
  created_at: string;
  live_mode: boolean;
  updated_at: string;
}

export interface ModernTreasuryAddress {
  id: string;
  object: "address";
  country: string;
  created_at: string;
  line1: string;
  line2: string | null;
  live_mode: boolean;
  locality: string;
  postal_code: string;
  region: string;
  updated_at: string;
}

export interface ModernTreasuryRoutingDetail {
  id: string;
  object: "routing_detail";
  created_at: string;
  live_mode: boolean;
  routing_number: string;
  routing_number_type: "aba" | "swift" | "ca_cpa" | "au_bsb" | "gb_sort_code" | "iban";
  updated_at: string;
}

export interface ModernTreasuryPaymentOrder {
  id: string;
  object: "payment_order";
  amount: number;
  currency: string;
  direction: "credit" | "debit";
  internal_account_id: string;
  type: "ach" | "eft" | "wire" | "book" | "rtp" | "sen" | "chips" | "faster_payments" | "sepa" | "prove";
  priority: "standard" | "high";
  status: "pending" | "completed" | "failed" | "approved" | "requires_approval" | "cancelled";
  created_at: string;
  updated_at: string;
  effective_date: string;
  statement_descriptor: string;
  description: string;
  ledger_transaction_id: string | null;
  metadata: { [key: string]: string };
  originating_account_id: string;
  receiving_account_id: string;
  receiving_account: ModernTreasuryAccount;
  live_mode: boolean;
  purpose: string;
  failure_code: string | null;
  failure_reason: string | null;
  ledger_account_id: string | null;
  reconciliation_record_ids: string[];
  custom_data: { [key: string]: any } | null;
}

export interface ModernTreasuryTransaction {
  id: string;
  object: "transaction";
  amount: number;
  currency: string;
  description: string | null;
  effective_date: string;
  internal_account_id: string;
  ledger_transaction_id: string | null;
  live_mode: boolean;
  metadata: { [key: string]: string };
  object_created_at: string;
  reconciliation_record_ids: string[];
  status: "posted" | "pending" | "archived";
  type: "credit" | "debit";
  updated_at: string;
}

export interface ModernTreasuryLedger {
  id: string;
  object: "ledger";
  name: string;
  description: string | null;
  metadata: { [key: string]: string };
  created_at: string;
  updated_at: string;
  live_mode: boolean;
}

export interface ModernTreasuryLedgerAccount {
  id: string;
  object: "ledger_account";
  name: string;
  description: string | null;
  ledger_id: string;
  currency: string;
  available_balance: number;
  pending_balance: number;
  posted_balance: number;
  metadata: { [key: string]: string };
  created_at: string;
  updated_at: string;
  live_mode: boolean;
  normal_balance: "credit" | "debit";
}

export interface ModernTreasuryLedgerTransaction {
  id: string;
  object: "ledger_transaction";
  description: string | null;
  effective_date: string;
  ledger_entries: ModernTreasuryLedgerEntry[];
  metadata: { [key: string]: string };
  status: "pending" | "posted" | "archived";
  created_at: string;
  updated_at: string;
  live_mode: boolean;
}

export interface ModernTreasuryLedgerEntry {
  id: string;
  object: "ledger_entry";
  amount: number;
  direction: "credit" | "debit";
  ledger_account_id: string;
  ledger_transaction_id: string;
  live_mode: boolean;
  created_at: string;
}