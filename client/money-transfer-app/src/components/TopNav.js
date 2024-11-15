// src/components/TopNav.js
import React from 'react';

export default function TopNav({ onAuthClick }) {
  return (
    <nav className="flex-1 p-6 text-black bg-gray-90 shadow-lg flex justify-between justify-center pb-6 items-center">
      <div className="flex items-center">
        <img src="/path/to/logo.png" alt="Logo" className="h-8 text-black mr-2" />
        <h1 className="text-lg text-black font-semibold">Money Transfer</h1>
      </div>
      <div>
        <button
          onClick={() => onAuthClick('login')}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mr-2"
        >
          Login
        </button>
        <button
          onClick={() => onAuthClick('signup')}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Signup
        </button>
      </div>
    </nav>
  );
}
