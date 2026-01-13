// src/types/marqeta.types.ts

export interface MarqetaCard {
  token: string;
  user_token: string;
  card_product_token: string;
  pan: string;
  cvv: string;
  expiration: string; // Format: MM/YY
  state: 'ACTIVE' | 'SUSPENDED' | 'TERMINATED';
  barcode: string;
  fulfillment?: MarqetaCardFulfillment;
  metadata?: { [key: string]: string };
  reissue?: MarqetaCardReissue;
  activation_actions?: MarqetaCardActivationActions;
  bulk_issuance_token?: string;
  translate_pin_from_card_pack?: boolean;
  is_default_card?: boolean;
  contactless_exemption?: MarqetaCardContactlessExemption;
  digital_wallet_tokenization?: MarqetaCardDigitalWalletTokenization;
  instrument_type?: 'PHYSICAL_CARD' | 'VIRTUAL_CARD';
  pin_is_set?: boolean;
  created_time?: string;
  last_modified_time?: string;
}

export interface MarqetaCardFulfillment {
  card_personalization?: MarqetaCardPersonalization;
  shipping?: MarqetaCardShipping;
}

export interface MarqetaCardPersonalization {
  carrier?: MarqetaCardCarrier;
  images?: MarqetaCardImages;
  text?: MarqetaCardText[];
}

export interface MarqetaCardCarrier {
  template_id?: string;
  message_line_1?: string;
  message_line_2?: string;
  message_line_3?: string;
  message_line_4?: string;
}

export interface MarqetaCardImages {
  card_front_image_token?: string;
  card_back_image_token?: string;
  carrier_image_token?: string;
}

export interface MarqetaCardText {
  card_front_text?: string;
  card_back_text?: string;
  position?: string;
}

export interface MarqetaCardShipping {
  method?: 'STANDARD' | 'EXPEDITED' | 'PRIORITY';
  recipient_address?: MarqetaAddress;
  shipping_tracking?: MarqetaShippingTracking;
}

export interface MarqetaAddress {
  street_address_1?: string;
  street_address_2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface MarqetaShippingTracking {
  carrier?: string;
  tracking_number?: string;
  estimated_delivery_date?: string;
}

export interface MarqetaCardReissue {
  card_token?: string;
  reason?: 'DAMAGED' | 'LOST' | 'STOLEN' | 'EXPIRED' | 'PIN_RESET' | 'FRAUD';
  new_pan?: boolean;
  new_expiration?: boolean;
  new_cvv?: boolean;
}

export interface MarqetaCardActivationActions {
  terminate_old_card?: boolean;
  show_activation_ui?: boolean;
}

export interface MarqetaCardContactlessExemption {
  mcc?: string;
  amount_limit?: number;
}

export interface MarqetaCardDigitalWalletTokenization {
  enabled?: boolean;
  card_art_token?: string;
}

export interface MarqetaUser {
  token: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  birth_date?: string; // Format: YYYY-MM-DD
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'NOT_SPECIFIED';
  ssn?: string;
  metadata?: { [key: string]: string };
  notes?: string;
  status?: 'ACTIVE' | 'SUSPENDED' | 'LOCKED';
  account_holder_group_token?: string;
  corporate_card_holder?: boolean;
  password?: string;
  ip_address?: string;
  browser?: string;
  accept_terms?: boolean;
  created_time?: string;
  last_modified_time?: string;
}

export interface MarqetaCardProduct {
  token: string;
  name: string;
  description: string;
  active: boolean;
  fulfillment?: MarqetaCardProductFulfillment;
  config?: MarqetaCardProductConfig;
  created_time?: string;
  last_modified_time?: string;
}

export interface MarqetaCardProductFulfillment {
  card_personalization?: MarqetaCardPersonalization;
  payment_instrument?: 'CONTACT' | 'CONTACTLESS';
  package_code?: string;
  carrier?: MarqetaCardCarrier;
  card_art?: MarqetaCardArt;
}

export interface MarqetaCardArt {
  card_front_image_token?: string;
  card_back_image_token?: string;
}

export interface MarqetaCardProductConfig {
  card_life_cycle?: MarqetaCardLifeCycle;
  transaction_controls?: MarqetaTransactionControls;
  selective_auth?: MarqetaSelectiveAuth;
  poi_controls?: MarqetaPoiControls;
  kyc_controls?: MarqetaKycControls;
  velocity_controls?: MarqetaVelocityControls;
  program_funding?: MarqetaProgramFunding;
  cardholder_verification?: MarqetaCardholderVerification;
  authorization_controls?: MarqetaAuthorizationControls;
}

export interface MarqetaCardLifeCycle {
  activate_upon_issuance?: boolean;
  card_expiration_offset?: MarqetaCardExpirationOffset;
}

export interface MarqetaCardExpirationOffset {
  unit?: 'DAYS' | 'MONTHS' | 'YEARS';
  value?: number;
}

export interface MarqetaTransactionControls {
  allow_mcc_group_authorization?: boolean;
  allow_mcc_authorization?: boolean;
  block_mcc_group_authorization?: boolean;
  block_mcc_authorization?: boolean;
}

export interface MarqetaSelectiveAuth {
  enabled?: boolean;
  timeout_millis?: number;
}

export interface MarqetaPoiControls {
  ecommerce?: boolean;
  atm?: boolean;
  telephone?: boolean;
  mail_order?: boolean;
  in_person?: boolean;
}

export interface MarqetaKycControls {
  kyc_required?: boolean;
}

export interface MarqetaVelocityControls {
  amount_limit?: number;
  count_limit?: number;
  interval?: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
}

export interface MarqetaProgramFunding {
  source?: 'PROGRAM' | 'ACCOUNT';
  program_funding_source_token?: string;
  account_funding_source_token?: string;
}

export interface MarqetaCardholderVerification {
  method?: 'PIN' | 'SIGNATURE' | 'NONE';
}

export interface MarqetaAuthorizationControls {
  hold_increase_days?: number;
  manual_approval_enabled?: boolean;
}

export interface MarqetaTransaction {
  token: string;
  type: 'AUTHORIZATION' | 'CLEARING' | 'CREDIT' | 'VOID';
  amount: number;
  currency_code: string;
  merchant?: MarqetaMerchant;
  card?: MarqetaCard;
  user?: MarqetaUser;
  program?: MarqetaCardProduct;
  status?: 'PENDING' | 'APPROVED' | 'DECLINED' | 'COMPLETED' | 'VOIDED';
  created_time?: string;
  last_modified_time?: string;
  metadata?: { [key: string]: string };
  network?: string;
  acquirer_reference_number?: string;
  approval_code?: string;
  transaction_id?: string;
  response?: MarqetaTransactionResponse;
  cardholder_authentication_method?: string;
  cardholder_authentication_data?: string;
  card_acceptor_business_code?: string;
  card_acceptor_terminal_id?: string;
  card_acceptor_name_location?: string;
  card_acceptor_city?: string;
  card_acceptor_state?: string;
  card_acceptor_country_code?: string;
  card_acceptor_postal_code?: string;
  card_acceptor_phone_number?: string;
  card_acceptor_url?: string;
  card_acceptor_email?: string;
  card_acceptor_mcc?: string;
  card_acceptor_merchant_category_code?: string;
  card_acceptor_merchant_name?: string;
  card_acceptor_merchant_id?: string;
  card_acceptor_merchant_url?: string;
  card_acceptor_merchant_email?: string;
  card_acceptor_merchant_phone_number?: string;
  card_acceptor_merchant_postal_code?: string;
  card_acceptor_merchant_country_code?: string;
  card_acceptor_merchant_state?: string;
  card_acceptor_merchant_city?: string;
  card_acceptor_merchant_address?: string;
  card_acceptor_merchant_latitude?: number;
  card_acceptor_merchant_longitude?: number;
  card_acceptor_merchant_timezone?: string;
  card_acceptor_merchant_currency_code?: string;
  card_acceptor_merchant_amount?: number;
  card_acceptor_merchant_fee?: number;
  card_acceptor_merchant_tax?: number;
  card_acceptor_merchant_tip?: number;
  card_acceptor_merchant_discount?: number;
  card_acceptor_merchant_surcharge?: number;
  card_acceptor_merchant_cashback?: number;
  card_acceptor_merchant_other_fee?: number;
  card_acceptor_merchant_other_tax?: number;
  card_acceptor_merchant_other_discount?: number;
  card_acceptor_merchant_other_surcharge?: number;
  card_acceptor_merchant_other_cashback?: number;
  card_acceptor_merchant_other_tip?: number;
  card_acceptor_merchant_other_amount?: number;
  card_acceptor_merchant_other_currency_code?: string;
  card_acceptor_merchant_other_exchange_rate?: number;
  card_acceptor_merchant_other_exchange_rate_date?: string;
  card_acceptor_merchant_other_exchange_rate_source?: string;
  card_acceptor_merchant_other_exchange_rate_target?: string;
  card_acceptor_merchant_other_exchange_rate_type?: string;
  card_acceptor_merchant_other_exchange_rate_provider?: string;
  card_acceptor_merchant_other_exchange_rate_fee?: number;
  card_acceptor_merchant_other_exchange_rate_tax?: number;
  card_acceptor_merchant_other_exchange_rate_discount?: number;
  card_acceptor_merchant_other_exchange_rate_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_amount?: number;
  card_acceptor_merchant_other_exchange_rate_other_currency_code?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_date?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_source?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_target?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_type?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_provider?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_amount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_currency_code?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_date?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_source?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_target?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_type?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_provider?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_amount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_currency_code?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_date?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_source?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_target?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_type?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_provider?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_amount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_currency_code?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_date?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_source?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_target?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_type?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_provider?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_amount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_currency_code?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_date?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_source?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_target?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_type?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_provider?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_amount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_currency_code?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_date?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_source?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_target?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_type?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_provider?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_amount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_currency_code?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_date?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_source?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_target?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_type?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_provider?: string;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_surcharge?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_cashback?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_fee?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_tax?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_discount?: number;
  card_acceptor_merchant_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_exchange_rate_other_surcharge?: number;