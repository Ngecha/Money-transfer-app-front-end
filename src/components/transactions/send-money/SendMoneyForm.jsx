import React, { useState } from 'react';
import './SendMoneyForm.css';
import transactionService from '../../../services/transactionService';

const SendMoneyForm = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    recipient: {
      name: '',
      accountNumber: '',
      bankName: '',
      swiftCode: ''
    },
    amount: '',
    currency: 'USD'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const result = await transactionService.sendMoney(formData);
      onSuccess?.(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3].map(num => (
        <div key={num} className={`step ${step >= num ? 'active' : ''}`}>
          {num}
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h3>Recipient Details</h3>
            <div className="form-group">
              <label>Recipient Name</label>
              <input
                type="text"
                name="recipient.name"
                value={formData.recipient.name}
                onChange={handleInputChange}
                placeholder="Enter recipient's full name"
              />
            </div>
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                name="recipient.accountNumber"
                value={formData.recipient.accountNumber}
                onChange={handleInputChange}
                placeholder="Enter account number"
              />
            </div>
            <div className="form-group">
              <label>Bank Name</label>
              <input
                type="text"
                name="recipient.bankName"
                value={formData.recipient.bankName}
                onChange={handleInputChange}
                placeholder="Enter bank name"
              />
            </div>
            <div className="form-group">
              <label>SWIFT/BIC Code</label>
              <input
                type="text"
                name="recipient.swiftCode"
                value={formData.recipient.swiftCode}
                onChange={handleInputChange}
                placeholder="Enter SWIFT/BIC code"
              />
            </div>
            <button type="button" onClick={handleNext} className="next-button" disabled={loading}>
              {loading ? 'Loading...' : 'Next'}
            </button>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h3>Amount Details</h3>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>
            <div className="form-group">
              <label>Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <button type="button" onClick={handleBack} className="back-button">
              Back
            </button>
            <button type="button" onClick={handleNext} className="next-button" disabled={loading}>
              {loading ? 'Loading...' : 'Next'}
            </button>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h3>Confirm & Submit</h3>
            <div className="summary">
              <p><strong>Recipient:</strong> {formData.recipient.name}</p>
              <p><strong>Account Number:</strong> {formData.recipient.accountNumber}</p>
              <p><strong>Amount:</strong> {formData.amount} {formData.currency}</p>
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" onClick={handleBack} className="back-button">
              Back
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="send-money-form">
      {renderStepIndicator()}
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {renderStepContent()}
      </form>
    </div>
  );
};

export default SendMoneyForm;
