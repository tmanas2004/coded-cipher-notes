import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { TechnologySection } from '@/components/TechnologySection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PolicySection } from '@/components/PolicySection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TechnologySection />
      <FeaturesSection />
      <PolicySection />
      <Footer />
    </div>
  );
};

export default Index;
