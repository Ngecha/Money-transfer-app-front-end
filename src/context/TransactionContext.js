import React, { createContext, useContext, useState } from 'react';
import { mockTransactions } from '../mockData';

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions] = useState(mockTransactions);

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}