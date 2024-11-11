import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Wallet() {
    const [showTopUpForm, setShowTopUpForm] = useState(false);
    const [showTransferForm, setShowTransferForm] = useState(false);

    const handleTopUpClick = () => {
        setShowTopUpForm(true);
        setShowTransferForm(false);
    };

    const handleTransferClick = () => {
        setShowTransferForm(true);
        setShowTopUpForm(false);
    };

    const handleBackClick = () => {
        setShowTopUpForm(false);
        setShowTransferForm(false);
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column align-items-center py-4" style={{ backgroundColor: '#f2f5f7' }}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light w-100 px-4" style={{ backgroundColor: '#f2f5f7', borderBottom: '1px solid #e0e0e0' }}>
                <a className="navbar-brand fw-bold text-dark" href="#" style={{ fontSize: '1.5rem', color: '#2b2b2b' }}>VisaPay</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-secondary" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fw-bold" to="/" style={{ color: '#0046be' }}>Wallet</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-secondary" to="/beneficiaries">Beneficiaries</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-secondary" href="#">Transactions</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-secondary" href="#">Profile</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Wallet Section */}
            <div className="d-flex flex-column align-items-center mt-4">
                {/* Top up and Transfer Buttons */}
                <div className="d-flex gap-2 mb-4">
                    <button type="button" className="btn rounded-pill px-4" onClick={handleTopUpClick} style={{ backgroundColor: '#0046be', color: 'white' }}>Top up</button>
                    <button type="button" className="btn rounded-pill px-4" onClick={handleTransferClick} style={{ backgroundColor: '#1c1c1c', color: 'white' }}>Transfer</button>
                </div>

                {/* Conditional Rendering for Statistics, Top-up Form, or Transfer Form */}
                {!showTopUpForm && !showTransferForm ? (
                    // Statistics Section
                    <div className="d-flex justify-content-around w-100" style={{ maxWidth: '600px' }}>
                        <div className="card text-center p-4 shadow-sm" style={{ width: '45%', backgroundColor: '#e7ebf0', borderRadius: '10px' }}>
                            <h5 className="card-title d-flex align-items-center justify-content-center gap-2">
                                <i className="fas fa-arrow-down text-danger"></i> Account Balance
                            </h5>
                            <p className="fs-4">$21.50</p>
                        </div>
                        <div className="card text-center p-4 shadow-sm" style={{ width: '45%', backgroundColor: '#e7ebf0', borderRadius: '10px' }}>
                            <h5 className="card-title">Total Monthly Spending</h5>
                            <p className="fs-4">$4,565.23</p>
                            <p className="text-muted">You've spent 68% of your monthly limit</p>
                            <div className="progress" style={{ height: '8px', borderRadius: '5px' }}>
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: '68%', borderRadius: '5px', backgroundColor: '#0046be' }}
                                    aria-valuenow="68"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                    </div>
                ) : showTopUpForm ? (
                    // Top-up Form
                    <div className="card p-4 mt-4" style={{ width: '18rem', backgroundColor: '#e7ebf0', borderRadius: '10px' }}>
                        <h5 className="card-title text-center mb-3">Top up</h5>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="form-control mb-3"
                        />
                        <button type="button" className="btn w-100 mb-2" style={{ backgroundColor: '#0046be', color: 'white' }}>Top up</button>
                        <button type="button" className="btn btn-secondary w-100" onClick={handleBackClick}>Back to Statistics</button>
                    </div>
                ) : (
                    // Transfer Form
                    <div className="card p-4 mt-4" style={{ width: '18rem', backgroundColor: '#e7ebf0', borderRadius: '10px' }}>
                        <h5 className="card-title text-center mb-3">SEND MONEY</h5>
                        <select className="form-select mb-3">
                            <option>Choose beneficiary</option>
                            {/* Add beneficiary options here */}
                        </select>
                        <label>Enter Amount</label>
                        <input
                            type="number"
                            placeholder=""
                            className="form-control mb-3"
                        />
                        <button type="button" className="btn w-100 mb-2" style={{ backgroundColor: '#0046be', color: 'white' }}>Send</button>
                        <button type="button" className="btn btn-secondary w-100" onClick={handleBackClick}>Back to Statistics</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wallet;
