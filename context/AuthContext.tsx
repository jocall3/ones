import React, { createContext, useState, ReactNode, useCallback, useEffect, useContext } from 'react';
import { User as BaseUser } from '../types';
import { useAuth0 } from '@auth0/auth0-react';

export type UserRole = 'ADMIN' | 'TRADER' | 'CLIENT' | 'VISIONARY' | 'CARETAKER' | 'QUANT_ANALYST' | 'SYSTEM_ARCHITECT' | 'ETHICS_OFFICER' | 'DATA_SCIENTIST' | 'NETWORK_WEAVER' | 'CITIZEN';
export type SecurityLevel = 'STANDARD' | 'ELEVATED' | 'TRADING_UNLOCKED' | 'QUANTUM_ENCRYPTED' | 'SOVEREIGN_CLEARED' | 'ARCHITECT_LEVEL';

export interface User extends BaseUser {
    roles: UserRole[];
    securityLevel: SecurityLevel;
}

interface IAuthContext {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
    loginWithCredentials: (email: string, pass: string) => Promise<boolean>;
    loginWithBiometrics: () => Promise<boolean>;
    loginWithSSO: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { 
        isAuthenticated, 
        user: auth0User, 
        isLoading: auth0Loading, 
        loginWithRedirect, 
        logout: auth0Logout,
        getAccessTokenSilently,
        error: auth0Error
    } = useAuth0();

    const [accessToken, setAccessToken] = useState<string | null>(null);

    // Effect to automatically acquire tokens and refresh them via Rotation
    useEffect(() => {
        const getToken = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently({
                        authorizationParams: {
                            audience: "https://ce47fe80-dabc-4ad0-b0e7-cf285695b8b8.mock.pstmn.io"
                        }
                    });
                    setAccessToken(token);
                } catch (e) {
                    console.warn("Silent token acquisition failed. Handshake interrupted.", e);
                }
            }
        };
        getToken();
    }, [isAuthenticated, getAccessTokenSilently]);

    const mappedUser: User | null = auth0User ? {
        id: auth0User.sub || '',
        name: auth0User.name || '',
        email: auth0User.email || '',
        roles: ['VISIONARY', 'ADMIN'],
        securityLevel: 'ARCHITECT_LEVEL',
        netWorth: 125000000000, // Simulated $125B node
    } : null;

    const loginWithCredentials = async () => {
        await loginWithRedirect();
        return true;
    };

    const loginWithBiometrics = async () => {
        await loginWithRedirect();
        return true;
    };

    const loginWithSSO = async () => {
        await loginWithRedirect({
            authorizationParams: {
                connection: 'citi-connect-enterprise' // Simulated enterprise connection
            }
        });
    };

    const handleLogout = async () => {
        auth0Logout({ 
            logoutParams: { 
                returnTo: window.location.origin 
            } 
        });
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user: mappedUser,
            accessToken,
            isLoading: auth0Loading,
            error: auth0Error?.message || null,
            loginWithCredentials,
            loginWithBiometrics,
            loginWithSSO,
            logout: handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};