import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Lock, Shield, Zap, ArrowRight, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import blockchainBg from '@/assets/blockchain-hero-bg.jpg';

export const HeroSection = () => {
  const [encryptionKey, setEncryptionKey] = useState('');
  const navigate = useNavigate();

  const handleOpenPad = () => {
    if (encryptionKey.trim()) {
      // Store encryption key temporarily and navigate to notepad
      sessionStorage.setItem('tempEncryptionKey', encryptionKey);
      navigate('/notepad');
    }
  };

  const features = [
    { icon: Shield, label: 'Zero Knowledge', color: 'text-web3-blue' },
    { icon: Lock, label: 'AES-256 Encrypted', color: 'text-web3-teal' },
    { icon: Zap, label: 'Instant Access', color: 'text-web3-purple' },
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-gradient-hero grid-pattern overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${blockchainBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              The fastest way to save
              <br />
              <span className="text-gradient-web3">notes anywhere</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-4">
              No accounts. No signups. No installs.
            </p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Your notes are encrypted client-side with military-grade AES-256 encryption. 
              Only you have the key.
            </p>
          </motion.div>

          {/* Features Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 glass-card px-4 py-3 hover-lift"
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-white font-medium">{feature.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Encryption Key Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-md mx-auto mb-8"
          >
            <Card className="glass-card bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-white mb-4">
                    <Key className="w-5 h-5 text-primary" />
                    <label className="font-medium">Enter your encryption key</label>
                  </div>
                  <Input
                    type="password"
                    placeholder="Your secret encryption key..."
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                    className="bg-white/5 border-white/30 text-white placeholder:text-gray-400 focus:border-primary"
                    onKeyPress={(e) => e.key === 'Enter' && handleOpenPad()}
                  />
                  <Button
                    onClick={handleOpenPad}
                    disabled={!encryptionKey.trim()}
                    className="w-full bg-gradient-web3 hover-scale text-white font-medium py-3"
                    size="lg"
                  >
                    Open Encrypted Pad
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm text-gray-400 max-w-lg mx-auto"
          >
            <p>
              🔒 Your encryption key never leaves your device. 
              We cannot recover lost keys or access your notes.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};