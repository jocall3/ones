import React from 'react';
import StripeNexusDashboard from '../../../../components/StripeNexusDashboard';

/**
 * StripeNexusDashboardPage
 * 
 * This component serves as the main page for the Stripe Nexus Dashboard.
 * It wraps the core StripeNexusDashboard component, providing a dedicated route
 * and potentially page-specific layout or context in the future.
 * 
 * It's designed to be used within a routing system (like React Router) to display
 * the Stripe Nexus integration's primary interface.
 */
const StripeNexusDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <StripeNexusDashboard />
    </div>
  );
};

export default StripeNexusDashboardPage;