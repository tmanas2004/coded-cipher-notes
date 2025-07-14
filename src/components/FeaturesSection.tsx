import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Wallet, 
  Shield, 
  Globe, 
  Zap, 
  Lock, 
  Database,
  Eye,
  Key
} from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Wallet,
      title: 'No Wallets Needed',
      description: 'Start taking encrypted notes immediately without any wallet setup or cryptocurrency requirements.',
      benefits: ['Instant access', 'No gas fees', 'Browser-based'],
      color: 'from-web3-teal to-web3-blue'
    },
    {
      icon: Shield,
      title: 'Cryptographic Security',
      description: 'Military-grade AES-256 encryption ensures your notes remain completely private and secure.',
      benefits: ['End-to-end encryption', 'Zero-knowledge', 'Quantum-resistant'],
      color: 'from-web3-blue to-web3-purple'
    },
    {
      icon: Globe,
      title: 'Distributed Access',
      description: 'Access your encrypted notes from anywhere in the world with blockchain-backed availability.',
      benefits: ['Global access', 'No downtime', 'Decentralized'],
      color: 'from-web3-purple to-web3-teal'
    }
  ];

  const securityFeatures = [
    { icon: Lock, title: 'Client-Side Encryption', desc: 'Keys never leave your device' },
    { icon: Eye, title: 'Zero Knowledge', desc: 'We cannot see your data' },
    { icon: Database, title: 'Immutable Storage', desc: 'Blockchain-backed integrity' },
    { icon: Key, title: 'Self-Custody', desc: 'You control your encryption keys' }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Main Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient-web3">Coded Pad™</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the perfect blend of simplicity and security with our 
            next-generation encrypted notepad technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card hover-lift h-full group">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse-web3" />
                        <span className="text-sm font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Security First</h3>
            <p className="text-muted-foreground text-lg">
              Built with privacy and security as core principles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card hover-lift text-center h-full">
                  <CardContent className="p-6">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};