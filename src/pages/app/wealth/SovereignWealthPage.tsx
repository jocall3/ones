import React from 'react';
import SovereignWealth from '../../../components/SovereignWealth';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

/**
 * SovereignWealthPage
 * 
 * This page serves as the main entry point for the Sovereign Wealth Management section of the application.
 * It provides a high-level overview and embeds the core SovereignWealth component, which contains
 * the detailed functionality for managing sovereign funds, assets, and investment strategies.
 * 
 * The page is designed to be a container, providing context and a clear heading for the user,
 * while delegating the complex logic and data visualization to the specialized SovereignWealth component.
 */
const SovereignWealthPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
          Sovereign Wealth Management
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Strategic oversight of national assets and long-term investment portfolios.
        </p>
      </header>

      <main>
        <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-gray-900 dark:text-gray-50">
              Global Asset Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* The core component for sovereign wealth management is rendered here. */}
            <SovereignWealth />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SovereignWealthPage;