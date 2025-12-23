import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Scan, Shield, Lock, ArrowRight, AlertTriangle, Fingerprint, Eye, Terminal, UserPlus, User, Infinity, Building2, Globe } from 'lucide-react';
import { db } from '../lib/SovereignDatabase';

export const LoginView: React.FC = () => {
    const { loginWithCredentials, loginWithBiometrics, loginWithSSO, isAuthenticated, isLoading } = useContext(AuthContext)!;
    const navigate = useNavigate();
    const [email, setEmail] = useState('visionary@sovereign-ai-nexus.io');
    const [password, setPassword] = useState('');
    const [isBiometricScanning, setIsBiometricScanning] = useState(false);
    const [isSSOProcessing, setIsSSOProcessing] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [authMethod, setAuthMethod] = useState<'credentials' | 'biometric' | 'register' | 'sso'>('sso');
    
    // Registration State
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regError, setRegError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    // Simulate Biometric Scan
    const handleBiometricAuth = async () => {
        if (isBiometricScanning) return;
        setIsBiometricScanning(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            setScanProgress(progress);
            if (progress === 100) {
                clearInterval(interval);
                loginWithBiometrics().finally(() => setIsBiometricScanning(false));
            }
        }, 150);
    };

    // Simulate Auth0 SSO Redirect and JWT Handshake
    const handleSSOAuth = async () => {
        if (isSSOProcessing) return;
        setIsSSOProcessing(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setScanProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                loginWithSSO().finally(() => setIsSSOProcessing(false));
            }
        }, 100);
    };

    const handleCredentialAuth = (e: React.FormEvent) => {
        e.preventDefault();
        loginWithCredentials(email, password);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegError('');
        
        if (!regName || !regEmail || !regPassword) {
            setRegError('All fields are required.');
            return;
        }

        try {
            // Register via local DB
            db.registerUser(regName, regEmail, regPassword);
            
            // Auto-login after registration
            const success = await loginWithCredentials(regEmail, regPassword);
            if (!success) {
                setRegError('Registration successful, but auto-login failed. Please log in manually.');
                setAuthMethod('credentials');
            }
        } catch (error: any) {
            setRegError(error.message || 'Registration failed.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-gray-100">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-cyan-900/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-purple-900/10 rounded-full blur-[100px] animate-pulse delay-700" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md z-10 relative perspective-1000">
                <div className="bg-black/60 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-cyan-500/20 hover:border-cyan-500/50">
                    
                    {/* Header */}
                    <div className="p-8 pb-0 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-6">
                            <Infinity className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight mb-2">
                            Infinite Intelligence
                        </h1>
                        <p className="text-sm text-gray-500 uppercase tracking-widest font-mono">Foundation Access Terminal</p>
                    </div>

                    {/* Auth Methods */}
                    <div className="p-8 space-y-6">
                        
                        {/* Auth0 Enterprise SSO */}
                        {authMethod === 'sso' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="text-center space-y-2">
                                    <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                                        <Building2 className="w-5 h-5 text-blue-400" /> Citi Connect SSO
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        Authorize via Auth0 Federated Identity Management
                                    </p>
                                </div>

                                {isSSOProcessing ? (
                                    <div className="space-y-4 py-8">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                                            <div className="text-center">
                                                <p className="text-sm font-mono text-blue-400">SECURE REDIRECT...</p>
                                                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">
                                                    Issuer: citibankdemobusinessinc.us.auth0.com
                                                </p>
                                            </div>
                                        </div>
                                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <button 
                                            onClick={handleSSOAuth}
                                            className="w-full group relative flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                            <Globe className="w-5 h-5" />
                                            Sign in with Citi ID
                                        </button>
                                        <div className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-[10px] font-mono text-gray-500">
                                            <p className="flex justify-between"><span>ALGORITHM:</span> <span>RS256</span></p>
                                            <p className="flex justify-between mt-1"><span>DOMAIN:</span> <span className="truncate ml-4 text-blue-400/70">citibankdemobusinessinc...</span></p>
                                            <p className="flex justify-between mt-1"><span>CLIENT ID:</span> <span className="truncate ml-4 text-blue-400/70">rsBLCcuq5MVA9Dj84N...</span></p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Biometric Scanner */}
                        {authMethod === 'biometric' && (
                            <div className="flex flex-col items-center justify-center space-y-6 py-4 animate-in fade-in zoom-in duration-300">
                                <div 
                                    className="relative w-32 h-32 cursor-pointer group"
                                    onClick={handleBiometricAuth}
                                >
                                    <div className={`absolute inset-0 rounded-full border-2 border-cyan-500/30 ${isBiometricScanning ? 'animate-ping' : ''}`} />
                                    <div className={`absolute inset-2 rounded-full border border-cyan-400/20 ${isBiometricScanning ? 'animate-spin-slow' : ''}`} />
                                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-cyan-950/50 border border-cyan-500/50 group-hover:bg-cyan-900/50 transition-colors">
                                        {isBiometricScanning ? <Scan className="w-12 h-12 text-cyan-400 animate-pulse" /> : <Fingerprint className="w-12 h-12 text-cyan-600 group-hover:text-cyan-400 transition-colors" />}
                                    </div>
                                </div>
                                {isBiometricScanning ? (
                                    <div className="w-full space-y-2">
                                        <div className="flex justify-between text-xs font-mono text-cyan-400"><span>VERIFYING IDENTITY...</span><span>{Math.round(scanProgress)}%</span></div>
                                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 transition-all duration-200" style={{ width: `${scanProgress}%` }} /></div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 animate-pulse">Touch sensor to verify identity</p>
                                )}
                            </div>
                        )}

                        {/* Credential Form */}
                        {authMethod === 'credentials' && (
                            <form onSubmit={handleCredentialAuth} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase">Identity Hash / Email</label>
                                    <div className="relative group">
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 transition-all pl-10" placeholder="identity@foundation.io" disabled={isLoading} />
                                        <Terminal className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase">Security Key</label>
                                    <div className="relative group">
                                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 transition-all pl-10" placeholder="••••••••••••" disabled={isLoading} />
                                        <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50">
                                    {isLoading ? 'Authenticating...' : 'Authenticate'} <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        )}

                        {/* Registration Form */}
                        {authMethod === 'register' && (
                            <form onSubmit={handleRegister} className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                {regError && <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-xs text-red-300">{regError}</div>}
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase">Full Name</label>
                                    <div className="relative">
                                        <input type="text" value={regName} onChange={e => setRegName(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 transition-all pl-10" placeholder="John Doe" required />
                                        <User className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase">Email Address</label>
                                    <div className="relative">
                                        <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 transition-all pl-10" placeholder="you@example.com" required />
                                        <Terminal className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase">Create Password</label>
                                    <div className="relative">
                                        <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 transition-all pl-10" placeholder="••••••••••••" required />
                                        <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-500 transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50">
                                    {isLoading ? 'Processing...' : 'Apply for Membership'} <UserPlus className="w-4 h-4" />
                                </button>
                            </form>
                        )}

                        {/* Footer Controls */}
                        <div className="pt-6 border-t border-gray-800 flex flex-wrap justify-between gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
                            {authMethod !== 'register' ? (
                                <>
                                    <button onClick={() => setAuthMethod('sso')} className={`hover:text-blue-400 transition-colors flex items-center gap-1.5 ${authMethod === 'sso' ? 'text-blue-400' : ''}`}>
                                        <Globe className="w-2.5 h-2.5"/> Enterprise SSO
                                    </button>
                                    <button onClick={() => setAuthMethod('biometric')} className={`hover:text-cyan-400 transition-colors flex items-center gap-1.5 ${authMethod === 'biometric' ? 'text-cyan-400' : ''}`}>
                                        <Fingerprint className="w-2.5 h-2.5"/> Biometrics
                                    </button>
                                    <button onClick={() => setAuthMethod('credentials')} className={`hover:text-white transition-colors flex items-center gap-1.5 ${authMethod === 'credentials' ? 'text-white' : ''}`}>
                                        <Lock className="w-2.5 h-2.5"/> Password
                                    </button>
                                    <button onClick={() => setAuthMethod('register')} className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                                        <UserPlus className="w-2.5 h-2.5"/> Register
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => setAuthMethod('sso')} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <ArrowRight className="w-3 h-3 rotate-180"/> Back to Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
