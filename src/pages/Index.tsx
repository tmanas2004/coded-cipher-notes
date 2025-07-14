import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { TechnologySection } from '@/components/TechnologySection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PolicySection } from '@/components/PolicySection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  const handleConnectWallet = () => {
    // Simulate wallet connection for demo
    setWalletConnected(true);
    setWalletAddress('0x742d35Cc6bF3A8c3bCf3654E64b1fc7BA7A92A39');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onConnectWallet={handleConnectWallet}
        walletConnected={walletConnected}
        walletAddress={walletAddress}
      />
      <HeroSection />
      <TechnologySection />
      <FeaturesSection />
      <PolicySection />
      <Footer />
    </div>
  );
};

export default Index;
