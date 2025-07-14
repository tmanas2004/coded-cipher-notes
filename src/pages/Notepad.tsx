import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CryptoJS from 'crypto-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Lock, 
  Unlock, 
  Save, 
  Download, 
  Upload, 
  Shield, 
  Key,
  Wallet,
  Database,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Notepad = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [encryptionKey, setEncryptionKey] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [encryptedContent, setEncryptedContent] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get temporary encryption key from session storage
    const tempKey = sessionStorage.getItem('tempEncryptionKey');
    if (tempKey) {
      setEncryptionKey(tempKey);
      sessionStorage.removeItem('tempEncryptionKey');
    }

    // Simulate wallet connection check
    const connected = localStorage.getItem('walletConnected');
    if (connected) {
      setWalletConnected(true);
      setWalletAddress('0x742d35Cc6bF3A8c3bCf3654E64b1fc7BA7A92A39');
    }
  }, []);

  const handleEncrypt = () => {
    if (!noteContent.trim()) {
      toast({
        title: "No content to encrypt",
        description: "Please enter some text first.",
        variant: "destructive"
      });
      return;
    }

    if (!encryptionKey.trim()) {
      toast({
        title: "Encryption key required",
        description: "Please enter your encryption key.",
        variant: "destructive"
      });
      return;
    }

    try {
      const encrypted = CryptoJS.AES.encrypt(noteContent, encryptionKey).toString();
      setEncryptedContent(encrypted);
      setIsEncrypted(true);
      
      toast({
        title: "Note encrypted successfully",
        description: "Your note has been encrypted with AES-256.",
      });
    } catch (error) {
      toast({
        title: "Encryption failed",
        description: "Failed to encrypt your note. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDecrypt = () => {
    if (!encryptedContent.trim()) {
      toast({
        title: "No encrypted content",
        description: "Please load or enter encrypted content first.",
        variant: "destructive"
      });
      return;
    }

    if (!encryptionKey.trim()) {
      toast({
        title: "Encryption key required",
        description: "Please enter your encryption key.",
        variant: "destructive"
      });
      return;
    }

    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedContent, encryptionKey);
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedText) {
        throw new Error('Invalid key or corrupted data');
      }
      
      setNoteContent(decryptedText);
      setIsEncrypted(false);
      
      toast({
        title: "Note decrypted successfully",
        description: "Your note has been decrypted and is ready to edit.",
      });
    } catch (error) {
      toast({
        title: "Decryption failed",
        description: "Invalid encryption key or corrupted data.",
        variant: "destructive"
      });
    }
  };

  const handleSaveToBlockchain = async () => {
    if (!encryptedContent) {
      toast({
        title: "Encrypt first",
        description: "Please encrypt your note before saving to blockchain.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    
    // Simulate blockchain save
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store in localStorage for demo
    const noteData = {
      id: Date.now().toString(),
      content: encryptedContent,
      timestamp: new Date().toISOString(),
      hash: CryptoJS.SHA256(encryptedContent).toString()
    };
    
    localStorage.setItem('savedNote', JSON.stringify(noteData));
    
    setSaving(false);
    
    toast({
      title: "Note saved to blockchain",
      description: "Your encrypted note has been stored securely.",
    });
  };

  const handleLoadFromBlockchain = async () => {
    setLoading(true);
    
    // Simulate blockchain load
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Load from localStorage for demo
    const savedNote = localStorage.getItem('savedNote');
    
    if (savedNote) {
      const noteData = JSON.parse(savedNote);
      setEncryptedContent(noteData.content);
      setIsEncrypted(true);
      
      toast({
        title: "Note loaded from blockchain",
        description: "Your encrypted note has been retrieved.",
      });
    } else {
      toast({
        title: "No saved notes found",
        description: "No notes found on the blockchain for this address.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  const handleConnectWallet = () => {
    setWalletConnected(true);
    setWalletAddress('0x742d35Cc6bF3A8c3bCf3654E64b1fc7BA7A92A39');
    localStorage.setItem('walletConnected', 'true');
    
    toast({
      title: "Wallet connected",
      description: "You can now save notes to the blockchain.",
    });
  };

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
              {walletConnected ? (
                <div className="flex items-center space-x-2 glass-card px-3 py-2">
                  <Wallet className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
              ) : (
                <Button 
                  onClick={handleConnectWallet}
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Note Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="w-5 h-5 text-primary" />
                  <span>Note Input & Encryption</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Encryption Key */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Encryption Key
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your encryption key..."
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                    className="font-mono"
                  />
                </div>

                {/* Note Content */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Note Content
                  </label>
                  <Textarea
                    placeholder="Enter your private notes here..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="min-h-[300px] resize-none"
                  />
                </div>

                {/* Encryption Controls */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleEncrypt}
                    disabled={!noteContent.trim() || !encryptionKey.trim()}
                    className="bg-gradient-web3 hover-scale"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Encrypt Note
                  </Button>
                  
                  <Button
                    onClick={handleDecrypt}
                    variant="outline"
                    disabled={!encryptedContent.trim() || !encryptionKey.trim()}
                  >
                    <Unlock className="w-4 h-4 mr-2" />
                    Decrypt Note
                  </Button>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2">
                  {isEncrypted ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Note is encrypted</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-yellow-600">Note is not encrypted</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Blockchain Storage Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-primary" />
                  <span>Blockchain Storage</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Encrypted Content Display */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Encrypted Content
                  </label>
                  <Textarea
                    placeholder="Encrypted data will appear here..."
                    value={encryptedContent}
                    onChange={(e) => setEncryptedContent(e.target.value)}
                    className="min-h-[200px] font-mono text-xs resize-none"
                  />
                </div>

                {/* Blockchain Actions */}
                <div className="space-y-4">
                  <Button
                    onClick={handleSaveToBlockchain}
                    disabled={!encryptedContent || !walletConnected || saving}
                    className="w-full bg-gradient-web3 hover-scale"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Saving to Blockchain...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save to Blockchain
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleLoadFromBlockchain}
                    variant="outline"
                    disabled={!walletConnected || loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                        Loading from Blockchain...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Load from Blockchain
                      </>
                    )}
                  </Button>
                </div>

                {/* Status Indicators */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Wallet Status</span>
                    <Badge variant={walletConnected ? "default" : "secondary"}>
                      {walletConnected ? "Connected" : "Disconnected"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Encryption</span>
                    <Badge variant={isEncrypted ? "default" : "outline"}>
                      {isEncrypted ? "AES-256" : "None"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Network</span>
                    <Badge variant="outline">
                      Polygon Mumbai
                    </Badge>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-primary mt-0.5" />
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium mb-1">Security Notice</p>
                      <p>Your encryption key never leaves this device. Only encrypted data is stored on the blockchain.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Notepad;