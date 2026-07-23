import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import SelectedWork from '@/components/sections/SelectedWork';
import ResearchHighlight from '@/components/sections/ResearchHighlight';
import CapabilitiesMatrix from '@/components/sections/CapabilitiesMatrix';
import ContactCTA from '@/components/sections/ContactCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SelectedWork />
      <ResearchHighlight />
      <CapabilitiesMatrix />
      <ContactCTA />
    </>
  );
}
