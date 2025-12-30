
import React, { createContext, useState, ReactNode, useCallback, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { GoogleGenAI } from "@google/genai";
import { 
    View, Transaction, Asset, BudgetCategory, FinancialGoal, MarketplaceProduct, 
    Notification, APIStatus, LinkedAccount, UpcomingBill, MarketMover, CreditScore, 
    CreditFactor, RewardPoints, DatabaseConfig, WebDriverStatus, PaymentOrder, 
    Invoice, ComplianceCase, CorporateTransaction, MarqetaCardProduct, CryptoAsset,
    NFTAsset, SecurityScoreMetric, AuditLogEntry, ThreatAlert, DataSharingPolicy,
    APIKey, TrustedContact, SecurityAwarenessModule, TransactionRule, User, VirtualCard
} from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    linkedAccounts: LinkedAccount[];
    upcomingBills: UpcomingBill[];
    marketMovers: MarketMover[];
    creditScore: CreditScore;
    rewardPoints: RewardPoints;
    impactData: { treesPlanted: number; progressToNextTree: number };
    dbConfig: DatabaseConfig;
    webDriverStatus: WebDriverStatus;
    askSovereignAI: (prompt: string, model?: string) => Promise<string>;
    addTransaction: (tx: Transaction) => Promise<void>;
    issueCard: () => void;
    virtualCard: VirtualCard | null;
    userProfile: Partial<User>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useContext(AuthContext);
    
    const [activeView, setActiveView] = useState<View>(View.Dashboard);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Core Financial State
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [assets, setAssets] = useState<Asset[]>([
        { name: 'Sovereign Reserve', value: 1250000, color: '#06b6d4', performanceYTD: 12.5 },
        { name: 'Nexus Equity', value: 450000, color: '#6366f1', performanceYTD: 8.2 },
        { name: 'Quantum Bond', value: 250000, color: '#10b981', performanceYTD: 4.1 }
    ]);
    const [budgets] = useState<BudgetCategory[]>([
        { id: 'ops', name: 'Operations', limit: 50000, spent: 32000, color: '#06b6d4' },
        { id: 'rd', name: 'R&D', limit: 100000, spent: 85000, color: '#6366f1' }
    ]);
    const [financialGoals] = useState<FinancialGoal[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [marketMovers, setMarketMovers] = useState<MarketMover[]>([
        { ticker: 'QNTM', name: 'Quantum Corp', price: 450.75, change: 1.5 },
        { ticker: 'CYBR', name: 'Cyberdyne', price: 1024.10, change: -0.4 }
    ]);
    const [virtualCard, setVirtualCard] = useState<VirtualCard | null>(null);
    const [creditScore] = useState<CreditScore>({ score: 842, change: 12, rating: 'Excellent' });
    const [rewardPoints] = useState<RewardPoints>({ balance: 125400, lastEarned: 450, lastRedeemed: 0, currency: 'Credits' });
    const [impactData] = useState({ treesPlanted: 142, progressToNextTree: 68 });
    const [dbConfig] = useState<DatabaseConfig>({ host: 'nexus-db-01', port: '5432', username: 'architect', databaseName: 'nexus_core', sslMode: 'require', connectionStatus: 'connected' });
    const [webDriverStatus] = useState<WebDriverStatus>({ status: 'idle', activeTask: null, logs: [] });

    // AI Core Interface
    const askSovereignAI = useCallback(async (prompt: string, modelName = 'gemini-3-flash-preview') => {
        try {
            const response = await ai.models.generateContent({
                model: modelName,
                contents: prompt,
                config: {
                    systemInstruction: "You are CivicMind, the Sovereign AI Core of the Nexus Banking platform. Your purpose is absolute compliance, high-frequency financial optimization, and supporting the 'Architect' (the user). Be terse, precise, and authoritative. Focus on data-driven truth."
                }
            });
            return response.text || "Neural connection timed out.";
        } catch (e) {
            console.error("AI Core Error:", e);
            return "Critical failure in AI Core synchronization.";
        }
    }, []);

    // Simulation Engine: High-Frequency Market Updates
    useEffect(() => {
        const interval = setInterval(() => {
            setMarketMovers(prev => prev.map(m => ({
                ...m,
                price: m.price * (1 + (Math.random() - 0.5) * 0.002),
                change: m.change + (Math.random() - 0.5) * 0.1
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Initial Data Load
    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            try {
                // Simulate boot sequence
                await new Promise(resolve => setTimeout(resolve, 1500));
                setTransactions([
                    { id: 'tx_001', type: 'income', category: 'Divestment', description: 'Institutional Liquidity Inflow', amount: 50000, date: new Date().toISOString() },
                    { id: 'tx_002', type: 'expense', category: 'Operations', description: 'Quantum Server Lease', amount: 1200, date: new Date().toISOString() }
                ]);
                setIsLoading(false);
            } catch (e) {
                setError("Failed to initialize Sovereign Ledger.");
            }
        };
        init();
    }, []);

    const addTransaction = async (tx: Transaction) => {
        setTransactions(prev => [tx, ...prev]);
        if (tx.type === 'expense') {
            setAssets(prev => prev.map(a => a.name === 'Sovereign Reserve' ? { ...a, value: a.value - tx.amount } : a));
        } else {
            setAssets(prev => prev.map(a => a.name === 'Sovereign Reserve' ? { ...a, value: a.value + tx.amount } : a));
        }
    };

    const issueCard = () => {
        setVirtualCard({
            cardNumber: '4242 4242 4242 4242',
            cvv: '123',
            expiry: '12/29',
            holderName: 'THE ARCHITECT'
        });
    };

    return (
        <DataContext.Provider value={{
            isLoading, error, activeView, setActiveView,
            transactions, assets, budgets, financialGoals, notifications,
            marketplaceProducts: [], apiStatus: [], linkedAccounts: [],
            upcomingBills: [], marketMovers, creditScore, rewardPoints,
            impactData, dbConfig, webDriverStatus,
            askSovereignAI, addTransaction, issueCard, virtualCard,
            userProfile: { name: 'The Architect', email: 'architect@nexus.io' }
        }}>
            {children}
        </DataContext.Provider>
    );
};
