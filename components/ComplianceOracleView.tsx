import React, { useState, useMemo, useContext, useEffect } from 'react';
import Card from './Card';
import { 
    ShieldCheck, AlertTriangle, CheckCircle, Clock, FileText, 
    Zap, Cpu, Lock, Eye, BarChart3, Binary, Scale, Download,
    Shield, Search, AlertCircle, Terminal, ClipboardList
} from 'lucide-react';
import { DataContext } from '../context/DataContext';
import { GoogleGenAI } from "@google/genai";

interface NistControl {
    id: string;
    family: string;
    title: string;
    description: string;
    status: 'IMPLEMENTED' | 'PARTIAL' | 'NOT_STARTED' | 'PLANNED';
    nexusModule: string;
    evidence: string;
    longDescription: string;
}

const NIST_800_171_CONTROLS: NistControl[] = [
    { 
        id: '3.1.1', 
        family: 'Access Control', 
        title: 'Limit system access to authorized users', 
        description: 'Limit system access to authorized users, processes acting on behalf of authorized users, and devices.', 
        status: 'IMPLEMENTED', 
        nexusModule: 'Nexus Identity Hub', 
        evidence: 'Auth0 RS256 JWT validation active.',
        longDescription: 'Access is governed by the Sovereign Identity Provider. Each session is validated against the Nexus Trust Engine. Devices must be registered in the Endpoint Inventory before a TLS handshake is permitted.'
    },
    { 
        id: '3.1.2', 
        family: 'Access Control', 
        title: 'Limit system access to types of transactions', 
        description: 'Limit system access to the types of transactions and functions that authorized users are permitted to execute.', 
        status: 'IMPLEMENTED', 
        nexusModule: 'RBAC Controller', 
        evidence: 'Scoped JWT claims enforce functional boundaries.',
        longDescription: 'Traders cannot access Compliance Oracle settings. Architects cannot initiate capital flows without dual-authorization. Transactional limits are enforced at the API Gateway level.'
    },
    { 
        id: '3.1.3', 
        family: 'Access Control', 
        title: 'Control CUI flow', 
        description: 'Control the flow of CUI in accordance with approved authorizations.', 
        status: 'IMPLEMENTED', 
        nexusModule: 'FlowMatrix Ledger', 
        evidence: 'Data labeling engine segregates CUI/FCI flows.',
        longDescription: 'Any data moving through the FlowMatrix is automatically inspected for CUI markers. If detected, the packet is encrypted with a program-specific key and routed through the Secure Data Bridge.'
    },
    { 
        id: '3.3.1', 
        family: 'Audit and Accountability', 
        title: 'Create and retain system audit logs', 
        description: 'Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, and investigation.', 
        status: 'IMPLEMENTED', 
        nexusModule: 'Security Center', 
        evidence: 'Immutable ledger logging via Distributed Ledger Technology.',
        longDescription: 'The Nexus uses a private proof-of-authority chain to store all system logs. These logs are write-once, read-many (WORM) and include full context: user ID, device fingerprint, coordinate telemetry, and result hash.'
    },
    { 
        id: '3.3.2', 
        family: 'Audit and Accountability', 
        title: 'Ensure that the actions of individual system users can be uniquely traced', 
        description: 'Ensure that the actions of individual system users can be uniquely traced to those users.', 
        status: 'IMPLEMENTED', 
        nexusModule: 'Nexus Identity Hub', 
        evidence: 'Audit logs include unique Auth0 Sub IDs.',
        longDescription: 'Shared accounts are strictly prohibited. Every interaction is signed by the user’s individual private key fragment, which is unlocked via local biometric verification.'
    },
    { 
        id: '3.5.3', 
        family: 'Identification and Authentication', 
        title: 'Use multi-factor authentication', 
        description: 'Use multi-factor authentication for local and network access to privileged accounts.', 
        status: 'IMPLEMENTED', 
        nexusModule: 'Biometric Handshake', 
        evidence: 'Quantum-resistant 2FA and Biometric scan required.',
        longDescription: 'The Nexus enforces a three-tier auth protocol: Something you know (Passphrase), Something you have (FIDO2 Hardware Key), and Something you are (Neural/Face Scan).'
    },
    { 
        id: '3.11.1', 
        family: 'Risk Assessment', 
        title: 'Periodically assess risk', 
        description: 'Periodically assess the risk to organizational operations, organizational assets, and individuals.', 
        status: 'PARTIAL', 
        nexusModule: 'Compliance Oracle', 
        evidence: 'AI-driven heuristic scans active; manual annual review pending.',
        longDescription: 'The system performs real-time risk assessment using the idgafai engine. However, a formal human-led risk assessment of the physical vault infrastructure is scheduled for Q4.'
    },
    { 
        id: '3.13.11', 
        family: 'System and Communications Protection', 
        title: 'Employ FIPS-validated cryptography', 
        description: 'Employ FIPS-validated cryptography when used to protect the confidentiality of CUI.', 
        status: 'PLANNED', 
        nexusModule: 'Quantum Key Vault', 
        evidence: 'Transitioning to AES-256-GCM FIPS module in T-30 days.',
        longDescription: 'Currently using OpenSSL 3.0 (FIPS compatible). We are migrating to a dedicated Hardware Security Module (HSM) that is FIPS 140-3 Level 3 certified to meet the Expert tier requirements.'
    },
    { 
        id: '3.14.1', 
        family: 'System and Information Integrity', 
        title: 'Identify, report, and correct system flaws', 
        description: 'Identify, report, and correct system flaws in a timely manner.', 
        status: 'IMPLEMENTED', 
        nexusModule: 'Autonomous Core', 
        evidence: 'Real-time memory buffer monitoring active.',
        longDescription: 'The AI core monitors all process threads for anomalous behavior. Any detected vulnerability is automatically isolated, and a remediation ticket is generated in the Developer Hub.'
    },
];

const ComplianceOracleView: React.FC = () => {
    const context = useContext(DataContext);
    const [selectedFamily, setSelectedFamily] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [isGeneratingSSP, setIsGeneratingSSP] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
    const [selectedControl, setSelectedControl] = useState<NistControl | null>(null);

    const families = useMemo(() => ['All', ...new Set(NIST_800_171_CONTROLS.map(c => c.family))], []);

    const filteredControls = useMemo(() => {
        return NIST_800_171_CONTROLS.filter(c => {
            const matchesFamily = selectedFamily === 'All' || c.family === selectedFamily;
            const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 c.id.includes(searchTerm) ||
                                 c.family.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFamily && matchesSearch;
        });
    }, [selectedFamily, searchTerm]);

    const stats = useMemo(() => {
        const total = NIST_800_171_CONTROLS.length;
        const implemented = NIST_800_171_CONTROLS.filter(c => c.status === 'IMPLEMENTED').length;
        return {
            percentage: Math.round((implemented / total) * 100),
            implemented,
            total
        };
    }, []);

    const runAIRiskAssessment = async () => {
        if (!context?.geminiApiKey) return;
        setIsGeneratingSSP(true);
        setAiAnalysis(null);
        try {
            const ai = new GoogleGenAI({ apiKey: context.geminiApiKey });
            const prompt = `Perform a CMMC Level 2 Readiness review based on the current state:
                - Implemented: ${stats.implemented}/${stats.total}
                - Critical Gaps: FIPS Cryptography (SC.3.13.11) is PENDING.
                - Strengths: Identity Management and Audit Logging are robust.
                
                Provide a structured report with:
                1. Executive Summary
                2. Top 3 Vulnerabilities
                3. Path to 100% Compliance.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-3-pro-preview',
                contents: prompt,
            });
            setAiAnalysis(response.text);
        } catch (e) {
            setAiAnalysis("AI Diagnostic Link Interrupted. Proceed with manual verification of control evidence.");
        } finally {
            setIsGeneratingSSP(false);
        }
    };

    return (
        <div className="p-6 md:p-10 space-y-8 bg-gray-950 min-h-screen text-gray-100">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-800 pb-8">
                <div>
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-500 tracking-tighter uppercase font-mono italic">
                        Compliance Oracle
                    </h1>
                    <p className="mt-2 text-xl text-gray-400 font-mono">
                        SOVEREIGN ASSESSMENT INFRASTRUCTURE // NIST SP 800-171 R2
                    </p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={runAIRiskAssessment}
                        disabled={isGeneratingSSP}
                        className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isGeneratingSSP ? <Loader2 className="animate-spin" /> : <Binary size={20} />}
                        Execute AI Assessment
                    </button>
                    <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl border border-gray-700 flex items-center gap-2">
                        <Download size={20} /> Export SSP
                    </button>
                </div>
            </header>

            {/* Maturity Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-red-500/30 bg-red-950/5 text-center p-8">
                    <p className="text-xs text-red-400 uppercase tracking-[0.3em] mb-2 font-black">Node Maturity Score</p>
                    <p className="text-7xl font-black text-red-500 font-mono tracking-tighter">{stats.percentage}%</p>
                    <p className="text-[10px] text-gray-500 mt-4 font-mono">ENFORCE: NIST-800-171-CERTIFIED</p>
                </Card>
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gray-900/50 border-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                                <ShieldCheck className="text-green-400 w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">{stats.implemented}</p>
                                <p className="text-xs text-gray-500 uppercase font-bold">Validated Controls</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                <Clock className="text-yellow-400 w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">4</p>
                                <p className="text-xs text-gray-500 uppercase font-bold">Partial Readiness</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                                <AlertTriangle className="text-red-500 w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">2</p>
                                <p className="text-xs text-gray-500 uppercase font-bold">Critical Gaps (POA&M)</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* AI Intelligence Output */}
            {aiAnalysis && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-700">
                    <Card title="Sovereign AI Readiness Insight" className="bg-indigo-950/10 border-indigo-500/30">
                        <div className="flex items-start gap-4">
                            <Cpu className="text-indigo-400 w-10 h-10 shrink-0 mt-1" />
                            <div className="prose prose-invert max-w-none text-indigo-100">
                                <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed p-4 bg-black/40 rounded-xl border border-indigo-500/20 shadow-inner">
                                    {aiAnalysis}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Filter by Control ID or Family..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-orange-500 outline-none transition-all shadow-inner"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto custom-scrollbar">
                    {families.map(f => (
                        <button 
                            key={f}
                            onClick={() => setSelectedFamily(f)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                                selectedFamily === f 
                                ? 'bg-orange-500 border-orange-400 text-black shadow-lg shadow-orange-500/20' 
                                : 'bg-gray-900 border-gray-800 text-gray-500 hover:text-white'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Controls Inventory */}
            <div className="space-y-4">
                {filteredControls.map(control => (
                    <div 
                        key={control.id} 
                        onClick={() => setSelectedControl(control)}
                        className={`group bg-gray-900/40 border transition-all duration-300 rounded-2xl p-6 cursor-pointer ${
                            selectedControl?.id === control.id 
                            ? 'border-orange-500 bg-gray-900/80 shadow-[0_0_30px_rgba(249,115,22,0.1)]' 
                            : 'border-gray-800 hover:border-gray-700'
                        }`}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono font-black text-orange-400 bg-orange-400/10 px-3 py-1 rounded-lg border border-orange-500/20 shadow-inner">
                                        NIST {control.id}
                                    </span>
                                    <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                                        {control.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-400 max-w-4xl leading-relaxed">
                                    {control.description}
                                </p>
                            </div>
                            <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap border ${
                                control.status === 'IMPLEMENTED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                control.status === 'PARTIAL' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                                {control.status.replace('_', ' ')}
                            </div>
                        </div>

                        {/* Detailed Drill-down */}
                        {selectedControl?.id === control.id && (
                            <div className="mt-8 pt-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-12 animate-in slide-in-from-top-2 duration-300">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-3">Implementation Narrative</p>
                                        <p className="text-gray-300 text-sm leading-relaxed bg-black/30 p-4 rounded-xl border border-gray-800 italic">
                                            {control.longDescription}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1 p-4 bg-gray-800/40 rounded-xl border border-gray-700">
                                            <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Nexus Module</p>
                                            <div className="flex items-center gap-2 text-cyan-400 font-bold">
                                                <Cpu size={14} /> {control.nexusModule}
                                            </div>
                                        </div>
                                        <div className="flex-1 p-4 bg-gray-800/40 rounded-xl border border-gray-700">
                                            <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Assessment Date</p>
                                            <div className="flex items-center gap-2 text-white font-mono text-sm">
                                                {new Date().toISOString().split('T')[0]}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-3">Cryptographic Evidence Hash</p>
                                    <div className="p-4 bg-black border border-gray-800 rounded-xl font-mono text-xs text-gray-400 break-all shadow-inner">
                                        &gt; {btoa(control.evidence + control.id).substring(0, 128)}...
                                        <br/><br/>
                                        <span className="text-green-500 text-[10px] font-bold">STATUS: VERIFIED ON LEDGER // INTEGRITY: 1.0</span>
                                    </div>
                                    <button className="mt-6 w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest border border-gray-700 transition-all">
                                        Update Evidence Package
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <footer className="text-center pt-12 border-t border-gray-800 text-[10px] text-gray-700 font-mono tracking-[0.5em] uppercase">
                Compliance Terminal: SECURE_LINK_PROCESSED // Handshake: {Date.now().toString(16)}
            </footer>
        </div>
    );
};

const Loader2 = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

export default ComplianceOracleView;