import React from 'react';
import TopNav from '../components/Navbar';
import LeftNav from '../components/LeftNav';
//import WalletCard from '../components/dashboard/WalletCard';
import BeneficiariesCard from '../components/dashboard/BeneficiariesCard';
import RecentTransactionsCard from '../components/dashboard/RecentTransactionsCard';
import AnalyticsCard from '../components/dashboard/AnalyticsCard';
import WalletCard from '../components/dashboard/WalletCard';

export default function DashboardPage({ userId }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNav />
      <div className="flex">
        <LeftNav />
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <WalletCard/>
            <BeneficiariesCard />
            <RecentTransactionsCard />
          </div>

          <AnalyticsCard />
        </div>
      </div>
    </div>
  );
}
