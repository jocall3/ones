import React from 'react';
import { BarChart, BrainCircuit, Briefcase, Cpu, DollarSign, FlaskConical, GanttChartSquare, Globe, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
    <CardHeader className="flex flex-row items-center gap-4 pb-2">
      <div className="bg-primary/10 p-2 rounded-lg text-primary">{icon}</div>
      <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-400 text-sm">{description}</p>
    </CardContent>
  </Card>
);

const ForHedgeFundsPage = () => {
  return (
    <div className="w-full bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-center bg-gradient-to-b from-gray-900 to-gray-900/90">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            The OS for Quantitative Alpha
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Harness institutional-grade tools for algorithmic trading, derivatives management, and risk modeling. Go from hypothesis to execution at unprecedented speed.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">Request a Demo</Button>
            <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800">Explore Sandbox</Button>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="container mx-auto px-4 py-16 space-y-24">
        {/* Algo Trading Lab Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold tracking-tight text-white">Algo Trading Lab</h2>
            <p className="mt-4 text-gray-400">
              Design, backtest, and deploy complex trading strategies with our integrated development environment. Leverage AI-powered insights and alternative data to discover new sources of alpha.
            </p>
            <ul className="mt-6 space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <Zap className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <span><strong>High-Frequency Backtesting:</strong> Simulate strategies against historical tick data with nanosecond precision.</span>
              </li>
              <li className="flex items-start gap-3">
                <BrainCircuit className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <span><strong>AI Strategy Co-Pilot:</strong> Utilize generative AI to suggest, refine, and debug trading algorithms in real-time.</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <span><strong>Multi-Asset & Multi-Market:</strong> Deploy strategies across equities, forex, crypto, and commodities from a single interface.</span>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <Card className="bg-gray-800/60 border-gray-700 p-6 shadow-2xl shadow-primary/10">
              <p className="font-mono text-xs text-green-400">// strategy_example.py</p>
              <pre className="font-mono text-sm text-gray-300 mt-2 overflow-x-auto">
                <code>
                  <span className="text-purple-400">from</span> nexus_sdk <span className="text-purple-400">import</span> Strategy, DataFeed<br /><br />
                  <span className="text-purple-400">class</span> <span className="text-yellow-300">MeanReversion</span>(Strategy):<br />
                  &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">initialize</span>(self):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;self.sma_fast = <span className="text-orange-400">20</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;self.sma_slow = <span className="text-orange-400">50</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;self.subscribe(DataFeed.TICK, <span className="text-green-400">'SPY'</span>)<br /><br />
                  &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">on_data</span>(self, data):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;fast_ma = data[<span className="text-green-400">'SPY'</span>].sma(self.sma_fast)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;slow_ma = data[<span className="text-green-400">'SPY'</span>].sma(self.sma_slow)<br /><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> fast_ma > slow_ma:<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.order_target_percent(<span className="text-green-400">'SPY'</span>, <span className="text-orange-400">1.0</span>)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">else</span>:<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.order_target_percent(<span className="text-green-400">'SPY'</span>, <span className="text-orange-400">-1.0</span>)<br />
                </code>
              </pre>
            </Card>
          </div>
        </section>

        {/* Derivatives Desk Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="bg-gray-800/60 border-gray-700 p-6 shadow-2xl shadow-primary/10">
              <CardTitle className="text-white mb-4">Real-time Greeks & PnL</CardTitle>
              <img src="/placeholder-chart.svg" alt="Derivatives PnL Chart" className="w-full h-auto rounded-lg" />
            </Card>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Institutional Derivatives Desk</h2>
            <p className="mt-4 text-gray-400">
              Manage complex multi-leg options strategies and exotic derivatives with our powerful, real-time risk and analytics platform. Price, trade, and hedge with confidence.
            </p>
            <ul className="mt-6 space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <GanttChartSquare className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <span><strong>Scenario Analysis:</strong> Stress-test your portfolio against custom market shocks and volatility shifts.</span>
              </li>
              <li className="flex items-start gap-3">
                <BarChart className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <span><strong>Real-Time Greeks:</strong> Monitor Delta, Gamma, Vega, and Theta across your entire book in real-time.</span>
              </li>
              <li className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <span><strong>Portfolio-Level Hedging:</strong> Automatically calculate and execute optimal hedges to maintain your desired risk profile.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Core Features Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">A Unified Platform for Modern Asset Management</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-400">
              Beyond trading, our platform provides a comprehensive suite of tools to manage every aspect of your fund's operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Cpu className="h-6 w-6" />}
              title="Quantum Oracle"
              description="Leverage quantum-inspired optimization for portfolio construction and complex risk calculations."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Compliance Oracle"
              description="Automate pre- and post-trade compliance checks against a configurable rules engine."
            />
            <FeatureCard
              icon={<FlaskConical className="h-6 w-6" />}
              title="Hypothesis Engine"
              description="Use AI to generate and validate investment theses from unstructured data sources."
            />
            <FeatureCard
              icon={<DollarSign className="h-6 w-6" />}
              title="Treasury & Cash Management"
              description="Optimize cash positions, manage collateral, and automate FX hedging across multiple custodians."
            />
            <FeatureCard
              icon={<Briefcase className="h-6 w-6" />}
              title="Venture Capital & PE Desk"
              description="Track portfolio companies, manage cap tables, and model exit scenarios for illiquid assets."
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6" />}
              title="Global Market Data"
              description="Access real-time and historical data feeds for all major asset classes and exchanges."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to Redefine Your Edge?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Discover how our integrated platform can unlock new opportunities, streamline operations, and give you a decisive advantage in today's markets.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
              Schedule a Personalized Consultation
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ForHedgeFundsPage;