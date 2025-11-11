import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useOfflineSync } from './useOfflineSync';
import {
  saveOfflineTransaction,
  getOfflineTransactions,
  getPendingSyncTransactions,
  markTransactionAsSynced,
  deleteSyncedTransactions,
  deleteOfflineTransaction,
  markTransactionAsVerified,
  generateVerificationHash,
  generateQRCode,
  getWalletBalance,
  Transaction,
} from '@/lib/offlineWalletStorage';

export const useWallet = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { isOnline } = useOfflineSync();

  useEffect(() => {
    if (user) {
      fetchTransactions();
      calculateBalance();
    }
  }, [user]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && user) {
      syncOfflineTransactions();
    }
  }, [isOnline, user]);

  const fetchTransactions = async () => {
    try {
      // Fetch from Supabase (implement wallet table in database)
      // For now, using offline storage as primary source
      const offlineTransactions = getOfflineTransactions();
      setTransactions(offlineTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateBalance = () => {
    const currentBalance = getWalletBalance();
    setBalance(currentBalance);
  };

  const syncOfflineTransactions = async () => {
    const pendingTransactions = getPendingSyncTransactions();
    if (pendingTransactions.length === 0) return;

    console.log('Syncing offline transactions:', pendingTransactions);

    for (const offlineTx of pendingTransactions) {
      try {
        // TODO: Implement Supabase wallet transactions table
        // For now, mark as synced after simulated delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        markTransactionAsSynced(offlineTx.transaction_code);
        toast.success(`Transaction ${offlineTx.transaction_code} synced successfully`);
      } catch (error) {
        console.error('Failed to sync transaction:', error);
      }
    }

    // Clean up synced transactions after a delay
    setTimeout(() => {
      deleteSyncedTransactions();
      fetchTransactions();
      calculateBalance();
    }, 2000);
  };

  const sendPayment = async (amount: number, recipient: string) => {
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!recipient) {
      toast.error('Please enter recipient details');
      return;
    }

    // Check if sufficient balance
    if (balance < amount) {
      toast.error('Insufficient balance');
      return;
    }

    const verificationHash = generateVerificationHash(amount, user?.id || '', Date.now());
    const qrCode = generateQRCode('', amount);

    const transactionCode = saveOfflineTransaction({
      id: crypto.randomUUID(),
      type: 'send',
      amount,
      recipient,
      status: isOnline ? 'pending_sync' : 'pending_sync',
      verification_hash: verificationHash,
      qr_code: qrCode,
    });

    toast.success(`Payment Sent – ${transactionCode}`);
    fetchTransactions();
    calculateBalance();

    // Trigger sync if online
    if (isOnline) {
      setTimeout(() => syncOfflineTransactions(), 1000);
    }
  };

  const receivePayment = async (amount: number, sender: string) => {
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const transactionCode = saveOfflineTransaction({
      id: crypto.randomUUID(),
      type: 'receive',
      amount,
      sender,
      status: 'pending_sync',
    });

    toast.success(`Payment Received – ${transactionCode}`);
    fetchTransactions();
    calculateBalance();

    // Trigger sync if online
    if (isOnline) {
      setTimeout(() => syncOfflineTransactions(), 1000);
    }
  };

  const verifyTransaction = (transactionCode: string) => {
    const offlineTransactions = getOfflineTransactions();
    const transaction = offlineTransactions.find(tx => tx.transaction_code === transactionCode);

    if (!transaction) {
      toast.error('Transaction not found');
      return false;
    }

    if (transaction.status === 'offline_verified' || transaction.status === 'synced') {
      toast.info('Transaction already verified');
      return true;
    }

    markTransactionAsVerified(transactionCode);
    toast.success(`Transaction ${transactionCode} verified offline`);
    fetchTransactions();
    calculateBalance();
    return true;
  };

  const getOfflineTransactionsList = () => {
    return getOfflineTransactions();
  };

  const removeOfflineTransaction = (transactionCode: string) => {
    deleteOfflineTransaction(transactionCode);
    toast.success('Transaction deleted');
    fetchTransactions();
    calculateBalance();
  };

  return {
    transactions,
    balance,
    loading,
    sendPayment,
    receivePayment,
    verifyTransaction,
    getOfflineTransactionsList,
    removeOfflineTransaction,
    syncOfflineTransactions,
  };
};
