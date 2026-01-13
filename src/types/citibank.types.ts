// src/types/citibank.types.ts

export interface CitibankAccount {
  accountId: string;
  accountName: string;
  accountType: string;
  accountSubType: string;
  currency: string;
  availableBalance: number;
  currentBalance: number;
  accountStatus: string;
  maskedAccountNumber: string;
}

export interface CitibankTransaction {
  transactionId: string;
  accountId: string;
  transactionType: string;
  description: string;
  amount: number;
  currency: string;
  transactionDate: string;
  postingDate: string;
  referenceId?: string;
}

export interface CitibankPayee {
  payeeId: string;
  payeeName: string;
  nickName?: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
  payeeStatus: string;
}

export interface CitibankBill {
  billId: string;
  payeeId: string;
  accountId: string;
  billAmount: number;
  currency: string;
  dueDate: string;
  billStatus: string;
}

export interface CitibankStandingInstruction {
  standingInstructionId: string;
  accountId: string;
  payeeId: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate?: string;
  frequency: string;
  status: string;
}

export interface CitibankMoneyMovementRequest {
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  currency: string;
  description?: string;
}

export interface CitibankMoneyMovementResponse {
  transactionId: string;
  status: string;
  message?: string;
}

export interface CitibankAPIError {
  code: string;
  message: string;
  field?: string;
}

export interface CitibankAPIResponse<T> {
  data?: T;
  error?: CitibankAPIError;
}

export interface CitibankEligibilityCheckResponse {
  eligible: boolean;
  reason?: string;
}

export interface CitibankCrossBorderPaymentRequest {
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  currency: string;
  payeeName: string;
  payeeAddress: string;
  payeeBankCode: string;
  payeeBankName: string;
  swiftCode?: string;
  purposeCode?: string;
  remittanceInformation?: string;
}