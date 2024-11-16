import React, { useState, useEffect } from 'react';
import './Transactions.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching transactions
    const fetchTransactions = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock transaction data
        const mockTransactions = [
          {
            id: 1,
            date: '2024-03-15',
            type: 'Send',
            amount: 1000,
            recipient: 'John Doe',
            status: 'Completed',
          },
          {
            id: 2,
            date: '2024-03-14',
            type: 'Receive',
            amount: 500,
            sender: 'Jane Smith',
            status: 'Completed',
          },
          {
            id: 3,
            date: '2024-03-13',
            type: 'Send',
            amount: 750,
            recipient: 'Alice Johnson',
            status: 'Completed',
          },
        ];

        setTransactions(mockTransactions);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load transactions');
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
      <div className="transactions-page">
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transactions-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="transactions-page">
      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <div className="no-transactions">No transactions found</div>
      ) : (
        <div className="transactions-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>From/To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`transaction-type ${transaction.type.toLowerCase()}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td>
                    <span className={`amount ${transaction.type.toLowerCase()}`}>
                      ${transaction.amount}
                    </span>
                  </td>
                  <td>
                    {transaction.type === 'Send' ? transaction.recipient : transaction.sender || 'Unknown'}
                  </td>
                  <td>
                    <span className={`status ${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Transactions;
