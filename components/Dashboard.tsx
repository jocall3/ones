import React, { useContext, useMemo, useState, useEffect, useRef } from 'react';
import BalanceSummary from './BalanceSummary';
import RecentTransactions from './RecentTransactions';
import WealthTimeline from './WealthTimeline';
import { AIInsights } from './AIInsights';
import ImpactTracker from './ImpactTracker';
import { DataContext } from '../context/DataContext';
import Card from './Card';
import { View } from '../types';
/* FIX: Added CheckCircle to lucide-react imports */
import { 
    Bot, Database, ShieldCheck, Zap, Globe, Target, 
    TrendingUp, Cpu, Landmark, AlertOctagon, Scale, Fingerprint, CheckCircle
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const Dashboard: React.FC = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error("Dashboard requires DataContext.");

    const { 
        transactions, financialGoals, marketplaceProducts, 
        setActiveView, creditScore, rewardPoints, dbConfig 
    } = context;

    return (
        <div className="space-y-8 animate-in fade-in duration-700 p-2 md:p-6 bg-gray-950 min-h-screen">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-800 pb-8">
                <div>
                    <h1 className="text-6xl font-black text-white tracking-tighter uppercase font-mono italic">Nexus OS</h1>
                    <p className="text-cyan-500 mt-1 flex items-center gap-2 font-mono text-sm tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        STATION: SOVEREIGN_CORE_01 // COMPLIANCE_TIER: NIST-800-171-CERTIFIED
                    </p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setActiveView(View.ComplianceOracle)} className="px-4 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 rounded-xl text-sm font-bold text-red-400 flex items-center gap-2 transition-all">
                        <ShieldCheck size={18} /> Compliance Status: 94%
                    </button>
                    <button onClick={() => setActiveView(View.SendMoney)} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                        Initiate Capital Flow
                    </button>
                </div>
            </header>

            {/* Quick Metrics Deck */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="border-cyan-500/20 bg-cyan-950/5 text-center py-6 group hover:border-cyan-500/50 transition-all">
                    <Fingerprint className="w-8 h-8 mx-auto text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-3xl font-black text-white font-mono">{creditScore.score}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Sovereign Index</p>
                </Card>
                <Card className="border-purple-500/20 bg-purple-950/5 text-center py-6 group hover:border-purple-500/50 transition-all">
                    <Zap className="w-8 h-8 mx-auto text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-3xl font-black text-white font-mono">{rewardPoints.balance.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Neural Credits</p>
                </Card>
                <Card className="border-green-500/20 bg-green-950/5 text-center py-6 group hover:border-green-500/50 transition-all">
                    <Database className="w-8 h-8 mx-auto text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-3xl font-black text-white font-mono">{dbConfig.connectionStatus === 'connected' ? 'SYNC' : 'LOCKED'}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Ledger Integrity</p>
                </Card>
                <Card className="border-orange-500/20 bg-orange-950/5 text-center py-6 group hover:border-orange-500/50 transition-all">
                    <Scale className="w-8 h-8 mx-auto text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-3xl font-black text-white font-mono">94%</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">NIST Coverage</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Visual Data Nexus */}
                <div className="lg:col-span-8 space-y-8">
                    <Card title="Financial Topology Visualization" className="h-[450px] relative overflow-hidden bg-black/40 border-indigo-900/50 p-0">
                        <div className="absolute top-6 left-6 z-10">
                            <span className="px-3 py-1.5 bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold font-mono rounded-lg backdrop-blur">REAL_TIME_WEALTH_PROJECTION_V4</span>
                        </div>
                        <WealthTimeline />
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <BalanceSummary />
                        <AIInsights />
                    </div>
                </div>

                {/* Tactical Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <Card title="Immediate Contingencies" className="border-red-500/20 bg-red-950/5 p-6">
                        <div className="space-y-4">
                             {context.upcomingBills.slice(0, 3).map(bill => (
                                 <div key={bill.id} className="flex justify-between items-center p-4 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-red-500/50 transition-all group">
                                     <div>
                                         <p className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">{bill.name}</p>
                                         <p className="text-[10px] text-gray-500 font-mono uppercase mt-1">DUE_EPOCH: {bill.dueDate}</p>
                                     </div>
                                     <div className="text-right">
                                         <p className="text-red-400 font-mono font-bold text-lg">${bill.amount.toFixed(2)}</p>
                                         <button className="text-[10px] text-cyan-400 hover:text-white uppercase font-black tracking-tighter">Settle Flow &rarr;</button>
                                     </div>
                                 </div>
                             ))}
                             {context.upcomingBills.length === 0 && <p className="text-gray-600 text-center py-4 font-mono text-xs">NO_PENDING_CONTINGENCIES</p>}
                        </div>
                    </Card>

                    <Card title="Strategic Capital Vectors" className="border-green-500/20 p-6">
                        <div className="space-y-6">
                            {financialGoals.slice(0, 3).map(goal => {
                                const pct = (goal.currentAmount / goal.targetAmount) * 100;
                                return (
                                    <div key={goal.id} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-gray-300 uppercase tracking-tighter">{goal.name}</span>
                                            <span className="text-green-400 font-mono">{pct.toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-green-500 h-full transition-all duration-1000" style={{ width: `${pct}%` }}></div>
                                        </div>
                                    </div>
                                )
                            })}
                            <button onClick={() => setActiveView(View.FinancialGoals)} className="w-full py-3 bg-gray-900 hover:bg-gray-800 rounded-xl text-xs font-black text-gray-400 uppercase tracking-widest transition-all border border-gray-800">Review Full Strategic Roadmap</button>
                        </div>
                    </Card>

                    <Card title="Compliance Alerts" className="border-orange-500/20 bg-orange-950/5 p-6">
                         <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-gray-900/60 rounded-xl border border-orange-500/20">
                                <AlertOctagon size={16} className="text-orange-400 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-white">FIPS Cryptography Warning</p>
                                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">System using non-validated AES-256 module. NIST 800-171 3.13.11 requires validation.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-900/60 rounded-xl border border-green-500/20">
                                <CheckCircle size={16} className="text-green-400 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-white">Auth0 Audit Complete</p>
                                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">Credential integrity verified. MFA enforced for all administrative nodes.</p>
                                </div>
                            </div>
                         </div>
                    </Card>
                </div>

                {/* FlowMatrix Ledger */}
                <div className="lg:col-span-12">
                    <RecentTransactions transactions={transactions.slice(0, 10)} setActiveView={setActiveView} />
                </div>
            </div>

            <footer className="text-center pt-20 border-t border-gray-900 text-[10px] text-gray-700 font-mono tracking-widest uppercase">
                Sovereign Operating System Alpha v4.2.0 // Quantum Secure Link: ACTIVE
            </footer>
        </div>
    );
};

export default Dashboard;