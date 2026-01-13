import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Zap, Shield, Globe, Cpu, TrendingUp } from "lucide-react";

// Define the structure for a feature item
interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  link?: string;
}

// Mock data for the feature grid, reflecting the massive scope of the project
const features: FeatureItem[] = [
  {
    icon: Cpu,
    title: "AI Core Engine",
    description: "Leverage proprietary AI models for forecasting, risk assessment, and dynamic strategy generation.",
    link: "/ai-insights",
  },
  {
    icon: Zap,
    title: "Real-Time Webhook Processing",
    description: "Instantly process incoming data streams and webhooks without relying on external servers.",
    link: "/api-status",
  },
  {
    icon: Shield,
    title: "Zero-Trust Compliance",
    description: "Built-in security and compliance checks integrated directly into every transaction layer.",
    link: "/security-compliance",
  },
  {
    icon: Globe,
    title: "Global Market Synthesis",
    description: "Aggregate and analyze data across diverse global markets, from traditional finance to digital assets.",
    link: "/global-market-map",
  },
  {
    icon: BookOpen,
    title: "The Infinite Book",
    description: "Access the massive, interconnected documentation and knowledge base directly within the application.",
    link: "/knowledge-base",
  },
  {
    icon: TrendingUp,
    title: "Algorithmic Trading Lab",
    description: "Experiment with and deploy complex trading algorithms directly in a sandboxed environment.",
    link: "/algo-trading-lab",
  },
];

const FeatureGrid: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          The Magic Platform: Features at Scale
        </h2>
        <p className="text-xl text-center mb-12 text-gray-600 dark:text-gray-400">
          A serverless architecture designed for massive data ingestion and complex financial logic.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-indigo-500 dark:border-indigo-400">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </CardTitle>
                <feature.icon className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                {feature.link && (
                  <a 
                    href={feature.link} 
                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition duration-150"
                  >
                    Explore Feature &rarr;
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Placeholder for the massive page count indication */}
        <div className="mt-16 text-center">
            <p className="text-lg text-gray-500 dark:text-gray-500">
                ... and over <span className="font-bold text-indigo-500">40+</span> dedicated content pages accessible from the main navigation.
            </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;