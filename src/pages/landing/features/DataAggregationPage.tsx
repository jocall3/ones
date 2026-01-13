import React from 'react';
import { PlaidLinkButton } from '../../../components/PlaidLinkButton';
import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { Section } from '../../../components/shared/Section';

const DataAggregationPage = () => {
  return (
    <Section title="Unlock the Power of Data Aggregation">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Seamless Integration with Plaid</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Connect to thousands of financial institutions securely and effortlessly using Plaid.
              Our platform simplifies data aggregation, providing you with a unified view of your financial data.
            </p>
            <ul className="list-disc pl-5 mt-4 text-sm text-gray-700">
              <li>Access real-time transaction data</li>
              <li>Automate data imports and reconciliation</li>
              <li>Enhance financial insights and decision-making</li>
            </ul>
            <div className="mt-4">
              <PlaidLinkButton className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Connect Your Accounts
              </PlaidLinkButton>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Benefits of Data Aggregation</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Discover the advantages of consolidating your financial data into a single, accessible platform.
            </p>
            <ul className="list-disc pl-5 mt-4 text-sm text-gray-700">
              <li>
                <strong>Improved Visibility:</strong> Gain a comprehensive overview of your financial health.
              </li>
              <li>
                <strong>Enhanced Efficiency:</strong> Automate manual data entry and reduce errors.
              </li>
              <li>
                <strong>Data-Driven Decisions:</strong> Make informed decisions based on accurate and up-to-date information.
              </li>
              <li>
                <strong>Streamlined Reporting:</strong> Generate insightful reports with ease.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">How It Works</h3>
        <ol className="list-decimal pl-5 text-sm text-gray-700">
          <li>
            <strong>Connect Your Accounts:</strong> Use our secure Plaid integration to link your financial accounts.
          </li>
          <li>
            <strong>Data Synchronization:</strong> Our platform automatically synchronizes your transaction data in real-time.
          </li>
          <li>
            <strong>Analyze and Optimize:</strong> Leverage our powerful tools to analyze your data and optimize your financial strategies.
          </li>
        </ol>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Ready to transform your financial management?
        </p>
        <PlaidLinkButton className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Get Started Today
        </PlaidLinkButton>
      </div>
    </Section>
  );
};

export default DataAggregationPage;