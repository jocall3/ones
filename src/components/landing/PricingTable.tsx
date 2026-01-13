import React from 'react';

interface PricingTier {
  name: string;
  price: number;
  features: string[];
  cta: string;
}

interface PricingTableProps {
  tiers: PricingTier[];
}

const PricingTable: React.FC<PricingTableProps> = ({ tiers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {tiers.map((tier, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">{tier.name}</h3>
            <p className="text-2xl font-bold text-indigo-600">${tier.price}<span className="text-sm text-gray-500">/mo</span></p>
          </div>
          <div className="p-6">
            <ul className="list-disc pl-5 mb-4">
              {tier.features.map((feature, i) => (
                <li key={i} className="text-gray-700 text-sm mb-2">{feature}</li>
              ))}
            </ul>
            <button className="block w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {tier.cta}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingTable;