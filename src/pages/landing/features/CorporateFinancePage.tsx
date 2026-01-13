import React from 'react';
import {
  CorporateCommandView,
  ReconciliationHubView,
} from '../../../components';
import { Card } from '../../../components/ui/card';

const CorporateFinancePage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Corporate Finance Tools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Corporate Command View */}
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Corporate Command</h2>
            <p className="text-gray-600 mb-4">
              Manage and control your corporate financial operations with ease.
              This tool provides a centralized view of key financial metrics and
              allows for efficient decision-making.
            </p>
            <CorporateCommandView />
          </div>
        </Card>

        {/* Reconciliation Hub View */}
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Reconciliation Hub</h2>
            <p className="text-gray-600 mb-4">
              Streamline your reconciliation processes and ensure accuracy in
              your financial records. This hub provides tools for matching
              transactions and resolving discrepancies.
            </p>
            <ReconciliationHubView />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CorporateFinancePage;