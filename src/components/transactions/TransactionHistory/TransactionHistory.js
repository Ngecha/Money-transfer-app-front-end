import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import TransactionDetails from '../TransactionDetails/TransactionDetails';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock data - replace with Redux state in a real app
  const transactions = [
    {
      id: 'TRX123456',
      date: '2024-03-15',
      type: 'send',
      amount: 1000,
      currency: 'USD',
      recipient: 'Jane Smith',
      status: 'completed',
    },
    {
      id: 'TRX123457',
      date: '2024-03-14',
      type: 'receive',
      amount: 500,
      currency: 'USD',
      sender: 'John Doe',
      status: 'completed',
    },
    {
      id: 'TRX123458',
      date: '2024-03-13',
      type: 'send',
      amount: 750,
      currency: 'EUR',
      recipient: 'Alice Johnson',
      status: 'pending',
    },
    // Add more transactions as needed
  ];

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseDetails = () => {
    setSelectedTransaction(null);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-success';
      case 'pending':
        return 'status-pending';
      case 'failed':
        return 'status-failed';
      default:
        return '';
    }
  };

  const getTransactionTypeIcon = (type) => {
    return type === 'send' ? '↑' : '↓';
  };

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (filterType === 'all') return true;
      return transaction.type === filterType;
    })
    .filter((transaction) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        transaction.id.toLowerCase().includes(searchLower) ||
        (transaction.recipient && transaction.recipient.toLowerCase().includes(searchLower)) ||
        (transaction.sender && transaction.sender.toLowerCase().includes(searchLower))
      );
    })
    .filter((transaction) => {
      if (!dateRange.start || !dateRange.end) return true;
      const transactionDate = new Date(transaction.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

  return (
    <div className="transaction-history">
      <div className="filters-section">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search transactions by ID, recipient, or sender..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select 
            value={filterType} 
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Transactions</option>
            <option value="send">Sent</option>
            <option value="receive">Received</option>
          </select>

          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={handleDateChange}
            className="date-input"
          />
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={handleDateChange}
            className="date-input"
          />
        </div>
      </div>

      <div className="transactions-list">
        <div className="transaction-header">
          <span>Date</span>
          <span>Type</span>
          <span>Amount</span>
          <span>Recipient/Sender</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="transaction-row">
            <span className="transaction-date">
              {new Date(transaction.date).toLocaleDateString()}
            </span>
            <span className="transaction-type">
              <span className={`type-icon ${transaction.type}`}>
                {getTransactionTypeIcon(transaction.type)}
              </span>
              {transaction.type}
            </span>
            <span className="transaction-amount">
              {transaction.type === 'send' ? '-' : '+'}
              {transaction.amount} {transaction.currency}
            </span>
            <span className="transaction-party">
              {transaction.recipient || transaction.sender}
            </span>
            <span className={`transaction-status ${getStatusColor(transaction.status)}`}>
              {transaction.status}
            </span>
            <span className="transaction-action">
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => handleTransactionClick(transaction)}
              >
                View Details
              </Button>
            </span>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="no-transactions">No transactions found</div>
      )}

      {selectedTransaction && (
        <div className="transaction-details-modal">
          <TransactionDetails 
            transactionId={selectedTransaction.id}
            onClose={handleCloseDetails}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
