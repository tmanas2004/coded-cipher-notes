import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { motion } from 'framer-motion';
import CryptoJS from 'crypto-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Trash2,
  Shield, 
  Key,
  Wallet,
  FileText,
  CheckCircle
} from 'lucide-react';

const Notepad = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { ready, authenticated, user, login } = usePrivy();
  
  const [encryptionKey, setEncryptionKey] = useState('');
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Get temporary encryption key from session storage
    const tempKey = sessionStorage.getItem('tempEncryptionKey');
    if (tempKey) {
      setEncryptionKey(tempKey);
      setIsNotepadOpen(true);
      sessionStorage.removeItem('tempEncryptionKey');
    }
  }, []);

  // Auto-encrypt content
  const encryptContent = useCallback((content: string) => {
    if (!content.trim() || !encryptionKey.trim()) return '';
    try {
      return CryptoJS.AES.encrypt(content, encryptionKey).toString();
    } catch (error) {
      console.error('Encryption error:', error);
      return '';
    }
  }, [encryptionKey]);

  const handleOpenNotepad = () => {
    if (!encryptionKey.trim()) {
      toast({
        title: "Encryption key required",
        description: "Please enter your encryption key to open the notepad.",
        variant: "destructive"
      });
      return;
    }
    setIsNotepadOpen(true);
    toast({
      title: "Notepad opened",
      description: "Your encrypted notepad is ready. All content will be automatically encrypted.",
    });
  };

  const handleSave = async () => {
    if (!noteContent.trim()) {
      toast({
        title: "Nothing to save",
        description: "Please enter some content before saving.",
        variant: "destructive"
      });
      return;
    }

    if (!authenticated) {
      toast({
        title: "Connect wallet first",
        description: "Please connect your wallet to save to blockchain.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    
    try {
      // Auto-encrypt before saving
      const encrypted = encryptContent(noteContent);
      
      if (!encrypted) {
        throw new Error('Failed to encrypt content');
      }

      // Simulate blockchain save
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store in localStorage for demo
      const noteData = {
        id: Date.now().toString(),
        content: encrypted,
        timestamp: new Date().toISOString(),
        hash: CryptoJS.SHA256(encrypted).toString()
      };
      
      localStorage.setItem('savedNote', JSON.stringify(noteData));
      
      toast({
        title: "Note saved to blockchain",
        description: "Your encrypted note has been stored securely.",
      });
    } catch (error) {
      console.error('Error saving to blockchain:', error);
      toast({
        title: "Save failed",
        description: "Failed to save to blockchain. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (noteContent.trim()) {
      if (window.confirm('You have unsaved content. Are you sure you want to close?')) {
        setIsNotepadOpen(false);
        setNoteContent('');
      }
    } else {
      setIsNotepadOpen(false);
    }
  };

  const handleNukePad = () => {
    if (window.confirm('This will permanently delete all content. Are you sure?')) {
      setNoteContent('');
      localStorage.removeItem('savedNote');
      toast({
        title: "Notepad nuked",
        description: "All content has been permanently deleted.",
        variant: "destructive"
      });
    }
  };

  // Key Setup Screen
  if (!isNotepadOpen) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/')}
                  className="hover-scale"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h1 className="text-xl font-bold text-gradient-web3">Encrypted Notepad</h1>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {ready && authenticated && user ? (
                  <div className="flex items-center space-x-2 glass-card px-3 py-2">
                    <Wallet className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono">
                      {user.wallet?.address ? 
                        `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : 
                        'Connected'
                      }
                    </span>
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
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Key className="w-6 h-6 text-primary" />
                  <span>Enter Encryption Key</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Enter your encryption key to open your secure notepad
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Input
                    type="password"
                    placeholder="Enter your encryption key..."
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                    className="font-mono text-center"
                    onKeyPress={(e) => e.key === 'Enter' && handleOpenNotepad()}
                  />
                </div>

                <Button
                  onClick={handleOpenNotepad}
                  disabled={!encryptionKey.trim()}
                  className="w-full bg-gradient-web3 hover-scale"
                  size="lg"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Open Secure Notepad
                </Button>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-primary mt-0.5" />
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium mb-1">Security Notice</p>
                      <p>Your encryption key is never stored. All content is automatically encrypted before saving to blockchain.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Notepad Interface
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Notepad Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <h1 className="text-lg font-bold text-gradient-web3">Secure Notepad</h1>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {ready && authenticated && user && (
                <div className="flex items-center space-x-2 glass-card px-2 py-1 text-xs">
                  <Wallet className="w-3 h-3 text-primary" />
                  <span className="font-mono">
                    {user.wallet?.address ? 
                      `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : 
                      'Connected'
                    }
                  </span>
                </div>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
                className="hover-scale"
              >
                <X className="w-4 h-4 mr-1" />
                Close
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Notepad Content Area */}
      <div className="flex-1 container mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-full"
        >
          <Card className="glass-card h-full flex flex-col">
            <CardContent className="flex-1 p-6 flex flex-col">
              <Textarea
                placeholder="Start typing your secure notes here... Everything is automatically encrypted."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="flex-1 resize-none border-none focus-visible:ring-0 bg-transparent text-base leading-relaxed"
                style={{ minHeight: 'calc(100vh - 200px)' }}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <footer className="border-t border-border bg-background/80 backdrop-blur-md sticky bottom-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Characters: {noteContent.length}</span>
              <span>•</span>
              <span>Auto-encrypted with AES-256</span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNukePad}
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Nuke Pad
              </Button>

              <Button
                onClick={handleSave}
                disabled={!noteContent.trim() || !authenticated || saving}
                className="bg-gradient-web3 hover-scale"
                size="sm"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save to Blockchain
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Notepad;