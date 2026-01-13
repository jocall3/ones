import React from 'react';
import { Button } from '../ui/button';

interface HeroSectionProps {
  headline: string;
  subheading: string;
  ctaText: string;
  onCtaClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  subheading,
  ctaText,
  onCtaClick,
}) => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">{headline}</h1>
        <p className="text-xl text-gray-700 mb-8">{subheading}</p>
        <Button size="lg" onClick={onCtaClick}>
          {ctaText}
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;