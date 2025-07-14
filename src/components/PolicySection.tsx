import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Eye, Database, Lock } from 'lucide-react';

export const PolicySection = () => {
  const policies = [
    {
      icon: Eye,
      title: 'We cannot see your data',
      description: 'All encryption happens in your browser. Your notes are encrypted before they ever leave your device.'
    },
    {
      icon: Database,
      title: 'We cannot access your notes',
      description: 'Without your encryption key, your stored notes are just meaningless encrypted data to us.'
    },
    {
      icon: Lock,
      title: 'We cannot recover your keys',
      description: 'If you lose your encryption key, your notes are permanently inaccessible. Choose your key wisely.'
    },
    {
      icon: Shield,
      title: 'We cannot be compelled to decrypt',
      description: 'Since we never have access to your encryption keys, we cannot be forced to decrypt your data.'
    }
  ];

  return (
    <section id="policy" className="py-20 bg-orange-accent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-foreground">
            Simple Policy
          </h2>
          <p className="text-xl text-orange-foreground/80 max-w-3xl mx-auto">
            Our privacy policy is simple: we designed our system so that we 
            <strong> cannot</strong> access your data, even if we wanted to.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover-lift h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-white/20 rounded-full">
                          <policy.icon className="w-6 h-6 text-orange-foreground" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-orange-foreground mb-3">
                          {policy.title}
                        </h3>
                        <p className="text-orange-foreground/80 leading-relaxed">
                          {policy.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-orange-foreground mb-4">
                  Zero-Knowledge Architecture
                </h3>
                <p className="text-orange-foreground/80 text-lg mb-6 max-w-2xl mx-auto">
                  This isn't just a privacy policy promise – it's a technical guarantee. 
                  Our zero-knowledge architecture makes it impossible for us to access your data.
                </p>
                <Button 
                  variant="outline" 
                  className="border-white/30 text-orange-foreground hover:bg-white/10"
                >
                  Read Technical Documentation
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};