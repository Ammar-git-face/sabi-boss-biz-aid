import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Loan {
  id: string;
  loan_type: 'given' | 'taken';
  borrower_lender: string;
  amount: number;
  due_date?: string;
  repayment_status: 'pending' | 'partial' | 'paid';
  amount_repaid: number;
  description?: string;
}

export const useLoans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchLoans();
      subscribeToChanges();
    }
  }, [user]);

  const fetchLoans = async () => {
    try {
      const { data, error } = await supabase
        .from('loans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLoans((data as Loan[]) || []);
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToChanges = () => {
    const channel = supabase
      .channel('loans-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'loans' }, () => {
        fetchLoans();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const addLoan = async (loan: Omit<Loan, 'id'>) => {
    try {
      const { error } = await supabase.from('loans').insert({
        user_id: user?.id,
        ...loan,
      });

      if (error) throw error;
      toast.success('Loan recorded successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to record loan');
    }
  };

  const updateLoan = async (id: string, updates: Partial<Loan>) => {
    try {
      const { error } = await supabase
        .from('loans')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      toast.success('Loan updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update loan');
    }
  };

  const deleteLoan = async (id: string) => {
    try {
      const { error } = await supabase.from('loans').delete().eq('id', id);

      if (error) throw error;
      toast.success('Loan deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete loan');
    }
  };

  return { loans, loading, addLoan, updateLoan, deleteLoan };
};
