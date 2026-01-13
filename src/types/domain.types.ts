export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
  accounts?: Account[];
}

export interface Account {
  id: string;
  userId: string;
  accountName: string;
  accountType: AccountType;
  accountNumber: string;
  routingNumber: string;
  balance: number;
  currency: Currency;
  createdAt: Date;
  updatedAt: Date;
  transactions?: Transaction[];
}

export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  CREDIT_CARD = "CREDIT_CARD",
  INVESTMENT = "INVESTMENT",
  OTHER = "OTHER",
}

export interface Transaction {
  id: string;
  accountId: string;
  transactionDate: Date;
  amount: number;
  description: string;
  transactionType: TransactionType;
  category: string;
  merchant?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TransactionType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  CAD = "CAD",
}

export interface Counterparty {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  amountDue: number;
  currency: Currency;
  status: InvoiceStatus;
  counterpartyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum InvoiceStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

export interface PaymentOrder {
  id: string;
  amount: number;
  currency: Currency;
  dueDate: Date;
  status: PaymentOrderStatus;
  accountId: string;
  counterpartyId: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentOrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export interface VirtualAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  currency: Currency;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpectedPayment {
  id: string;
  amount: number;
  currency: Currency;
  expectedDate: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  insightType: string;
  relevanceScore: number;
  createdAt: Date;
  updatedAt: Date;
}