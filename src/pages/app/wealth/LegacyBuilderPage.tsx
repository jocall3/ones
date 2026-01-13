import React from 'react';
import { LegacyBuilder } from '../../../../components/LegacyBuilder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card';

/**
 * LegacyBuilderPage component
 * 
 * This page serves as the primary interface for users to engage with legacy and estate planning tools.
 * It prominently features the LegacyBuilder component, which contains the core logic and UI for
 * creating and managing a user's financial legacy.
 */
const LegacyBuilderPage: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Legacy & Estate Planning
        </h1>
        <p className="text-muted-foreground mt-2">
          Design and manage your long-term financial legacy. Plan your estate, define beneficiaries, and outline your philanthropic goals.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Legacy Builder</CardTitle>
          <CardDescription>
            An interactive dashboard to construct and visualize your estate plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LegacyBuilder />
        </CardContent>
      </Card>
    </div>
  );
};

export default LegacyBuilderPage;