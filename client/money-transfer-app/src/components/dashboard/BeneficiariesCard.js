import React, { useState, useEffect } from 'react';

export default function BeneficiariesCard({ userId }) {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [error, setError] = useState('');

  // Fetch beneficiaries
  useEffect(() => {
    async function fetchBeneficiaries() {
      try {
        const response = await fetch(`/beneficiaries/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch beneficiaries');
        }
        const data = await response.json();
        setBeneficiaries(data);
      } catch (err) {
        console.error('Error fetching beneficiaries:', err);
        setError('Failed to load beneficiaries.');
      }
    }
    fetchBeneficiaries();
  }, [userId]);

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-2xl font-bold mb-4">Beneficiaries</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Total Beneficiaries */}
      <p className="text-lg mb-4">Total Beneficiaries: {beneficiaries.length}</p>

      {/* Beneficiary Table */}
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Email</th>
            <th className="border-b p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.slice(0, 3).map((b, index) => (
            <tr key={index}>
              <td className="p-2">{b.name || 'N/A'}</td>
              <td className="p-2">{b.email}</td>
              <td className="p-2 text-green-500">Active</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Message for More Beneficiaries */}
      {beneficiaries.length > 3 && (
        <p className="text-sm text-gray-500 mt-2">
          Showing 3 of {beneficiaries.length} beneficiaries.
        </p>
      )}
    </div>
  );
}
