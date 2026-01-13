import React from 'react';
import APIIntegrationView from '../../../../components/APIIntegrationView';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card';

/**
 * APIStatusPage
 * 
 * Purpose:
 * This page serves as the central hub for monitoring the status of various API integrations
 * and managing them. It leverages the `APIIntegrationView` component to display the core
 * functionality.
 * 
 * Structure:
 * - A main container with padding for consistent layout.
 * - A prominent title for the page.
 * - A `Card` component to encapsulate the integration management view.
 * - The `CardHeader` provides a title and description for the section.
 * - The `CardContent` holds the primary component, `APIIntegrationView`.
 * 
 * Usage:
 * This component is intended to be routed to a path like `/app/platform/api-status`
 * within the application's routing structure.
 */
const APIStatusPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">API Status & Integrations</h2>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Integration Management</CardTitle>
          <CardDescription>
            Monitor service health, manage API keys, and configure your integrations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <APIIntegrationView />
        </CardContent>
      </Card>
    </div>
  );
};

export default APIStatusPage;