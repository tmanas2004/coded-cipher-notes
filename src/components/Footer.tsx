import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  Twitter, 
  Globe, 
  Shield, 
  Code, 
  Lock,
  ExternalLink
} from 'lucide-react';
import cryptoLockIcon from '@/assets/crypto-lock-icon.png';

export const Footer = () => {
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-gray-600' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-blue-400' },
    { icon: Globe, label: 'Website', href: '#', color: 'hover:text-primary' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#policy' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Security', href: '#technology' },
    { label: 'Documentation', href: '#' },
  ];

  const web3Features = [
    { icon: Lock, label: 'Encrypted by default' },
    { icon: Shield, label: 'Zero-knowledge architecture' },
    { icon: Code, label: 'Open source' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={cryptoLockIcon} 
                alt="Coded Pad" 
                className="w-10 h-10 animate-glow"
              />
              <div>
                <h3 className="text-2xl font-bold text-gradient-web3">Coded Pad™</h3>
                <p className="text-sm text-muted-foreground">Encrypted Web3 Notepad</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              The fastest way to save encrypted notes anywhere. Built with zero-knowledge 
              architecture and military-grade encryption for ultimate privacy.
            </p>

            <div className="space-y-3 mb-6">
              {web3Features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`hover-scale ${link.color}`}
                  asChild
                >
                  <a href={link.href} aria-label={link.label}>
                    <link.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6">Quick Links</h4>
            <div className="space-y-3">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Web3 Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6">Web3 Features</h4>
            <div className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">AES-256 Encryption</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Military-grade encryption standard
                </p>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Decentralized</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  No single point of failure
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8 mt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Coded Pad™. Built for privacy and security.
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-web3" />
                <span>All systems operational</span>
              </div>
              
              <a 
                href="#" 
                className="flex items-center space-x-1 hover:text-primary transition-colors"
              >
                <span>Status</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};