
import React, { useCallback, useState, useEffect } from 'react';
import { usePlaidLink, PlaidLinkOnSuccess, PlaidLinkOnExit } from 'react-plaid-link';

interface PlaidLinkButtonProps {
    onSuccess: (publicToken: string, metadata: any) => void;
    className?: string;
    label?: string;
    disabled?: boolean;
    // Optional: Pass link token directly if managed by parent
    linkToken?: string;
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ 
    onSuccess, 
    className, 
    label = "Connect Bank Account", 
    disabled,
    linkToken: propLinkToken
}) => {
    const [token, setToken] = useState<string | null>(propLinkToken || null);
    const [loading, setLoading] = useState(!propLinkToken);

    // Effect to fetch link token if not provided via props
    useEffect(() => {
        if (propLinkToken) {
            setToken(propLinkToken);
            setLoading(false);
            return;
        }

        const createLinkToken = async () => {
            setLoading(true);
            try {
                // NOTE: In a real production app, this endpoint MUST exist on your backend.
                // It calls Plaid API's /link/token/create to generate a secure token.
                const response = await fetch('/api/create_link_token', { method: 'POST' });
                
                if (!response.ok) {
                    // Fallback for demo/no-backend environments to prevent crash
                    // In a real live environment, this would just be an error.
                    console.warn("Backend endpoint /api/create_link_token not reachable.");
                    return; 
                }

                const data = await response.json();
                setToken(data.link_token);
            } catch (error) {
                console.error("Error fetching Plaid Link Token:", error);
            } finally {
                setLoading(false);
            }
        };

        createLinkToken();
    }, [propLinkToken]);

    const onSuccessHandler: PlaidLinkOnSuccess = useCallback((public_token, metadata) => {
        // Send public_token to your backend to exchange for access_token
        onSuccess(public_token, metadata);
    }, [onSuccess]);

    const onExit: PlaidLinkOnExit = useCallback((error, metadata) => {
        if (error) {
            console.error("Plaid Link Exit Error:", error);
        }
        // Handle user exit (optional)
    }, []);

    const config = {
        token: token,
        onSuccess: onSuccessHandler,
        onExit: onExit,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <button
            onClick={() => open()}
            disabled={!ready || disabled || loading}
            className={`group relative flex justify-center items-center py-4 px-6 border border-gray-800 rounded-xl shadow-2xl text-sm font-bold text-white bg-black overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${className || ''}`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="relative flex items-center z-10">
                {/* Plaid Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-3 text-cyan-400 group-hover:text-white transition-colors">
                    <path d="M16.5 10.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5Z" fill="currentColor"></path>
                    <path d="M12.75 10.5c0 2.761-2.239 5-5 5s-5-2.239-5-5 2.239-5 5-5 5 2.239 5 5ZM7.75 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor"></path>
                    <path d="M21.25 10.5c0 2.761-2.239 5-5 5s-5-2.239-5-5 2.239-5 5-5 5 2.239 5 5ZM16.25 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor"></path>
                </svg>
                <span>{loading ? "INITIALIZING SECURE LINK..." : label}</span>
            </div>
        </button>
    );
};

export default PlaidLinkButton;
