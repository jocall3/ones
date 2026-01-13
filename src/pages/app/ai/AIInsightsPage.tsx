import React from 'react';
import AIInsights from '../../../../components/ai/AIInsights';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card';

/**
 * AIInsightsPage
 * 
 * This page serves as the main dashboard for viewing AI-generated insights.
 * It provides a structured layout for the AIInsights component, which contains
 * the core logic for fetching and displaying analytics, predictions, and recommendations.
 */
const AIInsightsPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Insights Dashboard</h2>
      </div>
      <p className="text-muted-foreground">
        Explore real-time analytics, predictive models, and actionable recommendations powered by our advanced AI engine.
      </p>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Insights Feed</CardTitle>
            <CardDescription>
              Continuous stream of insights generated from your connected data sources.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {/* The main AIInsights component is rendered here */}
            <AIInsights />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIInsightsPage;