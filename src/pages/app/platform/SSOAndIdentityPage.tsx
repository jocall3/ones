import React from 'react';
import SSOView from '../../../components/SSOView';
import { useAuth } from '../../../context/AuthContext';
import { useData } from '../../../context/DataContext';

/**
 * SSOAndIdentityPage component for managing Single Sign-On and Identity settings.
 * This page leverages the SSOView component from the components directory.
 */
const SSOAndIdentityPage: React.FC = () => {
  // Assuming useAuth provides user identity context and SSO status
  const { user, isAuthenticated } = useAuth();
  
  // Assuming useData provides access to system configuration or identity providers data
  const { systemConfig } = useData();

  if (!isAuthenticated || !user) {
    // In a real application, this might redirect to login or show an unauthorized message
    return <div>Please log in to manage SSO and Identity settings.</div>;
  }

  // Extract relevant data for SSOView if necessary, otherwise pass down context/user info
  const identityProviders = systemConfig?.identityProviders || [];
  const currentUserProfile = user;

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">SSO & Identity Management</h1>
      
      {/* The core logic for SSO and Identity management resides in SSOView */}
      <SSOView 
        currentUserProfile={currentUserProfile}
        identityProviders={identityProviders}
        // Placeholder for any necessary API handlers or state management passed down
        onUpdateSsoConfig={(config) => console.log('SSO Config Updated:', config)}
        onManageUserIdentity={(userId, action) => console.log(`Managing identity for ${userId}: ${action}`)}
      />
      
      {/* Additional context or related components could go here if SSOView doesn't cover everything */}
    </div>
  );
};

export default SSOAndIdentityPage;