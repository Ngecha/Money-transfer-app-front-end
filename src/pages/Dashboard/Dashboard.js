import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTransaction from '../../hooks/useTransaction';
import Button from '../../components/common/Button/Button';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { transactions, loading, fetchTransactions } = useTransaction();
  const [stats, setStats] = useState({
    totalSent: 0,
    totalReceived: 0,
    pendingAmount: 0
  });

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (transactions.length > 0) {
      const currentMonth = new Date().getMonth();
      const monthlyTransactions = transactions.filter(
        t => new Date(t.date).getMonth() === currentMonth
      );

      const sent = monthlyTransactions
        .filter(t => t.type === 'send')
        .reduce((sum, t) => sum + t.amount, 0);

      const received = monthlyTransactions
        .filter(t => t.type === 'receive')
        .reduce((sum, t) => sum + t.amount, 0);

      const pending = transactions
        .filter(t => t.status === 'pending')
        .reduce((sum, t) => sum + t.amount, 0);

      setStats({
        totalSent: sent,
        totalReceived: received,
        pendingAmount: pending
      });
    }
  }, [transactions]);

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

  const quickLinks = [
    { icon: '👤', label: 'Profile', path: '/profile' },
    { icon: '💸', label: 'Send Money', path: '/send-money' },
    { icon: '📊', label: 'Analytics', path: '/analytics' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
    { icon: '🎁', label: 'Rewards', path: '/rewards' },
    { icon: '💬', label: 'Support', path: '/support' }
  ];

  return (
    <div className="dashboard">
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome back, {user?.firstName}! 👋</h1>
          <p>Here's your financial overview</p>
        </div>
        <div className="quick-actions">
          <Link to="/send-money">
            <Button variant="primary">Send Money</Button>
          </Link>
          <Link to="/add-money">
            <Button variant="outlined">Add Money</Button>
          </Link>
        </div>
      </section>

      <section className="balance-overview">
        <div className="balance-card main-balance">
          <div className="balance-header">
            <h3>Total Balance</h3>
            <span className="currency">USD</span>
          </div>
          <h2>${user?.balance?.toFixed(2) || '0.00'}</h2>
          <p className="balance-subtitle">Available in your wallet</p>
        </div>

        <div className="balance-stats">
          <div className="stat-card">
            <div className="stat-icon sent">↑</div>
            <div className="stat-info">
              <p>Sent this month</p>
              <h3>${stats.totalSent.toFixed(2)}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon received">↓</div>
            <div className="stat-info">
              <p>Received this month</p>
              <h3>${stats.totalReceived.toFixed(2)}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pending">⏳</div>
            <div className="stat-info">
              <p>Pending</p>
              <h3>${stats.pendingAmount.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="recent-transactions">
        <div className="section-header">
          <h2>Recent Transactions</h2>
          <Link to="/transactions" className="view-all">
            View All
          </Link>
        </div>

        <div className="transactions-list">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="no-transactions">
              <p>No recent transactions</p>
              <Link to="/send-money">
                <Button variant="outlined">Make your first transfer</Button>
              </Link>
            </div>
          ) : (
            transactions.slice(0, 5).map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className={`transaction-icon ${transaction.type}`}>
                    {transaction.type === 'send' ? '↑' : '↓'}
                  </div>
                  <div className="transaction-details">
                    <h4>{transaction.recipient || transaction.sender}</h4>
                    <p className="transaction-date">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="transaction-amount">
                  <span className={transaction.type}>
                    {transaction.type === 'send' ? '-' : '+'}
                    ${transaction.amount.toFixed(2)}
                  </span>
                  <span className={`status ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="quick-links">
        <h2>Quick Access</h2>
        <div className="quick-links-grid">
          {quickLinks.map((link, index) => (
            <Link to={link.path} key={index} className="quick-link-card">
              <span className="quick-link-icon">{link.icon}</span>
              <span className="quick-link-label">{link.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
