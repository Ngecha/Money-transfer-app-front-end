import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h2>Welcome to VisaPay</h2>
        <p>Fast, secure, and easy way to transfer money</p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Send Money</h3>
          <p>Transfer funds to anyone, anywhere</p>
          <Link to="/send" className="button">Send Now</Link>
        </div>

        <div className="feature-card">
          <h3>Recent Transactions</h3>
          <p>View your transfer history</p>
          <Link to="/transactions" className="button">View History</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;