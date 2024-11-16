import React, { useState, useEffect } from 'react';
import Button from '../../common/Button/Button';  // Assuming Button component exists in the specified path
import './TransactionDetails.css';

const TransactionDetails = ({ transactionId, onClose }) => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        // Replace with actual API call
        const fetchedTransaction = {
          id: 'TRX123456',
          date: '2024-03-15T14:30:00',
          type: 'send',
          status: 'completed',
          amount: 1000,
          currency: 'USD',
          fee: 2.5,
          exchangeRate: 1,
          sender: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
          },
          recipient: {
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+0987654321',
          },
          sourceWallet: 'Main Wallet',
          destinationWallet: 'Savings Wallet',
          note: 'Monthly rent payment',
        };
        setTransaction(fetchedTransaction);
      } catch (error) {
        setError('Failed to load transaction details.');
        console.error('Error fetching transaction details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [transactionId]);

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

  const handleDownload = () => {
    console.log('Downloading receipt...');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    console.log('Sharing transaction...');
  };

  const handleReport = () => {
    console.log('Reporting issue...');
  };

  if (loading) return <div>Loading transaction details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!transaction) return <div>Transaction details not available.</div>;

  return (
    <div className="transaction-details">
      <div className="transaction-header">
        <h2>Transaction Details</h2>
        <span className={`status-badge ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </span>
      </div>

      <div className="details-section">
        <div className="detail-group">
          <h3>Transaction Information</h3>
          <div className="detail-row">
            <span className="detail-label">Transaction ID</span>
            <span className="detail-value">{transaction.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date & Time</span>
            <span className="detail-value">
              {new Date(transaction.date).toLocaleString()}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Type</span>
            <span className="detail-value">{transaction.type}</span>
          </div>
        </div>

        <div className="detail-group">
          <h3>Amount Details</h3>
          <div className="detail-row">
            <span className="detail-label">Amount</span>
            <span className="detail-value">
              {transaction.amount} {transaction.currency}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Fee</span>
            <span className="detail-value">
              {transaction.fee} {transaction.currency}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Total Amount</span>
            <span className="detail-value highlight">
              {(transaction.amount + transaction.fee).toFixed(2)} {transaction.currency}
            </span>
          </div>
        </div>

        <div className="detail-group">
          <h3>Sender Details</h3>
          <div className="detail-row">
            <span className="detail-label">Name</span>
            <span className="detail-value">{transaction.sender.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{transaction.sender.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone</span>
            <span className="detail-value">{transaction.sender.phone}</span>
          </div>
        </div>

        <div className="detail-group">
          <h3>Recipient Details</h3>
          <div className="detail-row">
            <span className="detail-label">Name</span>
            <span className="detail-value">{transaction.recipient.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{transaction.recipient.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone</span>
            <span className="detail-value">{transaction.recipient.phone}</span>
          </div>
        </div>

        {transaction.note && (
          <div className="detail-group">
            <h3>Note</h3>
            <p className="transaction-note">{transaction.note}</p>
          </div>
        )}
      </div>

      <div className="actions-section">
        <Button variant="outlined" onClick={handleDownload}>
          Download Receipt
        </Button>
        <Button variant="outlined" onClick={handlePrint}>
          Print
        </Button>
        <Button variant="outlined" onClick={handleShare}>
          Share
        </Button>
        {transaction.status !== 'completed' && (
          <Button variant="error" onClick={handleReport}>
            Report Issue
          </Button>
        )}
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default TransactionDetails;
