
import React, { ReactNode } from 'react';

// Alias for compatibility
export type UserProfile = User;

export interface ACHDetails {
  routingNumber: string;
  realAccountNumber: string;
}

// FIX: Added PaymentRail type to resolve SendMoneyView import error
export type PaymentRail = 'quantumpay' | 'cashapp' | 'swift_global' | 'blockchain_dlt';

export enum View {
    // --- Core ---
    Dashboard = 'dashboard',
    
    // --- Personal Command ---
    Transactions = 'transactions',
    SendMoney = 'send-money',
    Budgets = 'capital-allocation',
    FinancialGoals = 'strategic-goals',
    CreditHealth = 'credit-resonance',
    Personalization = 'interface-will',
    Accounts = 'accounts-overview',
    
    // --- Sovereign Wealth ---
    Investments = 'portfolio-overview',
    Crypto = 'web3-crypto',
    CryptoWeb3 = 'web3-crypto',
    AlgoTradingLab = 'algo-trading-lab',
    ForexArena = 'forex-arena',
    CommoditiesExchange = 'commodities',
    RealEstateEmpire = 'real-estate',
    ArtCollectibles = 'art-collectibles',
    DerivativesDesk = 'derivatives',
    VentureCapital = 'venture-capital',
    PrivateEquity = 'private-equity',
    TaxOptimization = 'tax-optimization',
    LegacyBuilder = 'legacy-architect',
    SovereignWealth = 'sovereign-wealth-sim',
    QuantumAssets = 'quantum-assets',
    
    // --- Citi Connect Core ---
    CitibankAccounts = 'citi-accounts',
    CitibankAccountProxy = 'citi-account-proxy',
    CitibankBillPay = 'citi-bill-payment',
    CitibankCrossBorder = 'citi-cross-border',
    CitibankPayeeManagement = 'citi-payee-mgmt',
    CitibankStandingInstructions = 'citi-standing-instructions',
    CitibankDeveloperTools = 'citi-dev-tools',
    CitibankEligibility = 'citi-eligibility-check',
    CitibankUnmaskedData = 'citi-secure-data-view',

    // --- Plaid Nexus ---
    PlaidMainDashboard = 'plaid-overview',
    DataNetwork = 'plaid-overview',
    PlaidIdentity = 'plaid-identity-verification',
    PlaidCRAMonitoring = 'plaid-cra-monitoring',
    PlaidInstitutions = 'plaid-institutions-explorer',
    PlaidItemManagement = 'plaid-item-management',
    
    // --- Enterprise Operations ---
    CorporateCommand = 'corporate-command',
    ModernTreasury = 'modern-treasury',
    Treasury = 'treasury-capital',
    CardPrograms = 'marqeta-cards',
    Payments = 'stripe-payments',
    StripeNexus = 'stripe-nexus',
    CounterpartyDashboard = 'counterparties',
    VirtualAccounts = 'virtual-accounts',
    CorporateActions = 'corporate-actions',
    CreditNoteLedger = 'credit-notes',
    ReconciliationHub = 'reconciliation-hub',
    GEINDashboard = 'gein-dashboard',
    CardholderManagement = 'cardholder-mgmt',
    VentureCapitalDeskView = 'vc-desk-view',

    // --- System & Intelligence ---
    AIAdvisor = 'ai-advisor',
    AIInsights = 'predictive-insights',
    QuantumWeaver = 'quantum-weaver',
    AgentMarketplace = 'agent-marketplace',
    AIAdStudio = 'ai-ad-studio',
    GlobalPositionMap = 'global-position-map',
    GlobalSsiHub = 'global-ssi-hub',
    SecurityCompliance = 'security-compliance',
    DeveloperHub = 'developer-hub',
    SchemaExplorer = 'iso-20022-explorer',
    ResourceGraph = 'resource-graph',
    TheVision = 'the-vision',
    ApiPlayground = 'api-playground',
    ComplianceOracle = 'compliance-oracle',

    // --- Admin & Tools ---
    CustomerDashboard = 'customer-dashboard',
    VerificationReports = 'verification-reports',
    FinancialReporting = 'financial-reporting',
    StripeNexusDashboard = 'stripe-nexus-admin',

    // --- All Components (Direct Access) ---
    AccountDetails = 'account-details',
    AccountList = 'account-list',
    AccountStatementGrid = 'account-statement-grid',
    AccountsView = 'accounts-view',
    AccountVerificationModal = 'account-verification-modal',
    ACHDetailsDisplay = 'ach-details-display',
    AICommandLog = 'ai-command-log',
    AIPredictionWidget = 'ai-prediction-widget',
    AssetCatalog = 'asset-catalog',
    AutomatedSweepRules = 'automated-sweep-rules',
    BalanceReportChart = 'balance-report-chart',
    BalanceTransactionTable = 'balance-transaction-table',
    CardDesignVisualizer = 'card-design-visualizer',
    ChargeDetailModal = 'charge-detail-modal',
    ChargeList = 'charge-list',
    ConductorConfigurationView = 'conductor-configuration-view',
    CounterpartyDetails = 'counterparty-details',
    CounterpartyForm = 'counterparty-form',
    DisruptionIndexMeter = 'disruption-index-meter',
    DocumentUploader = 'document-uploader',
    DownloadLink = 'download-link',
    EarlyFraudWarningFeed = 'early-fraud-warning-feed',
    ElectionChoiceForm = 'election-choice-form',
    EventNotificationCard = 'event-notification-card',
    ExpectedPaymentsTable = 'expected-payments-table',
    ExternalAccountCard = 'external-account-card',
    ExternalAccountForm = 'external-account-form',
    ExternalAccountsTable = 'external-accounts-table',
    FinancialAccountCard = 'financial-account-card',
    IncomingPaymentDetailList = 'incoming-payment-detail-list',
    InvoiceFinancingRequest = 'invoice-financing-request',
    PaymentInitiationForm = 'payment-initiation-form',
    PaymentMethodDetails = 'payment-method-details',
    PaymentOrderForm = 'payment-order-form',
    PayoutsDashboard = 'payouts-dashboard',
    PnLChart = 'pnl-chart',
    RefundForm = 'refund-form',
    RemittanceInfoEditor = 'remittance-info-editor',
    ReportingView = 'reporting-view',
    ReportRunGenerator = 'report-run-generator',
    ReportStatusIndicator = 'report-status-indicator',
    SsiEditorForm = 'ssi-editor-form',
    StripeNexusView = 'stripe-nexus-view',
    StripeStatusBadge = 'stripe-status-badge',
    StructuredPurposeInput = 'structured-purpose-input',
    SubscriptionList = 'subscription-list',
    TimeSeriesChart = 'time-series-chart',
    TradeConfirmationModal = 'trade-confirmation-modal',
    TransactionFilter = 'transaction-filter',
    TransactionList = 'transaction-list',
    TreasuryTransactionList = 'treasury-transaction-list',
    TreasuryView = 'treasury-view',
    UniversalObjectInspector = 'universal-object-inspector',
    VirtualAccountForm = 'virtual-account-form',
    VirtualAccountsTable = 'virtual-accounts-table',
    VoiceControl = 'voice-control',
    WebhookSimulator = 'webhook-simulator',

    // New Educational & 527 Views
    TheBook = 'the-book',
    KnowledgeBase = 'knowledge-base',
    
    // Auth & Settings
    Settings = 'settings',
    SSO = 'sso',
    ConciergeService = 'concierge-service',
    Philanthropy = 'philanthropy',
    OpenBanking = 'open-banking',
    FinancialDemocracy = 'financial-democracy',
    APIStatus = 'api-status',
    APIIntegration = 'api-integration',
    APIConsole = 'api-console',
    SecurityCenter = 'security-center',
    Security = 'security',
    AIStrategy = 'ai-strategy',
    Goals = 'financial-goals',
    Rewards = 'rewards',
    CardCustomization = 'card-customization',
}

export type UserRole = 'ADMIN' | 'TRADER' | 'CLIENT' | 'VISIONARY' | 'CARETAKER' | 'QUANT_ANALYST' | 'SYSTEM_ARCHITECT' | 'ETHICS_OFFICER' | 'DATA_SCIENTIST' | 'NETWORK_WEAVER' | 'CITIZEN';

export type SecurityLevel = 'STANDARD' | 'ELEVATED' | 'TRADING_UNLOCKED' | 'QUANTUM_ENCRYPTED' | 'SOVEREIGN_CLEARED' | 'ARCHITECT_LEVEL';

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  roles?: UserRole[];
  securityLevel?: SecurityLevel;
  netWorth?: number;
  display_name?: string;
  handle?: string;
  role?: string;
  businessId?: string;
  profilePictureUrl?: string;
  bio?: string;
  profile?: any;
  wallet?: { balance: number; currency: string };
  businesses?: string[];
  memberships?: string[];
  followers?: string[];
  following?: string[];
  state?: any;
  tradingProfile?: any;
  biometricHashV2?: string;
  genomicSignatureId?: string;
  citizenship?: string;
  reputationScore?: number;
  threatVectorIndex?: number;
  neuralLaceSyncStatus?: string;
  cognitiveProfileId?: string;
  activeThoughtStreamId?: string | null;
  lastLoginCoordinates?: any;
  temporalAnchorId?: string;
  activeSovereignAgentIds?: string[];
  permissionsGridHash?: string;
  isAdmin?: boolean;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  description: string;
  amount: number;
  date: string;
  currency?: string;
  carbonFootprint?: number;
  merchantDetails?: any;
  aiCategoryConfidence?: number;
  disputeStatus?: 'none' | 'pending' | 'resolved' | 'failed';
  notes?: string;
}

export interface Asset {
  name: string;
  value: number;
  color: string;
  performanceYTD?: number;
  esgRating?: number;
  description?: string;
  ticker?: string;
  type?: string;
  riskLevel?: 'Low' | 'Medium' | 'High';
}

export interface BudgetCategory {
  id: string;
  name: string;
  limit: number;
  spent: number;
  color: string;
}

export interface GamificationState {
  score: number;
  level: number;
  levelName: string;
  progress: number;
  credits: number;
}

export type IllusionType = 'none' | '