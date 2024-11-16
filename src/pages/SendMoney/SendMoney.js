import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './SendMoney.css';

function SendMoney() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sourceWallet: '',
    recipientWallet: '',
    amount: '',
    recipientName: '',
    phoneNumber: '',
    description: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedWalletBalance, setSelectedWalletBalance] = useState(0);

  const [validationErrors, setValidationErrors] = useState({
    amount: '',
    phoneNumber: '',
    recipientName: ''
  });

  const myWallets = useMemo(() => [
    { id: 1, name: 'Personal Wallet', balance: 5000, currency: 'USD' },
    { id: 2, name: 'Business Wallet', balance: 10000, currency: 'USD' },
    { id: 3, name: 'Savings Wallet', balance: 3000, currency: 'USD' }
  ], []);

  const recipientWallets = useMemo(() => [
    { id: 1, name: 'John Doe', walletId: 'JD123', type: 'Personal' },
    { id: 2, name: 'Jane Smith', walletId: 'JS456', type: 'Business' },
    { id: 3, name: 'Add New Recipient', walletId: 'new', type: 'New' }
  ], []);

  useEffect(() => {
    if (formData.sourceWallet) {
      const wallet = myWallets.find(w => w.id === parseInt(formData.sourceWallet));
      setSelectedWalletBalance(wallet ? wallet.balance : 0);
    }
  }, [formData.sourceWallet, myWallets]);

  const validateForm = useCallback(() => {
    const errors = {};

    if (!formData.amount) {
      errors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (parseFloat(formData.amount) > selectedWalletBalance) {
      errors.amount = 'Insufficient balance';
    }

    const phoneRegex = /^\+?[1-9]\d{9,13}$/;
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number format';
    }

    if (!formData.recipientName.trim()) {
      errors.recipientName = 'Recipient name is required';
    } else if (formData.recipientName.length < 2) {
      errors.recipientName = 'Name is too short';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData.amount, formData.phoneNumber, formData.recipientName, selectedWalletBalance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmTransfer = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormData({
        sourceWallet: '',
        recipientWallet: '',
        amount: '',
        recipientName: '',
        phoneNumber: '',
        description: ''
      });

      navigate('/transfer-success', { 
        state: { 
          amount: formData.amount,
          recipient: formData.recipientName 
        }
      });
    } catch (err) {
      setError('Transfer failed. Please try again.');
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  const renderConfirmationModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Transfer</h3>
        <div className="transfer-details">
          <p><strong>From:</strong> {myWallets.find(w => w.id === parseInt(formData.sourceWallet))?.name}</p>
          <p><strong>To:</strong> {formData.recipientName}</p>
          <p><strong>Amount:</strong> ${formData.amount}</p>
          <p><strong>Phone:</strong> {formData.phoneNumber}</p>
          {formData.description && <p><strong>Description:</strong> {formData.description}</p>}
        </div>
        <div className="modal-actions">
          <button 
            onClick={() => {
              setShowConfirmation(false);
              setFormData({
                sourceWallet: '',
                recipientWallet: '',
                amount: '',
                recipientName: '',
                phoneNumber: '',
                description: ''
              });
            }}
            className="cancel-button"
            disabled={isLoading}
            type="button"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirmTransfer}
            className="confirm-button"
            disabled={isLoading}
            type="button"
          >
            {isLoading ? 'Processing...' : 'Confirm Transfer'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="send-money-page">
      <h2>Send Money</h2>
      
      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="send-money-form">
        <div className="form-group">
          <label htmlFor="sourceWallet">From Wallet</label>
          <select
            id="sourceWallet"
            name="sourceWallet"
            value={formData.sourceWallet}
            onChange={handleChange}
            required
          >
            <option value="">Select your wallet</option>
            {myWallets.map(wallet => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name} - Balance: ${wallet.balance}
              </option>
            ))}
          </select>
          {formData.sourceWallet && (
            <div className="wallet-balance">
              Available Balance: ${selectedWalletBalance}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="recipientWallet">To Wallet</label>
          <select
            id="recipientWallet"
            name="recipientWallet"
            value={formData.recipientWallet}
            onChange={handleChange}
            required
          >
            <option value="">Select recipient</option>
            {recipientWallets.map(wallet => (
              <option key={wallet.id} value={wallet.walletId}>
                {wallet.name} {wallet.walletId !== 'new' ? `(${wallet.walletId})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="recipientName">Recipient Name</label>
          <input
            type="text"
            id="recipientName"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            placeholder="Recipient's full name"
            required
          />
          {validationErrors.recipientName && (
            <div className="error-message">{validationErrors.recipientName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="e.g., +254712345678"
            required
          />
          {validationErrors.phoneNumber && (
            <div className="error-message">{validationErrors.phoneNumber}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />
          {validationErrors.amount && (
            <div className="error-message">{validationErrors.amount}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional: Enter a description"
          />
        </div>

        <button 
          type="submit"
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Proceed'}
        </button>
      </form>

      {showConfirmation && renderConfirmationModal()}
    </div>
  );
}

export default SendMoney;
