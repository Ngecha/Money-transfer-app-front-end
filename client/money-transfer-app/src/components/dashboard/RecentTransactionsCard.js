import React, { useEffect, useState } from "react";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch transactions on component load
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/transactions"); // Replace with your actual endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 overflow-y-auto max-h-96">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {/* Replace with the actual columns in your Transaction model */}
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{transaction.id}</td>
              <td className="px-4 py-2 border">{transaction.amount}</td>
              <td className="px-4 py-2 border">
                {new Date(transaction.date).toLocaleString()}
              </td>
              <td className="px-4 py-2 border">{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
