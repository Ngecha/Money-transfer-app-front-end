import { useContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionContext from '../context/TransactionContext';
import useAuth from './useAuth';

const useTransaction = () => {
  const navigate = useNavigate();
  const transaction = useContext(TransactionContext);
  const { checkAuth, getAuthHeaders } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  if (!transaction) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }

  // Utility function to manage loading and error state
  const handleTransactionRequest = useCallback(async (request, ...args) => {
    if (!checkAuth()) return;
    
    setLocalLoading(true);
    setLocalError(null);
    
    try {
      return await request(...args);
    } catch (error) {
      console.error(error); // Log full error for debugging
      setLocalError(error.message);
      throw error;
    } finally {
      setLocalLoading(false);
    }
  }, [checkAuth]);

  const handleSendMoney = useCallback(async (transactionData) => {
    const result = await handleTransactionRequest(transaction.sendMoney, {
      ...transactionData,
      headers: getAuthHeaders(),
    });
    
    navigate(`/transactions/${result.id}`);  // Fixed navigation URL
    return result;
  }, [handleTransactionRequest, transaction.sendMoney, navigate, getAuthHeaders]);

  const handleFetchTransactions = useCallback(async (filters = {}) => {
    await handleTransactionRequest(transaction.fetchTransactions, filters);
  }, [handleTransactionRequest, transaction.fetchTransactions]);

  const handleGetTransactionDetails = useCallback(async (transactionId) => {
    return await handleTransactionRequest(transaction.getTransactionDetails, transactionId);
  }, [handleTransactionRequest, transaction.getTransactionDetails]);

  const handleDownloadReceipt = useCallback(async (transactionId) => {
    await handleTransactionRequest(transaction.downloadReceipt, transactionId);
  }, [handleTransactionRequest, transaction.downloadReceipt]);

  const handleReportIssue = useCallback(async (transactionId, issue) => {
    await handleTransactionRequest(transaction.reportIssue, transactionId, issue);
  }, [handleTransactionRequest, transaction.reportIssue]);

  const calculateTransactionFee = useCallback((amount, currency) => {
    const baseFee = 2.5;
    const percentageFee = amount * 0.01;
    return Math.min(baseFee + percentageFee, 50); // Cap at 50
  }, []);

  const getTransactionStatus = useCallback((transaction) => {
    if (transaction.confirmed) return 'completed';
    if (transaction.failed) return 'failed';
    return 'pending';
  }, []);

  const filterTransactions = useCallback((filters) => {
    return transaction.transactions.filter(t => 
      (!filters.type || t.type === filters.type) &&
      (!filters.status || t.status === filters.status) &&
      (!filters.search || 
        t.id.includes(filters.search) || 
        t.recipient?.name.includes(filters.search))
    );
  }, [transaction.transactions]);

  return {
    // State
    transactions: transaction.transactions,
    loading: localLoading || transaction.loading,
    error: localError || transaction.error,
    currentTransaction: transaction.currentTransaction,

    // Core methods
    sendMoney: handleSendMoney,
    fetchTransactions: handleFetchTransactions,
    getTransactionDetails: handleGetTransactionDetails,
    downloadReceipt: handleDownloadReceipt,
    reportIssue: handleReportIssue,

    // Utility methods
    calculateTransactionFee,
    getTransactionStatus,
    
    // Helper methods
    clearError: () => setLocalError(null),
    filterTransactions,
  };
};

export default useTransaction;
