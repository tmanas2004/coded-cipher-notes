import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield, Wallet } from 'lucide-react';
import cryptoLockIcon from '@/assets/crypto-lock-icon.png';

interface NavigationProps {}

export const Navigation = ({}: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { ready, authenticated, user, login, logout } = usePrivy();

  const navLinks = [
    { label: 'How it Works', href: '#technology' },
    { label: 'Simple Policy', href: '#policy' },
  ];

  const NavContent = () => (
    <>
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-foreground hover:text-primary transition-colors font-medium"
          onClick={() => setMobileMenuOpen(false)}
        >
          {link.label}
        </a>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={cryptoLockIcon} 
              alt="Coded Pad" 
              className="w-8 h-8 animate-glow"
            />
            <h1 className="text-2xl font-bold text-gradient-web3">
              Coded Pad™
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavContent />
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {ready && authenticated && user ? (
              <div className="hidden sm:flex items-center space-x-2 glass-card px-3 py-2">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono">
                  {user.wallet?.address ? 
                    `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : 
                    'Connected'
                  }
                </span>
                <Button 
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-6 text-xs"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button 
                onClick={login}
                disabled={!ready}
                className="bg-gradient-web3 hover-scale"
                size="sm"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="sm">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Coded Pad™</span>
                  </div>
                  
                  <div className="flex flex-col space-y-4">
                    <NavContent />
                  </div>

                  {!authenticated && (
                    <Button 
                      onClick={() => {
                        login();
                        setMobileMenuOpen(false);
                      }}
                      disabled={!ready}
                      className="bg-gradient-web3 w-full"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};