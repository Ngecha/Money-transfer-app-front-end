import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Wallet from './wallet';
import Beneficiaries from './beneficiaries';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>Welcome to Money Transfer app</p>

          {/* Navigation Links */}
          <nav>
            {/* <Link to="/" className="btn btn-link">Home</Link> */}
            {/* <Link to="/wallet" className="btn btn-link">Wallet</Link> */}
          </nav>
        </header>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple Home Component
function Home() {
  return <p>
  </p>;
}

export default App;
