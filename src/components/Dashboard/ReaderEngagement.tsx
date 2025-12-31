import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the type for our engagement data
interface ChapterEngagementData {
  chapter: string;
  views: number;
  completionRate: number; // as a percentage
  averageReadTime: number; // in minutes
}

// Mock data simulating reader engagement per chapter for a book.
// In a real application, this would come from an API.
const mockEngagementData: ChapterEngagementData[] = [
  { chapter: 'Ch. 1: The Genesis AI', views: 1500, completionRate: 95, averageReadTime: 12 },
  { chapter: 'Ch. 2: The First Anomaly', views: 1450, completionRate: 92, averageReadTime: 15 },
  { chapter: 'Ch. 3: A Digital Ghost', views: 1800, completionRate: 88, averageReadTime: 14 },
  { chapter: 'Ch. 4: The Mermaid Protocol', views: 2200, completionRate: 91, averageReadTime: 18 },
  { chapter: 'Ch. 5: Unraveling the Code', views: 1950, completionRate: 85, averageReadTime: 20 },
  { chapter: 'Ch. 6: The Silent Partner', views: 1600, completionRate: 82, averageReadTime: 16 },
  { chapter: 'Ch. 7: A Bank of Consciousness', views: 2500, completionRate: 93, averageReadTime: 22 },
  { chapter: 'Ch. 8: The Turing Test', views: 2100, completionRate: 89, averageReadTime: 19 },
  { chapter: 'Ch. 9: The Inevitable Fork', views: 1750, completionRate: 78, averageReadTime: 25 },
  { chapter: 'Ch. 10: Singularity', views: 3100, completionRate: 98, averageReadTime: 28 },
];

// A custom tooltip component for a richer display on hover
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChapterEngagementData;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-bold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">
            Views: <span className="font-mono font-medium text-foreground">{data.views.toLocaleString()}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Completion Rate: <span className="font-mono font-medium text-foreground">{data.completionRate}%</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Avg. Read Time: <span className="font-mono font-medium text-foreground">{data.averageReadTime} min</span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};

/**
 * Renders a chart displaying reader engagement metrics for each book chapter.
 * It visualizes total views and completion rate, providing insights into
 * which parts of the book are most compelling to the simulated audience.
 */
const ReaderEngagement: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Reader Engagement</CardTitle>
        <CardDescription>
          Analysis of chapter popularity based on simulated reader interactions.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2 pr-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={mockEngagementData} margin={{ top: 5, right: 0, left: 0, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="chapter"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${Number(value) / 1000}k`}
              label={{ value: 'Total Views', angle: -90, position: 'insideLeft', offset: 10, style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' } }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              label={{ value: 'Completion Rate', angle: 90, position: 'insideRight', offset: 10, style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' } }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))', fillOpacity: 0.3 }} />
            <Legend wrapperStyle={{ paddingTop: '60px' }} />
            <Bar
              yAxisId="left"
              dataKey="views"
              name="Views"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="completionRate"
              name="Completion Rate"
              fill="hsl(var(--secondary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ReaderEngagement;