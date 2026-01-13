import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, CreditCard, Zap, Shield, Users, Globe, GitBranch } from 'lucide-react';

// In a real app, this would be an SVG or Image component
const MarqetaLogo = () => (
  <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700 dark:text-gray-300">
    <text x="10" y="30" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="currentColor">
      MARQETA
    </text>
  </svg>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card className="text-center bg-white/5 backdrop-blur-sm border-white/10">
    <CardHeader>
      <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
        {icon}
      </div>
      <CardTitle className="mt-4 text-xl font-semibold text-white">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-300">{description}</p>
    </CardContent>
  </Card>
);

const UseCaseCard = ({ title, description }: { title: string; description: string }) => (
    <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
        <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="mt-2 text-gray-400">
            {description}
        </p>
    </div>
);


const CardIssuingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Modern Card Issuing for Any Use Case
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Instantly create, manage, and control physical and virtual cards with our powerful, API-first platform. Launch innovative payment solutions faster than ever before.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Request a Demo</Button>
            <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800">Explore Documentation</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Everything You Need to Build</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Our platform provides the building blocks for creating sophisticated card programs with unparalleled speed and flexibility.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap size={24} />}
              title="Instant Issuance"
              description="Create and issue virtual cards in real-time via API, ready for immediate use in digital wallets."
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="Dynamic Spend Controls"
              description="Set granular, just-in-time funding and authorization rules for every transaction to minimize fraud."
            />
            <FeatureCard
              icon={<CreditCard size={24} />}
              title="Physical & Virtual Cards"
              description="Offer both physical and virtual cards, customized with your branding, to fit any user need."
            />
            <FeatureCard
              icon={<Users size={24} />}
              title="Multi-Level Hierarchy"
              description="Manage complex organizational structures with parent-child relationships for users and accounts."
            />
            <FeatureCard
              icon={<GitBranch size={24} />}
              title="Real-Time Webhooks"
              description="Receive instant notifications for every card event, from authorization to settlement."
            />
            <FeatureCard
              icon={<Globe size={24} />}
              title="Global by Design"
              description="Issue cards and manage programs in multiple currencies and countries with a single integration."
            />
          </div>
        </div>
      </section>

      {/* Powered by Marqeta Section */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">BUILT ON INDUSTRY-LEADING INFRASTRUCTURE</p>
            <div className="flex justify-center items-center gap-4 mb-6">
                <span className="text-2xl font-bold">Powered by</span>
                <MarqetaLogo />
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                We partner with Marqeta, the global standard for modern card issuing, to provide you with the most reliable, scalable, and secure payment infrastructure. This means you get best-in-class performance and compliance without the complexity.
            </p>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Unlock New Possibilities</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            From startups to enterprises, companies use our card issuing platform to power innovative financial products and streamline operations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UseCaseCard
              title="Corporate Expense Management"
              description="Issue employee cards with built-in spending policies, simplifying reconciliation and eliminating expense reports."
            />
            <UseCaseCard
              title="On-Demand Disbursements"
              description="Pay gig workers, contractors, or marketplace sellers instantly with virtual or physical cards."
            />
            <UseCaseCard
              title="Loyalty & Rewards Programs"
              description="Create branded card programs that drive customer engagement and provide flexible reward redemption options."
            />
            <UseCaseCard
              title="Embedded Finance"
              description="Enable your customers to make payments directly from your platform with a white-labeled card experience."
            />
             <UseCaseCard
              title="Clinical Trial Payouts"
              description="Disburse stipends to trial participants securely and efficiently, with full control and visibility."
            />
             <UseCaseCard
              title="Alternative Lending"
              description="Provide borrowers with immediate access to funds at the point of sale through instantly issued virtual cards."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-950/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Launch Your Card Program in Four Steps</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-700 hidden md:block" aria-hidden="true"></div>
            <div className="space-y-12 md:space-y-0">
              {/* Step 1 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-600 text-white rounded-full font-bold text-xl">1</div>
                  <h3 className="text-2xl font-bold text-white">Define Your Program</h3>
                  <p className="mt-2 text-gray-400">Configure your card product, set up spend controls, and customize your card design using our dashboard or API.</p>
                </div>
                <div className="mt-4 md:mt-0"></div>
              </div>
              {/* Step 2 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:order-2 md:pl-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-600 text-white rounded-full font-bold text-xl">2</div>
                  <h3 className="text-2xl font-bold text-white">Onboard Users & Issue Cards</h3>
                  <p className="mt-2 text-gray-400">Create cardholders and issue virtual or physical cards programmatically with a few lines of code.</p>
                </div>
                <div className="mt-4 md:mt-0 md:order-1"></div>
              </div>
              {/* Step 3 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-600 text-white rounded-full font-bold text-xl">3</div>
                  <h3 className="text-2xl font-bold text-white">Fund and Transact</h3>
                  <p className="mt-2 text-gray-400">Load funds to user accounts and authorize transactions in real-time with our Just-in-Time (JIT) funding gateway.</p>
                </div>
                <div className="mt-4 md:mt-0"></div>
              </div>
              {/* Step 4 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:order-2 md:pl-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-600 text-white rounded-full font-bold text-xl">4</div>
                  <h3 className="text-2xl font-bold text-white">Monitor and Manage</h3>
                  <p className="mt-2 text-gray-400">Track every transaction, manage card lifecycles, and gain insights through our comprehensive dashboard and data feeds.</p>
                </div>
                <div className="mt-4 md:mt-0 md:order-1"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gray-800/50 border border-gray-700 rounded-lg p-10">
          <h2 className="text-3xl font-bold text-white">Ready to Build Your Card Program?</h2>
          <p className="mt-4 text-gray-300">
            Talk to our experts to see how our card issuing and processing platform can help you achieve your business goals.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Contact Sales</Button>
            <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800">View API Reference</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardIssuingPage;