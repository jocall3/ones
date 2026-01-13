import React from 'react';
import { Card } from '../../../components/ui/card';
import { RealEstateEmpire } from '../../../components/RealEstateEmpire';
import { ArtCollectibles } from '../../../components/ArtCollectibles';
import { VentureCapitalDesk } from '../../../components/VentureCapitalDesk';

const AlternativeAssetsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Explore Alternative Assets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Real Estate */}
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Real Estate</h2>
            <p className="text-gray-600 mb-4">
              Invest in properties around the globe. Diversify your portfolio with residential, commercial, and industrial real estate opportunities.
            </p>
            <RealEstateEmpire />
          </div>
        </Card>

        {/* Art Collectibles */}
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Art Collectibles</h2>
            <p className="text-gray-600 mb-4">
              Acquire unique and valuable art pieces. Explore curated collections and invest in emerging artists.
            </p>
            <ArtCollectibles />
          </div>
        </Card>

        {/* Venture Capital */}
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Venture Capital</h2>
            <p className="text-gray-600 mb-4">
              Invest in early-stage companies with high growth potential. Support innovation and be part of the next big thing.
            </p>
            <VentureCapitalDesk />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AlternativeAssetsPage;