import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Send, Download, CheckCircle2, Clock, XCircle, WifiOff, CloudOff, QrCode } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWallet } from "@/hooks/useWallet";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const WalletPage = () => {
  const { t } = useLanguage();
  const { balance, transactions, loading, sendPayment, receivePayment, verifyTransaction, getOfflineTransactionsList, removeOfflineTransaction } = useWallet();
  const { isOnline } = useOfflineSync();
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [isReceiveDialogOpen, setIsReceiveDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [offlineTransactions, setOfflineTransactions] = useState<any[]>([]);

  // Send form state
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  // Receive form state
  const [receiveAmount, setReceiveAmount] = useState('');
  const [sender, setSender] = useState('');

  // Verify form state
  const [verifyCode, setVerifyCode] = useState('');

  useEffect(() => {
    const offline = getOfflineTransactionsList();
    setOfflineTransactions(offline);
  }, [transactions, isOnline]);

  const handleSendPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sendAmount || !recipient) {
      toast.error(t('fillAllFields'));
      return;
    }

    await sendPayment(parseFloat(sendAmount), recipient);

    // Reset form
    setSendAmount('');
    setRecipient('');
    setIsSendDialogOpen(false);

    // Refresh offline transactions
    const offline = getOfflineTransactionsList();
    setOfflineTransactions(offline);
  };

  const handleReceivePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!receiveAmount || !sender) {
      toast.error(t('fillAllFields'));
      return;
    }

    await receivePayment(parseFloat(receiveAmount), sender);

    // Reset form
    setReceiveAmount('');
    setSender('');
    setIsReceiveDialogOpen(false);

    // Refresh offline transactions
    const offline = getOfflineTransactionsList();
    setOfflineTransactions(offline);
  };

  const handleVerifyTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    if (!verifyCode) {
      toast.error(t('enterTransactionCode'));
      return;
    }

    const verified = verifyTransaction(verifyCode);
    if (verified) {
      setVerifyCode('');
      setIsVerifyDialogOpen(false);
      const offline = getOfflineTransactionsList();
      setOfflineTransactions(offline);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header with offline banner */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">{t('wallet')}</h1>
            <p className="text-muted-foreground">{t('managePayments')}</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
              <DialogTrigger asChild>
                <Button className="shadow-soft">
                  <Send className="h-4 w-4 mr-2" />
                  {t('sendPayment')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('sendPayment')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSendPayment} className="space-y-4">
                  <div>
                    <Label>{t('amount')}</Label>
                    <Input
                      type="number"
                      placeholder={t('amount')}
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label>{t('recipient')}</Label>
                    <Input
                      placeholder={t('recipient')}
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {isOnline ? t('sendNow') : t('saveOffline')}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isReceiveDialogOpen} onOpenChange={setIsReceiveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" className="shadow-soft">
                  <Download className="h-4 w-4 mr-2" />
                  {t('receivePayment')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('receivePayment')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleReceivePayment} className="space-y-4">
                  <div>
                    <Label>{t('amount')}</Label>
                    <Input
                      type="number"
                      placeholder={t('amount')}
                      value={receiveAmount}
                      onChange={(e) => setReceiveAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label>{t('sender')}</Label>
                    <Input
                      placeholder={t('sender')}
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {isOnline ? t('confirmReceipt') : t('saveOffline')}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="shadow-soft">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  {t('verifyTransaction')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('verifyTransaction')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleVerifyTransaction} className="space-y-4">
                  <div>
                    <Label>{t('transactionCode')}</Label>
                    <Input
                      placeholder="TX-XXXXX"
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {t('verify')}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Offline Mode Banner */}
        {!isOnline && (
          <Card className="p-4 bg-destructive/10 border-destructive/20">
            <div className="flex items-center space-x-3">
              <WifiOff className="h-5 w-5 text-destructive" />
              <div className="flex-1">
                <p className="font-medium text-destructive">{t('offlineMode')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('transactionsSyncMessage')}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Balance Card */}
      <Card className="p-6 shadow-card bg-gradient-primary">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
            <Wallet className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-primary-foreground/80">{t('currentBalance')}</p>
            <p className="text-3xl font-bold text-primary-foreground">₦{balance.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      {/* Offline Pending Transactions */}
      {offlineTransactions.length > 0 && (
        <Card className="p-6 shadow-card border-secondary">
          <div className="flex items-center space-x-2 mb-4">
            <CloudOff className="h-5 w-5 text-secondary" />
            <h3 className="font-bold text-lg">{t('offlineTransactions')}</h3>
            <Badge variant="secondary">{offlineTransactions.length}</Badge>
          </div>
          <div className="space-y-3">
            {offlineTransactions.map((tx) => (
              <div key={tx.transaction_code} className="p-4 bg-muted rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{tx.type === 'send' ? t('sentTo') : t('receivedFrom')}: {tx.recipient || tx.sender}</p>
                    <p className="text-2xl font-bold text-primary">₦{Number(tx.amount).toLocaleString()}</p>
                  </div>
                  <Badge variant={tx.status === 'pending_sync' ? 'secondary' : tx.status === 'offline_verified' ? 'default' : 'outline'}>
                    {tx.status === 'pending_sync' && <Clock className="h-3 w-3 mr-1" />}
                    {tx.status === 'offline_verified' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {tx.status === 'synced' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {tx.status === 'failed' && <XCircle className="h-3 w-3 mr-1" />}
                    {tx.status === 'pending_sync' ? t('pendingSync') : tx.status === 'offline_verified' ? t('offlineVerified') : tx.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{tx.transaction_code}</span>
                  <Badge variant="outline">{tx.type === 'send' ? t('sent') : t('received')}</Badge>
                </div>
                {tx.qr_code && (
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <QrCode className="h-4 w-4 mr-1" />
                    <span>{t('qrCodeAvailable')}</span>
                  </div>
                )}
                {tx.status === 'pending_sync' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      removeOfflineTransaction(tx.transaction_code);
                      setOfflineTransactions(getOfflineTransactionsList());
                    }}
                    className="mt-2 text-destructive"
                  >
                    {t('delete')}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Transaction History */}
      <Card className="p-6 shadow-card">
        <h3 className="font-bold text-lg mb-4">{t('transactionHistory')}</h3>
        {loading ? (
          <p className="text-center text-muted-foreground py-8">{t('loading')}...</p>
        ) : transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">{t('noTransactionsYet')}</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{tx.type === 'send' ? t('sentTo') : t('receivedFrom')}: {tx.recipient || tx.sender}</p>
                    <p className="text-2xl font-bold text-primary">₦{Number(tx.amount).toLocaleString()}</p>
                  </div>
                  <Badge
                    variant={
                      tx.status === 'synced' || tx.status === 'offline_verified'
                        ? 'default'
                        : tx.status === 'pending_sync'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {tx.status === 'synced' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {tx.status === 'offline_verified' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {tx.status === 'pending_sync' && <Clock className="h-3 w-3 mr-1" />}
                    {tx.status === 'synced' ? t('synced') : tx.status === 'offline_verified' ? t('offlineVerified') : t('pendingSync')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{tx.transaction_code}</span>
                  <Badge variant="outline">{tx.type === 'send' ? t('sent') : t('received')}</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {new Date(tx.local_timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default WalletPage;
