import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  Lock, 
  Shield, 
  Database, 
  Eye, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const TechnologySection = () => {
  const steps = [
    {
      icon: Key,
      title: 'Client-Side Encryption',
      description: 'Your encryption key is processed entirely in your browser using Web Crypto API',
      badge: 'AES-256',
      color: 'text-web3-teal'
    },
    {
      icon: Lock,
      title: 'Zero-Knowledge Architecture', 
      description: 'Your notes are encrypted before leaving your device. We never see your data.',
      badge: 'Private',
      color: 'text-web3-blue'
    },
    {
      icon: Database,
      title: 'Distributed Storage',
      description: 'Encrypted data is stored across distributed nodes for maximum availability',
      badge: 'Blockchain',
      color: 'text-web3-purple'
    },
    {
      icon: Shield,
      title: 'Cryptographic Verification',
      description: 'Every note is cryptographically signed and verified for authenticity',
      badge: 'Verified',
      color: 'text-green-500'
    }
  ];

  const techFeatures = [
    'No server-side decryption',
    'Quantum-resistant encryption',
    'Immutable note history',
    'Cross-platform compatibility',
    'Open-source verification',
    'Decentralized architecture'
  ];

  return (
    <section id="technology" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="text-gradient-web3">Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built on cutting-edge cryptographic principles and blockchain technology 
            to ensure your notes remain private, secure, and always accessible.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="glass-card hover-lift h-full">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className={`inline-flex p-3 rounded-full bg-gradient-web3 mb-4`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="mb-3">
                        {step.badge}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-3 text-lg">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground animate-pulse-web3" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Security Features</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security meets decentralized infrastructure
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {techFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};