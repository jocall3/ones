import React, { createContext, useState, ReactNode, useCallback, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { 
    View, Transaction, Asset, BudgetCategory, FinancialGoal, MarketplaceProduct, 
    Notification, APIStatus, LinkedAccount, UpcomingBill, MarketMover, CreditScore, 
    CreditFactor, RewardPoints, DatabaseConfig, WebDriverStatus, PaymentOrder, 
    Invoice, ComplianceCase, CorporateTransaction, MarqetaCardProduct, CryptoAsset,
    NFTAsset, SecurityScoreMetric, AuditLogEntry, ThreatAlert, DataSharingPolicy,
    APIKey, TrustedContact, SecurityAwarenessModule, TransactionRule, User, VirtualCard
} from '../types';

const API_BASE_URL = 'https://ce47fe80-dabc-4ad0-b0e7-cf285695b8b8.mock.pstmn.io';

interface DataContextType {
    isLoading: boolean;
    error: string | null;
    activeView: View;
    setActiveView: (view: View) => void;
    transactions: Transaction[];
    assets: Asset[];
    budgets: BudgetCategory[];
    financialGoals: FinancialGoal[];
    notifications: Notification[];
    marketplaceProducts: MarketplaceProduct[];
    apiStatus: APIStatus[];
    geminiApiKey: string | null;
    setGeminiApiKey: (key: string) => void;
    modernTreasuryApiKey: string | null;
    setModernTreasuryApiKey: (key: string) => void;
    modernTreasuryOrganizationId: string | null;
    setModernTreasuryOrganizationId: (key: string) => void;
    plaidApiKey: string | null;
    stripeApiKey: string | null;
    marqetaApiToken: string | null;
    marqetaApiSecret: string | null;
    setMarqetaCredentials: (token: string, secret: string) => void;
    linkedAccounts: LinkedAccount[];
    upcomingBills: UpcomingBill[];
    marketMovers: MarketMover[];
    creditScore: CreditScore;
    creditFactors: CreditFactor[];
    rewardPoints: RewardPoints;
    impactData: { treesPlanted: number; progressToNextTree: number };
    dbConfig: DatabaseConfig;
    updateDbConfig: (config: Partial<DatabaseConfig>) => void;
    connectDatabase: () => void;
    webDriverStatus: WebDriverStatus;
    launchWebDriver: (task: string) => void;
    paymentOrders: PaymentOrder[];
    invoices: Invoice[];
    complianceCases: ComplianceCase[];
    corporateTransactions: CorporateTransaction[];
    corporateCards: any[];
    marqetaCardProducts: MarqetaCardProduct[];
    isMarqetaLoading: boolean;
    fetchMarqetaProducts: () => void;
    askSovereignAI: (prompt: string) => Promise<string>;
    broadcastEvent: (type: string, data: any) => void;
    markNotificationRead: (id: string) => void;
    showSystemAlert: (message: string, type: any) => void;
    addBudget: (name: string, limit: number) => void;
    addFinancialGoal: (goal: any) => void;
    generateGoalPlan: (id: string) => Promise<void>;
    addContributionToGoal: (id: string, amount: number) => void;
    addRecurringContributionToGoal: (id: string, contrib: any) => void;
    updateRecurringContributionInGoal: (id: string, cId: string, updates: any) => void;
    deleteRecurringContributionFromGoal: (id: string, cId: string) => void;
    updateFinancialGoal: (id: string, updates: any) => void;
    linkGoals: (s: string, t: string, type: any, amount?: number) => void;
    unlinkGoals: (s: string, t: string) => void;
    addTransaction: (tx: Transaction) => Promise<void>;
    rebalancePortfolio: (portfolioId: string, targetRisk: string) => Promise<any>;
    runAdvancedSimulation: (params: any) => Promise<any>;
    submitBusinessPlan: (plan: any) => Promise<any>;
    generateAdVideo: (prompt: string) => Promise<any>;
    updateCardControls: (cardId: string, controls: any) => Promise<void>;
    redeemMarketplaceOffer: (offerId: string) => Promise<any>;
    cryptoAssets: CryptoAsset[];
    walletInfo: any;
    virtualCard: VirtualCard | null;
    connectWallet: (p: any) => void;
    disconnectWallet: () => void;
    detectedProviders: any[];
    issueCard: () => void;
    buyCrypto: (a: number, c: string) => void;
    nftAssets: NFTAsset[];
    unlinkAccount: (id: string) => void;
    handlePlaidSuccess: (t: string, m: any) => void;
    securityMetrics: SecurityScoreMetric[];
    auditLogs: AuditLogEntry[];
    threatAlerts: ThreatAlert[];
    dataSharingPolicies: DataSharingPolicy[];
    apiKeys: APIKey[];
    trustedContacts: TrustedContact[];
    securityAwarenessModules: SecurityAwarenessModule[];
    transactionRules: TransactionRule[];
    isImportingData: boolean;
    userProfile: Partial<User>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useContext(AuthContext);
    const accessToken = auth?.accessToken;
    const isAuthenticated = auth?.isAuthenticated;
    
    const [activeView, setActiveView] = useState<View>(View.Dashboard);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [budgets, setBudgets] = useState<BudgetCategory[]>([]);
    const [financialGoals, setFinancialGoals] = useState<FinancialGoal[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [marketplaceProducts, setMarketplaceProducts] = useState<MarketplaceProduct[]>([]);
    const [paymentOrders, setPaymentOrders] = useState<PaymentOrder[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [complianceCases, setComplianceCases] = useState<ComplianceCase[]>([]);
    const [corporateTransactions, setCorporateTransactions] = useState<CorporateTransaction[]>([]);
    const [corporateCards, setCorporateCards] = useState<any[]>([]);
    
    const [geminiApiKey, setGeminiApiKey] = useState<string | null>(process.env.API_KEY || null);
    const [mtApiKey, setMtApiKey] = useState<string | null>(null);
    const [mtOrgId, setMtOrgId] = useState<string | null>(null);
    const [marqetaToken, setMarqetaToken] = useState<string | null>(null);
    const [marqetaSecret, setMarqetaSecret] = useState<string | null>(null);
    
    const [impactData] = useState({ treesPlanted: 1245, progressToNextTree: 72 });
    const [creditScore] = useState<CreditScore>({ score: 780, change: 5, rating: 'Excellent' });
    const [rewardPoints] = useState<RewardPoints>({ balance: 85250, lastEarned: 320, lastRedeemed: 5000, currency: 'Points' });
    const [dbConfig, setDbConfig] = useState<DatabaseConfig>({
        host: 'localhost', port: '5432', username: 'postgres', databaseName: 'sovereign_bank', sslMode: 'require', connectionStatus: 'disconnected'
    });
    const [webDriverStatus] = useState<WebDriverStatus>({ status: 'idle', activeTask: null, logs: [] });
    const [marketMovers] = useState<MarketMover[]>([
        { ticker: 'QNTM', name: 'Quantum Corp', price: 450.75, change: 12.55 },
        { ticker: 'CYBR', name: 'Cyberdyne Systems', price: 1024.10, change: 50.12 }
    ]);
    const [upcomingBills] = useState<UpcomingBill[]>([
        { id: 'b1', name: 'Server Infrastructure', amount: 12500, dueDate: '2025-02-01' }
    ]);
    const [virtualCard, setVirtualCard] = useState<VirtualCard | null>(null);

    const callApi = useCallback(async (path: string, options: RequestInit = {}) => {
        if (!accessToken) return null;
        const response = await fetch(`${API_BASE_URL}${path}`, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || `API Error: ${response.status}`);
        }
        return response.json();
    }, [accessToken]);

    const fetchData = useCallback(async () => {
        if (!isAuthenticated || !accessToken) {
            setIsLoading(false); // Ensure loading is false if not authenticated
            return;
        }
        
        setIsLoading(true);
        setError(null);
        try {
            const [txData, accountsData, budgetsData, marketplaceData, notifData] = await Promise.all([
                callApi('/transactions'),
                callApi('/accounts/me'),
                callApi('/budgets'),
                callApi('/marketplace/products'),
                callApi('/notifications/me')
            ]);

            setTransactions(txData?.data || []);
            setAssets(accountsData?.data || []);
            setBudgets(budgetsData?.data || []);
            setMarketplaceProducts(marketplaceData?.data || []);
            setNotifications(notifData?.data || []);

        } catch (e: any) {
            console.error("Critical Data Fetch Failure:", e);
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated, accessToken, callApi]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const addTransaction = async (tx: Transaction) => {
        await callApi('/transactions', { method: 'POST', body: JSON.stringify(tx) });
        await fetchData();
    };

    const rebalancePortfolio = async (id: string, risk: string) => callApi(`/investments/portfolios/${id}/rebalance`, { method: 'POST', body: JSON.stringify({ targetRiskTolerance: risk }) });
    const runAdvancedSimulation = async (p: any) => callApi('/ai/oracle/simulate/advanced', { method: 'POST', body: JSON.stringify(p) });
    const submitBusinessPlan = async (p: any) => callApi('/ai/incubator/pitch', { method: 'POST', body: JSON.stringify(p) });
    const generateAdVideo = async (prompt: string) => callApi('/ai/ads/generate', { method: 'POST', body: JSON.stringify({ prompt, style: 'Cinematic', lengthSeconds: 15 }) });
    const updateCardControls = async (id: string, c: any) => callApi(`/corporate/cards/${id}/controls`, { method: 'PUT', body: JSON.stringify(c) });
    const redeemMarketplaceOffer = async (id: string) => callApi(`/marketplace/offers/${id}/redeem`, { method: 'POST' });

    const value: DataContextType = {
        isLoading, error, activeView, setActiveView,
        transactions, assets, budgets, financialGoals, notifications, marketplaceProducts,
        apiStatus: [], geminiApiKey, setGeminiApiKey,
        modernTreasuryApiKey: mtApiKey, setModernTreasuryApiKey: setMtApiKey,
        modernTreasuryOrganizationId: mtOrgId, setModernTreasuryOrganizationId: setMtOrgId,
        plaidApiKey: null, stripeApiKey: null, marqetaApiToken: marqetaToken, marqetaApiSecret: marqetaSecret,
        setMarqetaCredentials: (t, s) => { setMarqetaToken(t); setMarqetaSecret(s); },
        linkedAccounts: [], upcomingBills, marketMovers, creditScore, creditFactors: [], rewardPoints, impactData,
        dbConfig, updateDbConfig: (c) => setDbConfig(p => ({ ...p, ...c })), connectDatabase: () => {},
        webDriverStatus, launchWebDriver: () => {},
        paymentOrders, invoices, complianceCases, corporateTransactions, corporateCards,
        marqetaCardProducts: [], isMarqetaLoading: false, fetchMarqetaProducts: () => {},
        askSovereignAI: async () => "AI Processing...",
        broadcastEvent: () => {},
        markNotificationRead: (id) => setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x)),
        showSystemAlert: () => {},
        addBudget: () => {}, addFinancialGoal: () => {}, generateGoalPlan: async () => {},
        addContributionToGoal: () => {}, addRecurringContributionToGoal: () => {},
        updateRecurringContributionInGoal: () => {}, deleteRecurringContributionFromGoal: () => {},
        updateFinancialGoal: () => {}, linkGoals: () => {}, unlinkGoals: () => {},
        addTransaction, rebalancePortfolio, runAdvancedSimulation, submitBusinessPlan, generateAdVideo, updateCardControls, redeemMarketplaceOffer,
        cryptoAssets: [], walletInfo: null, virtualCard, connectWallet: () => {}, disconnectWallet: () => {}, detectedProviders: [],
        issueCard: () => setVirtualCard({ cardNumber: '4242 4242 4242 4242', cvv: '123', expiry: '12/29', holderName: 'Sovereign User' }),
        buyCrypto: () => {}, nftAssets: [], unlinkAccount: () => {}, handlePlaidSuccess: () => {},
        securityMetrics: [], auditLogs: [], threatAlerts: [], dataSharingPolicies: [], apiKeys: [], trustedContacts: [], securityAwarenessModules: [], transactionRules: [],
        isImportingData: false, userProfile: {}
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
